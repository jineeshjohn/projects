define(function(require) {
	'use strict';
	var store = require('./store');
	var MainAction = function() {

		var nextPage =  function(){
			store.dispatch({});
			this.setState({page: this.props.page + 1});
		};
		var previousPage =  function() {
			this.setState({page: this.props.page - 1});
		};
		var changeUserName =  function(e){
			this.setState({username: e.target.value});
		};
		return {
			nextPage: nextPage,
			previousPage: previousPage,
			nextPage: nextPage
		}

	}
	return MainAction;

});
