define(function(require){
    'use strict';
    var React = require('react');
    var Component = require('react').Component;
    var bindActionCreators = require('redux').bindActionCreators;
    var connect = require('react-redux').connect;
    var selectUser= require('../actions/index');


    class UserList extends Component {

        renderList() {
            console.log('JJ:',this.props);
            debugger;
            return this.props.users.map((user) => {
                return (
                    <li
                        key={user.id}
                        onClick={() => this.props.selectUser(user)}
                    >
                        {user.first} {user.last}
                    </li>
                );
            });
        }

        render() {
            return (
                <ul>
                    {this.renderList()}
                </ul>
            );
        }

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
    var connectProps = connect(mapStateToProps, matchDispatchToProps)(UserList);
    debugger;
    return connectProps;
});