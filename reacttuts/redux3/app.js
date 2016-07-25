define(function(require){
	'use strict';

	var React = require('react');
	var Provider = require('react-redux').Provider;
	var createStore = require('redux').createStore;
	var reducers =  require('./reducers/index');
	var CommonContainer = require('es6!./components/common-container');

	const store = createStore(
	    reducers,
	    window.devToolsExtension && window.devToolsExtension()
	);

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
