define(function(require) {


    var axios = require('axios');
    var store = require('../store');
    var userAction = require('../actions/user-actions');

    /**
     * Get all users
     */

    function getUsers() {
        return axios.get('http://localhost:3001/users')
            .then(response => {
                store.dispatch(userAction.getUsersSuccess(response.data));
                return response;
            });
    }

    /**
     * Search users
     */

    function searchUsers(query = '') {
        return axios.get('http://localhost:3001/users?q=' + query)
            .then(response => {
                store.dispatch(userAction.getUsersSuccess(response.data));
                return response;
            });
    }

    /**
     * Delete a user
     */

    function deleteUser(userId) {
        return axios.delete('http://localhost:3001/users/' + userId)
            .then(response => {
                store.dispatch(userAction.deleteUserSuccess(userId));
                return response;
            });
    }

    /**
     * getProfile() is much more complex because it has to make
     * three XHR requests to get all the profile info.
     */

    function getProfile(userId) {

        // Start with an empty profile object and build it up
        // from multiple XHR requests.
        let profile = {};

        // Get the user data from our local database.
        return axios.get('http://localhost:3001/users/' + userId)
            .then(response => {

                let user = response.data;
                profile.name = user.name;
                profile.twitter = user.twitter;
                profile.worksOn = user.worksOn;

                // Then use the github attribute from the previous request to
                // sent two XHR requests to GitHub's API. The first for their
                // general user info, and the second for their repos.
                return Promise.all([
                    axios.get('https://api.github.com/users/' + user.github),
                    axios.get('https://api.github.com/users/' + user.github + '/repos')
                ]).then(results => {

                    let githubProfile = results[0].data;
                    let githubRepos = results[1].data;

                    profile.imageUrl = githubProfile.avatar_url;
                    profile.repos = githubRepos;

                    store.dispatch(userAction.userProfileSuccess(profile));

                    return;

                });

            });

    }
    return {
        getUsers: getUsers,
        searchUsers: searchUsers,
        deleteUser: deleteUser,
        getProfile: getProfile
    }
});
