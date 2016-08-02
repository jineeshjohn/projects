define(function(require) {
    var createStore  = require('redux').createStore;
    var reducers = require('./reducers/index');

    const store = createStore(reducers);
    return store;
});
