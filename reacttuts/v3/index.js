require.config({
    paths: {
    	'es6': '../lib/es6',
        'babel': '../lib/babel-5.8.34.min',
        'react': '../lib/react',
        'redux': '../lib/redux',
        'react-redux': '../lib/react-redux',
        'react-dom': '../lib/react-dom'
    },
    // Prevent es6 plugin from wrapping modules in its own define(..)
    config: {es6: {modules: undefined}}
});

define(function(require){
    var React = require('react');
	var ReactDOM = require("react-dom");
    var App = require('es6!./app');
    ReactDOM.render(React.createElement(App, {}), document.querySelector('#main'));
});