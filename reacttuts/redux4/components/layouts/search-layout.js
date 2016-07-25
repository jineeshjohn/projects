define(function(require){

var React = require('react');
var Link  = require('react-router').Link;

var SearchFormContainer =  require('../containers/search-form-container');

// Using "Stateless Functional Components"
return function(props) {
  return (
    <div className="search">
      <header className="search-header">
        {props.title}
        <SearchFormContainer searchType={props.searchType} />
      </header>
      <div className="search-results">
        {props.children}
      </div>
      <footer className="search-footer">
        {props.totalResults} Results
      </footer>
    </div>
    );
}
});