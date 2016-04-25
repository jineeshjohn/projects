var MessageView = p => <div>{p.message}</div>;

var RandomMessage = React.createClass({
    getInitialState: function() {
        return { message: 'Hello, Universe' };
    },
    onClick: function() {
        var messages = ['Hello, Ealing', 'Hello, London', 'Hello, UK', 'Hello, Europe', 'Hello, Earth', 'Hello, Planet'];
        var randomMessage = messages[Math.floor((Math.random() * 3))];

        this.setState({ message: randomMessage });
    },
    render: function() {
        return (
            <div>
        <MessageView message={ this.state.message }/>
        <p><input type="button" onClick={ this.onClick } value="Change Message"/></p>
      </div>
        );
    }
});



ReactDOM.render(
    <RandomMessage />,
    document.getElementById('container')
);
