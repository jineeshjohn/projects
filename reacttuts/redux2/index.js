define(function(require){
	'use strict';

	 var React = require('react');
	 var ReactDOM = require("react-dom");
	var Provider = require('react-redux').Provider;
	var createStore = require('redux').createStore;
	// var applyMiddleware = require('redux').applyMiddleware;
	// var thunk from 'redux-thunk';
	// var promise from 'redux-promise';
	// var createLogger from 'redux-logger';
	var allReducers =  require('./reducers/index');
	var App = require('es6!./components/App');

	// const logger = createLogger();
	const store = createStore(
	     allReducers
	    // applyMiddleware(thunk, promise, logger)
	);


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