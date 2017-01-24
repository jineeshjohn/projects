define(function(require) {

    var React = require('react');
    var ReactDOM = require('react-dom');
    var Provider  = require('react-redux').Provider;
    var store = require('es6!./store');



    var Layout = require('es6!./layout');

    function SomeFun(){
    	return (
    		<Provider store={store}>
    			<Layout/>
    		</Provider>
    	)
    };
    return SomeFun;

});
