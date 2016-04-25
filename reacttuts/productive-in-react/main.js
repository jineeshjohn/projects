// App
var App = React.createClass({
  /*setting state*/
  getInitialState: function() {
    return {
      bgColor: "teal"
    };
  },
  /*changes state*/
  handleColorChange: function (color) {
    // when we set state directly, react doesn't know
    // about it. that's why we use setState
    this.setState({ bgColor: color });
  },
  /*for the lifecycle methods*/
  updateBackgroundColor: function () {
    var body = document.querySelector('body')
    body.style.background = this.state.bgColor
  },
  /*lifecycle methods*/
  componentDidMount: function () {
    this.updateBackgroundColor()
  },
  componentDidUpdate: function () {
    this.updateBackgroundColor()
  },
  render: function() {
    return (
    /* by calling the title here on the component, we can access this.props on header */
      <div className="foo">
        <h1>Hello, World!</h1>
        <label>What color?
          <ColorPicker value={this.state.bgColor} onColorChange={this.handleColorChange}/>
        </label>
      </div>
    )
  }
});

// ColorPicker component
var ColorPicker = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    onColorChange: React.PropTypes.func
  },
  handleChange: function(e) {
    e.preventDefault();
    var color = e.target.value

    // If whoever rendered us (the ColorPicker) is interested
    // when the color changes, let them know
    if (this.props.onColorChange)
      this.props.onColorChange(color);
  },
  render: function() {
    return (
      <select value={this.props.value} onChange={this.handleChange}>
        <option value="orangered">orangered</option>
        <option value="teal">teal</option>
        <option value="orange">orange</option>
        <option value="indigo">indigo</option>
        <option value="red">red</option>
      </select>
    )
  }
});

ReactDOM.render(<App/>, document.querySelector('#main'));