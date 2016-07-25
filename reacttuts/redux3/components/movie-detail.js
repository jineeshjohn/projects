define(function(require){
    'use strict';
    var React = require('react');
    var connect =  require('react-redux').connect;

    /*
     * We need "if(!this.props.movie)" because we set state to null by default
     * */

    var MovieDetail = function(props) {
        if (!props.movie) {
            return (<div>Select a movie...</div>);
        }
        return (
            <div>
                <img src={props.movie.thumbnail} />
                <h2>{props.movie.first} {props.movie.last}</h2>
                <h3>Age: {props.movie.age}</h3>
                <h3>Description: {props.movie.description}</h3>
            </div>
        );
    }


    // "state.activeMovie" is set in reducers/index.js
    function mapStateToProps(state) {
        return {
            movie: state.activeMovie
        };
    }

    return connect(mapStateToProps)(MovieDetail);
});