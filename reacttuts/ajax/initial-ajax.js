var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    console.log('check point 1');
    this.serverRequest = $.ajax({method:'get', url:this.props.source, success:function (result) {
      console.log('check point 2');
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this)});
       console.log('check point 3');
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
     console.log('check point 4', this.state.username);
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.querySelector('#main')
);




