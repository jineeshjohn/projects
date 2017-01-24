/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */
define(function(require){
    'use strict';
    return function () {
        return [
            {
                id: 1,
                first: "Bucky1",
                last: "Roberts1",
                age: 71,
                description: "Bucky is a React developer and YouTuber1",
                thumbnail: "http://i.imgur.com/7yUvePI.jpg"
            },
            {
                id: 2,
                first: "Joby",
                last: "Wasilenko",
                age: 27,
                description: "Joby loves the Packers, cheese, and turtles.1",
                thumbnail: "http://i.imgur.com/52xRlm8.png"
            },
            {
                id: 3,
                first: "Madison1",
                last: "Williams1",
                age: 24,
                description: "Madi likes her dog but it is really annoying.1",
                thumbnail: "http://i.imgur.com/4EMtxHB.png"
            }
        ]
    }
});
