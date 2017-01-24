define(function(require) {
    var types =  require('../actions/action-types');

    function getUsersSuccess(users) {
        return {
            type: types.GET_USERS_SUCCESS,
            users
        };
    }

    function deleteUserSuccess(userId) {
        return {
            type: types.DELETE_USER_SUCCESS,
            userId
        };
    }

    function userProfileSuccess(userProfile) {
        return {
            type: types.USER_PROFILE_SUCCESS,
            userProfile
        };
    }
    return{
      getUsersSuccess: getUsersSuccess,
      deleteUserSuccess: deleteUserSuccess,
      userProfileSuccess: userProfileSuccess
    }
});
