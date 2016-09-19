define(function(require) {
	'use strict';
	var React = require('react');

	var VerifyForm = function(props){
		return(
			<div>
				<strong>Username</strong>: {props.username}
			</div>
		);
	}
	return VerifyForm;
});
