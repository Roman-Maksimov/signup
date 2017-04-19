Signup form example
=========================================================

During application development was used next technologies:
 - JavaScript
 - EcmaScript 6/7
 - node.js
 - Babel
 - WebPack
 - SCSS/SASS
 - ReactJS
 - Redux
 - Redux Forms
 - React Transition Groups

To build the application use the following command

	$ npm update

If npm is already exists, you can just install missing packages by typing:

   	$ npm i

Then you can start the application in development mode by:

    $ npm start

This method will update all npm packages, build project in-memory and start an embedded WebPack server.
After that, the application will be available by URL http://localhost:8080

To build application in a production mode, use the following command:

    $ npm run build

Compiled bundles will be available from /build directory. You can setting it as your webroot and run application through your web server.

Test can be started by this command:

    $ npm run test
