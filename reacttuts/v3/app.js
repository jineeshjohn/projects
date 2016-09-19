define(function(require){
	'use strict';

	var React = require('react');
	var Provider = require('react-redux').Provider;
	var CommonContainer = require('es6!./common-container');
	var store = require('./store');



	var App = React.createClass({
		render: function() {
			return(
				<Provider store={store}>
				    <CommonContainer />
				</Provider>
			);
		}
	});
	return App;
});
