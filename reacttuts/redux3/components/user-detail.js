define(function(require){
    'use strict';
    var React = require('react');
    var connect =  require('react-redux').connect;

    /*
     * We need "if(!this.props.user)" because we set state to null by default
     * */

    var UserDetail = function(props) {
        if (!props.user) {
            return (<div>Select a user...</div>);
        }
        return (
            <div>
                <img src={props.user.thumbnail} />
                <h2>{props.user.first} {props.user.last}</h2>
                <h3>Age: {props.user.age}</h3>
                <h3>Description: {props.user.description}</h3>
            </div>
        );
    }


    // "state.activeUser" is set in reducers/index.js
    function mapStateToProps(state) {
        return {
            user: state.activeUser
        };
    }

    return connect(mapStateToProps)(UserDetail);
});