import React, { useState,useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import {useDispatch, useSelector} from "react-redux";
import {selectDepart,selectDestination} from "../features/counterSlice";

const AnyReactComponent = ({ text }) => <div><RoomIcon  style={{color:"red"}}/></div>;

const SimpleMap =()=> {
 
  const dep=useSelector(selectDepart);
	const des=useSelector(selectDestination);

	useEffect(()=>{
		if(dep==null || des==null) return;

		console.log("ok for ",dep,des);
	},[dep,des]);
 
      //console.log("here we go do some stuff",this.props)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60VH', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_APIKEY}}
          defaultCenter={ {
            lat: 6.1378,
            lng: 1.2125
          }}
          defaultZoom={15}
          language="fr"
        >
          <AnyReactComponent
            lat={6.1378}
            lng={1.2125}
            text="Ma position"
          />
        </GoogleMapReact>

       
      </div>
    );
  
}

export default SimpleMap;