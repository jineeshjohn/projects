define(function(require){
	'use strict';
	var React = require('react');
	var store = require('./store');
	var RegisterForm = require('es6!./registerForm');
	var VerifyForm = require('es6!./verifyForm');
	var RegisterSuccess = require('es6!./registerSuccess');
	var Stepper = require('es6!./stepper');


	var CommonContainer = React.createClass({
		getInitialState: function(){
			return {
				username: 'Lalu',
				page: 0,
				PageList:[RegisterForm,VerifyForm,RegisterSuccess]
			};
		},
		nextPage: function(){
			this.setState({page: this.state.page + 1});
		},
		previousPage: function() {
			this.setState({page: this.state.page - 1});
		},
		changeUserName: function(e){
			this.setState({username: e.target.value});
		},
		render: function() {
			var CurrentPage = this.state.PageList[this.state.page];
			return(
				<div className='common-container'>
					<CurrentPage
						username={this.state.username}
						changeUserName={this.changeUserName}
					/>
					<Stepper
						nextPage={this.nextPage}
						page={this.state.page}
						previousPage={this.previousPage}
					 />
				</div>
			);
		}
	});

	return CommonContainer;

});
