define(function(require){
  var React = require('react');
  var connect  = require('react-redux').connect;
  var UserProfile = require('../views/user-profile');
  var userApi = require('../../api/user-api');

  const UserProfileContainer = React.createClass({

    componentDidMount: function() {
      let userId = this.props.params.userId
      userApi.getProfile(userId)
    },

    render: function() {
      return (
        <UserProfile {...this.props.profile} />
      );
    }

  });

  const mapStateToProps = function(store) {
    return {
      profile: store.userState.userProfile
    };
  };

  return connect(mapStateToProps)(UserProfileContainer);
});