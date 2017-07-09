define(function (require) {
    var React = require('react');
    var $ = require('jquery');
    var CrimeMap = require('es6!./crime-map');

    var CrimeMapContainer = React.createClass({
        getInitialState: function (props) {
            return {
                isLoading: true,
                google: null,
                crimeData: null
            };
        },
        componentDidMount: function () {
            $.when(
                $.ajax({ dataType: 'script', url: '//maps.googleapis.com/maps/api/js' }),
                $.ajax({ url: '//data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2013-01' })
            ).done(function (map, data) {
                var crimeData = data[0]; // contains first argment      
                this.setState({ isLoading: false, google: window.google, crimeData: crimeData });
            }.bind(this));
        },
        render: function () {
            return (
                <div className="App">
                    {this.state.isLoading ? <div> Map loading </div> :
                        <CrimeMap
                            google={this.state.google}
                            crimeData={this.state.crimeData}
                        />}
                </div>
            );
        }
    });
    return CrimeMapContainer;
});
