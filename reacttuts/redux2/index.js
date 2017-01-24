define(function(require){
	'use strict';

	 var React = require('react');
	 var ReactDOM = require("react-dom");
	var Provider = require('react-redux').Provider;
	var store = require('./store');

	var App = require('es6!./components/App');




	var DivComp = React.createClass({
		render: function() {
			return(
				<Provider store={store}>
				    <App />
				</Provider>
			);
		}
	});

	return DivComp;

});