define(function(require){
	'use strict';
	var React =  require('react');
	var UserList =  require('es6!../containers/user-list');
	var UserDetails = require('es6!../containers/user-detail');

	const App = () => (
	    <div>
	        <h2>User List</h2>
	        <UserList />
	        <hr />
	        <h2>User Details</h2>
	        <UserDetails />
	    </div>
	);

	return App;

});