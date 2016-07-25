define(function(require){

    var React = require('react');
    var connect  = require('react-redux').connect;
    var UserList = require('../views/user-list');
    var userApi = require('../../api/user-api');
    var store = require('../../store');
    var loadSearchLayout   = require('../../actions/search-layout-actions').loadSearchLayout;

    const UserListContainer = React.createClass({

      componentDidMount: function() {
        userApi.getUsers();
        store.dispatch(loadSearchLayout('users', 'User Results'));
      },

      render: function() {
        return (
          <UserList users={this.props.users} deleteUser={userApi.deleteUser} />
        );
      }

    });

    const mapStateToProps = function(store) {
      return {
        users: store.userState.users
      };
    };

    return connect(mapStateToProps)(UserListContainer);
});