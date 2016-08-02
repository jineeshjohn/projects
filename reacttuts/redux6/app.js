define(function(require){
	var React = require('react');
    var Provider = require('react-redux').Provider;
    var store = require('./store');
    var Welcome = require('es6!./Welcome');

	function Hello() {
		return (

				<Welcome store={store} />

		);
	};
	return Hello;
});