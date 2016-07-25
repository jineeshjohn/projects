require.config({
    paths: {
    	'es6': 'bower_components/requirejs-babel/es6',
        'babel': 'bower_components/requirejs-babel/babel-5.8.34.min',
        'react': 'bower_components/react/react',
        'redux': 'bower_components/react/redux',
        'react-redux': 'bower_components/react/react-redux',
        'react-dom': 'bower_components/react/react-dom'
    },
    // Prevent es6 plugin from wrapping modules in its own define(..)
    config: {es6: {modules: undefined}}
});

define(function(require){
    var React = require('react');
	require('es6');
	var ReactDOM = require("react-dom");
	var Provider = require('react-redux').Provider;
	var createStore = require('redux').createStore;
    var DivComp = require('es6!./index');
    var React = require('react');
    var ReactDOM = require("react-dom");
    console.log('ssssssssssss');
    ReactDOM.render(React.createElement(DivComp, {}), document.querySelector('#main'));
});
