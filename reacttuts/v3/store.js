define(function(require) {
	'use strict';

	var createStore = require('redux').createStore;
	var reducers =  require('./reducer');
	const store = createStore(
	    reducers,
	    window.devToolsExtension && window.devToolsExtension()
	);
	return store;
});