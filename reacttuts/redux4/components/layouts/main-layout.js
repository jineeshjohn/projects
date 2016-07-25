define(function(require){

var React = require('react');
var Link  = require('react-router').Link;

// Using "Stateless Functional Components"
return function(props) {
    return (
      <div className="app">
        <header className="primary-header"></header>
        <aside className="primary-aside">
          <ul>
            <li><Link to="/" activeClassName="active">Home</Link></li>
            <li><Link to="/users" activeClassName="active">Users</Link></li>
            <li><Link to="/widgets" activeClassName="active">Widgets</Link></li>
          </ul>
        </aside>
        <main>
          {props.children}
        </main>
      </div>
      );
  }
});