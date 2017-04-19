const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');

if(fs.existsSync('.env')){
    require('dotenv').config();
}

// Environment variables which should be exported outside this module
const env = {
    projectRoot: path.resolve(__dirname),
    NODE_ENV:    process.env.NODE_ENV || 'development',
    CDN_URL:     process.env.CDN_URL || ''
};

function resolveDir(dirPath) {
    return path.join.apply(path, [ env.projectRoot ].concat(dirPath.split('/')));
}

console.log('\n> Building with NODE_ENV:', env.NODE_ENV);
console.log('> Project root:', env.projectRoot);

function mergeEntryConfigs(app, extracted) {
    return Object.assign(app, extracted.reduce(function(entries, chunk) {
        entries[chunk.name] = chunk.modules;
        return entries;
    }, {}));
}

// Order is matter
// webpack does not evaluate correct dependencies order
// in CommonsChunkPlugin
//  * less coupled chunks should be listed before those which more coupled
//  * first chunk become entry (appears in CommonsChunkPlugin config last)
// https://github.com/webpack/webpack/issues/1016
const extractedChunks = [
    { name: 'babel',  modules: ['babel-polyfill'] },
    { name: 'vendor', modules: ['./src/vendor/index.js'] }
];

const cssFilenameTemplate = `css/[name]${process.env.NODE_ENV === 'production' ? '-[contenthash]' : ''}.css`;
const imgFilenameTemplate = `img/[path][name]${process.env.NODE_ENV === 'production' ? '-[hash]' : ''}.[ext]`;
const jsFilenameTemplate = `js/[name]${process.env.NODE_ENV === 'production' ? '-[chunkhash]' : ''}.min.js`;

module.exports = {
    entry: mergeEntryConfigs({
        app: './src/main.js'
    }, extractedChunks),

    output: {
        path: resolveDir('build'),
        publicPath: env.CDN_URL + '/',
        filename: jsFilenameTemplate
    },

    resolve: {
        modules: [
            'node_modules',
            resolveDir('src')
        ],
        alias: {
            src: resolveDir('src')
        },
        extensions: [ '.js', '.css', '.scss', '.html' ]
    },

    devtool: 'inline-source-map',

    context: __dirname,

    stats: {
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true
    },

    module: {
        rules: [
            {
                test: /.html?$/,
                loader: 'html-loader',
                exclude: [
                    'node_modules'
                ]
            },{
                test: /\.png$/,
                include: [
                    resolveDir('resources/img')
                ],
                loader: 'file-loader',
                options: {
                    context: 'resources/img',
                    name: imgFilenameTemplate
                }
            },{
                test: /\.png$/,
                include: [
                    resolveDir('src/components')
                ],
                loader: 'file-loader',
                options: {
                    context: 'resources/img',
                    name: imgFilenameTemplate
                }
            },{
                test: /\.(png|svg|jpg|jpeg)$/,
                include: [
                    resolveDir('src/assets')
                ],
                loader: 'file-loader',
                options: {
                    context: 'src/assets',
                    name: '[name].[ext]'
                }
            },{
                test: /\.js$/,
                include: [
                    resolveDir('src')
                ],
                loader: 'babel-loader',
                options: {
                    presets: [ 'es2015', 'stage-0', 'react' ],
                    plugins: [ 'transform-decorators-legacy' ]
                }
            },{
                test: /\.s?css$/,
                include: [
                    resolveDir('node_modules/react-toolbox'),
                    resolveDir('src/vendor/react-toolbox')
                ],
                enforce: 'post',
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },{
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('precss'),
                                    require('autoprefixer')
                                ]
                            }
                        },{
                            loader: 'sass-loader',
                            options: {
                                data: "" +
                                "$NODE_ENV: '" + env.NODE_ENV + "'; " +
                                "$CDN_URL: '" + env.CDN_URL + "'; " +
                                "@import 'src/vendor/react-toolbox/theme'; "
                            }
                        }
                    ]
                })
            },{
                test: /\.scss$/,
                include: [
                    resolveDir('src')
                ],
                exclude: [
                    resolveDir('src/vendor')
                ],
                use: ExtractTextPlugin.extract({
                    use: [ 'css-loader', 'postcss-loader', 'sass-loader' ]
                })
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
            CDN_URL: JSON.stringify(env.CDN_URL),
        }),

        // don't include locales from `moment` package
        // http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new SvgStore({
            svgoOptions: {
                plugins: [
                    { removeTitle: true }
                ]
            }
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            cdnUrl: env.CDN_URL,
        }),

        new ExtractTextPlugin({
            filename: cssFilenameTemplate,
            disable: false,
            allChunks: true
        }),

        //new WebpackStableModuleIdAndHash(),

        new webpack.optimize.CommonsChunkPlugin({
            names: extractedChunks.map(function(chunk) { return chunk.name }).reverse(),
            filename: jsFilenameTemplate,
        }),

        new CleanPlugin([ 'build' ], {
            root: resolveDir('.'),
            verbose: true,
            dry: false
        }),

        // TODO: add versions/hashes to assets which is copied here
        new CopyWebpackPlugin([
            {
                // copy normalize.css (won't compile it into the bundle)
                from: 'node_modules/normalize.css/normalize.css',
                to: 'css'
            },
            {
                // copy MDL css file
                from: 'node_modules/material-design-lite/material.min.css',
                to: 'css'
            },
            {
                // copy MDL css map file
                from: 'node_modules/material-design-lite/material.min.css.map',
                to: 'css'
            },
            {
                // copy MDL js file
                from: 'node_modules/material-design-lite/material.min.js',
                to: 'js'
            },
            {
                // copy MDL js Map file
                from: 'node_modules/material-design-lite/material.min.js.map',
                to: 'js'
            },
            {
                from: 'node_modules/mdi/fonts',
                to: 'fonts'
            },
            {
                from: 'node_modules/mdi/css/materialdesignicons.min.css',
                to: 'css'
            },
            {
                from: 'src/themes/material.indigo-pink.min.css',
                to: 'css/theme.min.css'
            },
            {
                // copy fonts
                from: 'src/styles/fonts',
                to: 'fonts'
            }
        ])
    ]
};
