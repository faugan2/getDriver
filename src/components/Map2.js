import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";


const places = [
    
    {
      name: "Taguig",
      title: "Taguig",
      lat: 14.5135352,
      lng: 121.0303829,
      id: 2,
    },
    {
      name: "Makati",
      title: "Makati",
      lat: 14.554592,
      lng: 121.0156802,
      id: 3,
    },
  ];

export class MapContainer extends Component {
    
  onMapReady = (mapProps, map) => {
     
     
    let coords = [];
    let waypoints = [];
    //put data from config file in an array
    {
      places.map((place) => coords.push({ lat: place.lat, lng: place.lng }));
    }
    let google=window.google;
    //instantiate directions service and directions renderer
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    //put directions renderer to render in the map
    directionsDisplay.setMap(map);
    //Getting the first coordinate in the array as the start/origin
    let start = { lat: coords[0].lat, lng: coords[0].lng };
    //Getting the last coordinate in the array as the end/destination
    let end = {
      lat: coords[coords.length - 1].lat,
      lng: coords[coords.length - 1].lng,
    };
    
    //putting all the coordinates between the first and last coordinate from the array as the waypoints
    for (let i = 1; i < coords.length - 1; i++) {
      waypoints.push({
        location: { lat: coords[i].lat, lng: coords[i].lng },
        stopover: true,
      });
    }

    console.log("waypoint is ",waypoints);
    // directions requests

    let request = {
      origin: start,
      waypoints: waypoints,
      destination: end,
      travelMode: "DRIVING",
    };
    //show results in the directionsrenderer
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsDisplay.setDirections(result);
      }
    });

    //setting the autocomplete input
    let card = document.getElementById("pac-card");
    let input = document.getElementById("pac-input");
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    let autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);

    //listener for the places input
    autocomplete.addListener("place_changed", function () {
      
      let place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      
      //Putting the previous last coordinate in the array to be part of the waypoint
      waypoints.push({
        location: {
          lat: coords[coords.length - 1].lat,
          lng: coords[coords.length - 1].lng,
        },
        stopover: true,
      });

      //putting the Place Autocomplete coordinate result in the coords array
      coords.push({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      //putting the Place Autocomplete coordinate result the value of the end/destination
      end = place.geometry.location;
      
      //changing  request
      request = {
        origin: start,
        waypoints: waypoints,
        destination: end,
        travelMode: "DRIVING",
      };
      //creating new directions request
      directionsService.route(request, function (result, status) {
        console.log("direction service",request,result,status)
        if (status == "OK") {
          directionsDisplay.setDirections(result);
        }
      });
    });
  };


  render() {
    if (!this.props.loaded) return <div>Loading...</div>;
    console.log("the props are",this.props)
    return (
      <div>
        <Map
          className="map"
          initialCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
          google={this.props.google}
          onClick={this.onMapClicked}
          onReady={this.onMapReady}
          style={{ height: "60%", width: "100%" }}
          zoom={8}
        ></Map>
        <div className="pac-card" id="pac-card">
          <div>
            <div id="title">Add new point</div>

            <div id="pac-container">
              <input
                id="pac-input"
                type="text"
                placeholder="Enter a location"
              />
            </div>
          </div>
        </div>
        <div style={{ width: 500, height: 500 ,display:"none"}} id={this.props.id} />
        <div id="infowindow-content" style={{display:"none"}}>
          <img src="" width="16" height="16" id="place-icon" />
          <span id="place-name" className="title"></span>
          <br />
          <span id="place-address"></span>
          <br />
          <span id="place-coord"></span>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
  version: "3.40",
})(MapContainer);