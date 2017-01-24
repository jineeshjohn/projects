define(function(require){
	'use strict';
	var combineReducers = require('redux').combineReducers;
	var UserReducer = require('./reducer-users');
	var OrgReducer = require('./reducer-org');
	var ActiveUserReducer = require('./reducer-active-user');

	/*
	 * We combine all reducers into a single object before updated data is dispatched (sent) to store
	 * Your entire applications state (store) is just whatever gets returned from all your reducers
	 * */

	const allReducers = combineReducers({
	    users: UserReducer,
	    activeUser: ActiveUserReducer,
	    orgUser: OrgReducer
	});

	return allReducers;
});
