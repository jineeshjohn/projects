define(function(require) {
	'use strict';

	var React = require('react');

	var UserForm = function(props) {
		return(
			<div>
				Username :
				<input type='text'
				value={props.username}
				onChange={props.changeUserName} />
			</div>
		);
	};
	return UserForm;
});
