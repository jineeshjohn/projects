define(function(require) {
	var createStore  = require('redux').createStore;
	var reducers = require('./reducer');

	const store = createStore(reducers);
	return store;
});