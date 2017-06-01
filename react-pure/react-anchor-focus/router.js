define(function(require){
  var React = require('react');
  var Router = require('react-router').Router;
  var Route = require('react-router').Route;
  var browserHistory = require('react-router').browserHistory;
  var IndexRoute = require('react-router').IndexRoute;

// Layouts
  var MainLayout = require('es6!./components/layouts/main-layout');
  var SearchLayoutContainer = require('es6!./components/containers/search-layout-container');

// Pages
  var Home = require('es6!./components/home');
  var UserListContainer = require('es6!./components/containers/user-list-container');
  var UserProfileContainer = require('es6!./components/containers/user-profile-container');
  var WidgetListContainer = require('es6!./components/containers/widget-list-container');


    return (
      <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Home} />

            <Route path="users">
              <Route component={SearchLayoutContainer}>
                <IndexRoute component={UserListContainer} />
              </Route>
              <Route path=":userId" component={UserProfileContainer} />
            </Route>

            <Route path="widgets">
              <Route component={SearchLayoutContainer}>
                <IndexRoute component={WidgetListContainer} />
              </Route>
            </Route>

        </Route>
      </Router>
    );

});