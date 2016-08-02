define(function(require) {

    var React = require('react');
    var ReactDOM = require('react-dom');
    var Provider  = require('react-redux').Provider;
    var store = require('es6!./store');
    var router = require('es6!./router');

    // Provider is a top-level component that wrapps our entire application, including
    // the Router. We pass it a reference to the store so we can use react-redux's
    // connect() method for Component Containers.

   	return <Provider store={store}>{router}</Provider>;

});
