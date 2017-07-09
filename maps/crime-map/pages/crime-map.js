
define(function (require) {
    var React = require('react');

    var CrimeMap = React.createClass({
        componentDidMount: function () {
            var location = this.props.crimeData[0].location; // center to the first item
            var myLatLng = { lat: +location.latitude, lng: +location.longitude }
            var map = new this.props.google.maps.Map(this.mapEl, {
                zoom: 14,
                center: myLatLng
            });

            var crimeList = this.props.crimeData; // array

            for (var i = 0; i < crimeList.length; i++) {
                var crime = crimeList[i];

                var marker = new this.props.google.maps.Marker({
                    position: { lat: +crime.location.latitude, lng: +crime.location.longitude },
                    map: map,
                    title: crime.category,
                    zIndex: 8
                });
                var infowindow = new this.props.google.maps.InfoWindow({
                    content: crime.location.street.name
                });
                (function (_marker, _infowindow) {
                    _marker.addListener('click', function () {
                        _infowindow.open(map, _marker);
                    });
                })(marker, infowindow);
            }
        },
        render: function () {
            return (
                <div>
                    <div ref={(el) => { this.mapEl = el; }} style={{ height: "600px" }} />
                </div>
            );
        }
    });
    return CrimeMap;
});

