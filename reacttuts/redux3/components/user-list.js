define(function(require){
    'use strict';
    var React = require('react');
    var bindActionCreators = require('redux').bindActionCreators;
    var connect = require('react-redux').connect;


    // actions - can go to a different file
    var selectUser = function(user) {
        console.log("You clicked on user: ", user.first);
        return {
            type: 'USER_SELECTED',
            payload: user
        }
    };
    var UserList = function(props) {
        var renderList = props.users.map((user) => {
            return (
                <li
                    key={user.id}
                    onClick={props.selectUser.bind(null,user)}
                >
                    {user.first} {user.last}
                </li>
            );
        });
        return (
            <ul>
                {renderList}
            </ul>
        );
    }

    // Get apps state and pass it as props to UserList
    //      > whenever state changes, the UserList will automatically re-render
    function mapStateToProps(state) {
        return {
            users: state.users
        };
    }

    // Get actions and pass them as props to to UserList
    //      > now UserList has this.props.selectUser
    function matchDispatchToProps(dispatch){
        return bindActionCreators({selectUser: selectUser}, dispatch);
    }

    // We don't want to return the plain UserList (component) anymore, we want to return the smart Container
    //      > UserList is now aware of state and actions
    return connect(mapStateToProps, matchDispatchToProps)(UserList);
});