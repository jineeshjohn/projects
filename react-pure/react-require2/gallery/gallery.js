define(function(require) {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');

    var ProductList = require('es6!./product-list');
    // data
    var items = [
        { title: 'Kitten 1', image: ['http://placekitten.com/301/301', 'http://placekitten.com/311/311', 'http://placekitten.com/311/311'] },
        { title: 'Kitten 2', image: ['http://placekitten.com/302/302', 'http://placekitten.com/312/312', 'http://placekitten.com/322/322'] },
        { title: 'Kitten 3', image: ['http://placekitten.com/303/303', 'http://placekitten.com/313/313', 'http://placekitten.com/323/323'] },
        { title: 'Kitten 4', image: ['http://placekitten.com/304/304', 'http://placekitten.com/314/314', 'http://placekitten.com/324/324'] },
        { title: 'Kitten 5', image: ['http://placekitten.com/305/305', 'http://placekitten.com/315/315', 'http://placekitten.com/325/325'] },
        { title: 'Kitten 6', image: ['http://placekitten.com/306/306', 'http://placekitten.com/316/316', 'http://placekitten.com/326/326'] },
        { title: 'Kitten 7', image: ['http://placekitten.com/307/307', 'http://placekitten.com/317/317', 'http://placekitten.com/327/327'] },
        { title: 'Kitten 8', image: ['http://placekitten.com/308/308', 'http://placekitten.com/318/318', 'http://placekitten.com/328/328'] },
        { title: 'Kitten 9', image: ['http://placekitten.com/310/310', 'http://placekitten.com/319/319', 'http://placekitten.com/329/329'] }
    ];

    var Gallery = function() {
        return <ProductList items={items} />
    }

    return Gallery;

});
