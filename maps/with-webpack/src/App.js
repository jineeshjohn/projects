import React, { Component } from 'react';
import $ from 'jquery';
import GoogleMap from './GoogleMap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, google: null, crimeData: null };
  }
  componentDidMount() {

    $.when(
      $.ajax({ dataType: 'script', url: '//maps.googleapis.com/maps/api/js' }),
      $.ajax({ url: '//data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2013-01' })
    ).done(function (map, data) {
      var crimeData = data[0]; // contains first argment      
      this.setState({ isLoading: false, google: window.google, crimeData: crimeData });
    }.bind(this));
  }
  render() {
    return (
      <div className="App">
        {this.state.isLoading ? <div> Map loading </div> :
          <GoogleMap
            google={this.state.google}
            crimeData={this.state.crimeData}
          />}
      </div>
    );
  }
}

export default App;
