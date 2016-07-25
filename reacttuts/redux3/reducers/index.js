define(function(require){
	'use strict';
	var combineReducers = require('redux').combineReducers;

	var UserReducer = function () {
        return [
            {
                id: 1,
                first: "Bucky",
                last: "Roberts",
                age: 71,
                description: "Bucky is a React developer and YouTuber",
                thumbnail: "http://i.imgur.com/7yUvePI.jpg"
            },
            {
                id: 2,
                first: "Joby",
                last: "Wasilenko",
                age: 27,
                description: "Joby loves the Packers, cheese, and turtles.",
                thumbnail: "http://i.imgur.com/52xRlm8.png"
            },
            {
                id: 3,
                first: "Madison",
                last: "Williams",
                age: 24,
                description: "Madi likes her dog but it is really annoying.",
                thumbnail: "http://i.imgur.com/4EMtxHB.png"
            }
        ]
    };
	var ActiveUserReducer = function (state = null, action) {
	    switch (action.type) {
	        case 'USER_SELECTED':
	            return action.payload;
	            break;
	    }
	    return state;
	};

    var MovieReducer = function () {
        return [
            {
                id: 1,
                first: "Bucky",
                last: "Roberts",
                age: 71,
                description: "Bucky is a React developer and YouTuber",
                thumbnail: "http://i.imgur.com/7yUvePI.jpg"
            },
            {
                id: 2,
                first: "Joby",
                last: "Wasilenko",
                age: 27,
                description: "Joby loves the Packers, cheese, and turtles.",
                thumbnail: "http://i.imgur.com/52xRlm8.png"
            },
            {
                id: 3,
                first: "Madison",
                last: "Williams",
                age: 24,
                description: "Madi likes her dog but it is really annoying.",
                thumbnail: "http://i.imgur.com/4EMtxHB.png"
            }
        ]
    };
    var ActiveMovieReducer = function (state = null, action) {
        switch (action.type) {
            case 'MOVIE_SELECTED':
                return action.payload;
                break;
        }
        return state;
    };


	const allReducers = combineReducers({
        users: UserReducer,
        activeUser: ActiveUserReducer,
        movies: MovieReducer,
	    activeMovie: ActiveMovieReducer
	});

	return allReducers;
});
