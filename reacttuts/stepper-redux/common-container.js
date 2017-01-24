define(function(require){
	'use strict';
	var React = require('react');
	var connect = require('react-redux').connect;

	var RegisterForm = require('es6!./registerForm');
	var VerifyForm = require('es6!./verifyForm');
	var RegisterSuccess = require('es6!./registerSuccess');
	var Stepper = require('es6!./stepper');
	var Actions = require('./action');


	var CommonContainer = React.createClass({

		render: function() {
			var PageList = [RegisterForm,VerifyForm,RegisterSuccess];
			var CurrentPage = PageList[this.props.page];
			return(
				<div className='common-container'>
					<CurrentPage
						username={this.props.username}
						changeUserName={Actions.changeUserName}
					/>
					<Stepper
						nextPage={Actions.nextPage}
						page={this.props.page}
						previousPage={Actions.previousPage}
					 />
				</div>
			);
		}
	});
	var mapStateToProps = function(state){
		return state.pageData;
	};
	return connect(mapStateToProps)(CommonContainer);

});
