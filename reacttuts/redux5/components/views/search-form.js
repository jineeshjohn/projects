define(function(require){
var React =  require('react');
  return  React.createClass({

    getQuery: function() {
      return this.refs.search.value;
    },

    render: function() {
      return (
        <form onSubmit={this.props.search} className="search">
          <input type="text" ref="search" placeholder="Search" />
          <button>Search</button>
        </form>
      );
    }

  });
});