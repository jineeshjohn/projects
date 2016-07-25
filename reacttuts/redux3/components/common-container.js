define(function(require){
	'use strict';
	var React =  require('react');
	var UserList =  require('es6!./user-list');
	var UserDetails = require('es6!./user-detail');
	var MovieList =  require('es6!./movie-list');
	var MovieDetails = require('es6!./movie-detail');

	const CommonContainer = () => (
		<div className='common-container'>
		    <div className='user-container'>
		        <h2>User List</h2>
		        <UserList />
		        <hr />
		        <h2>User Details</h2>
		        <UserDetails />
		    </div>
		    <div className='movie-container'>
		        <h2>Movie List</h2>
		        <MovieList />
		        <hr />
		        <h2>Movie Details</h2>
		        <MovieDetails />
		    </div>
		</div>
	);

	return CommonContainer;

});