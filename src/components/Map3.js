import {useState,useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import {selectDepart,selectDestination, setDistance, setMaps} from "../features/counterSlice";
import { Loader } from "@googlemaps/js-api-loader"
import RoomIcon from '@material-ui/icons/Room';
import "./map3.scss";
const Map3=()=>{
    
      const dispatch= useDispatch();
      
function haversine_distance(mk1, mk2) {
    var R = 6371.0710; // Radius of the Earth in kilometers
    var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }



    const [center,set_center]=useState(null)
    const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
        version: "weekly",
        libraries:['drawing', 'geometry', 'places', 'visualization'],
      });
     
      
      const depart=useSelector(selectDepart);
      const destination=useSelector(selectDestination);
      useEffect(()=>{
          console.log(depart,"and ",destination);
      },[depart,destination]);

      const [map,set_map]=useState(null);
      const [depart_marker,set_depart_marker]=useState(null);

    useEffect(()=>{

        
       
        if(loader==null || loader==undefined || depart==null) return;

        set_center({ lat: depart.lat, lng: depart.lng });

        loader.load().then(() => {
            const google=window.google ;
            console.log("googles is now availble",google);
           const m = new google.maps.Map(document.getElementById("map"), {
              center:{ lat: depart.lat, lng: depart.lng },
              zoom: 12,
              mapTypeId:"roadmap",
              disableDefaultUI: true
            });


        const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        const d_marker = new google.maps.Marker({
            position: { lat: depart.lat, lng: depart.lng },
           title:0
        });
        d_marker.setMap(m);


        set_map(m);
        set_depart_marker(d_marker)

        if(destination==null) return;

        const des_marker = new google.maps.Marker({
            position: destination,
           title:0
        });
        des_marker.setMap(m);
        m.setZoom(10);

        var line=new google.maps.Polyline({path:[center,destination],map:m});

        const distance=haversine_distance(d_marker,des_marker);
        dispatch(setDistance(distance));
        console.log("the disatnce is",distance);

        });
        
    },[loader,depart,destination]);

      

    useEffect(()=>{
        dispatch(setMaps(map))
    },[map])
   


    return(
        
            <div id="map"></div>
        
    );
}

export default Map3;