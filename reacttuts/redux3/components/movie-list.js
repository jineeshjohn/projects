define(function(require){
    'use strict';
    var React = require('react');
    var bindActionCreators = require('redux').bindActionCreators;
    var connect = require('react-redux').connect;


    // actions - can go to a different file
    var selectMovie = function(movie) {
        console.log("You clicked on movie: ", movie.first);
        return {
            type: 'MOVIE_SELECTED',
            payload: movie
        }
    };
    var MovieList = function(props) {
        var renderList = props.movies.map((movie) => {
            return (
                <li
                    key={movie.id}
                    onClick={props.selectMovie.bind(null,movie)}
                >
                    {movie.first} {movie.last}
                </li>
            );
        });
        return (
            <ul>
                {renderList}
            </ul>
        );
    }

    // Get apps state and pass it as props to MovieList
    //      > whenever state changes, the MovieList will automatically re-render
    function mapStateToProps(state) {
        return {
            movies: state.movies
        };
    }

    // Get actions and pass them as props to to MovieList
    //      > now MovieList has this.props.selectMovie
    function matchDispatchToProps(dispatch){
        return bindActionCreators({selectMovie: selectMovie}, dispatch);
    }

    // We don't want to return the plain MovieList (component) anymore, we want to return the smart Container
    //      > MovieList is now aware of state and actions
    return connect(mapStateToProps, matchDispatchToProps)(MovieList);
});