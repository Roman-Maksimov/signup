import {React, ReactDOM, debounce} from 'src/vendor';
import routes from 'src/routes';
import style from 'src/styles/main';

const __svg__ = { path: "./assets/icons/**/*.svg", name: "assets/icons.[hash].svg" };
require("webpack-svgstore-plugin/src/helpers/svgxhr")(__svg__);

ReactDOM.render(
    routes,
    document.getElementById('app')
);

