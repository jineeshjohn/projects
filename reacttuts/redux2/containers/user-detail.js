define(function(require){
    'use strict';
    var React = require('react');
    var Component = require('react').Component;
    var connect =  require('react-redux').connect;

    /*
     * We need "if(!this.props.user)" because we set state to null by default
     * */

    class UserDetail extends Component {
        render() {
            if (!this.props.user) {
                return (<div>Select a user...</div>);
            }
            return (
                <div>
                    <img src={this.props.user.thumbnail} />
                    <h2>{this.props.user.first} {this.props.user.last}</h2>
                    <h3>Age: {this.props.user.age}</h3>
                    <h3>Description: {this.props.user.description}</h3>
                </div>
            );
        }
    }

    // "state.activeUser" is set in reducers/index.js
    function mapStateToProps(state) {
        return {
            user: state.activeUser
        };
    }

    return connect(mapStateToProps)(UserDetail);
});