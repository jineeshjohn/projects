define(function(require) {

    var React = require('react');
    var ReactDOM = require('react-dom');
    var Provider  = require('react-redux').Provider;
    var store = require('es6!./store');
    var router = require('es6!./router');


// Layouts
  var MainLayout = require('es6!./components/layouts/main-layout');
//   var SearchLayoutContainer = require('es6!./components/containers/search-layout-container');

// // Pages
//   var Home = require('es6!./components/home');
//   var UserListContainer = require('es6!./components/containers/user-list-container');
//   var UserProfileContainer = require('es6!./components/containers/user-profile-container');
//   var WidgetListContainer = require('es6!./components/containers/widget-list-container');


    // Provider is a top-level component that wrapps our entire application, including
    // the Router. We pass it a reference to the store so we can use react-redux's
    // connect() method for Component Containers.
    function SomeFun(){
    	return (
    		<Provider store={store}>
    			<MainLayout/>
    		</Provider>
    	)
    };
    return SomeFun;

});
