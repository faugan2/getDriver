import HeaderBack from "../components/HeaderBack";
import "./commander.scss";
import SearchIcon from '@material-ui/icons/Search';
import Destination from "../components/Destination";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import map from "../components/img/map.png";
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {selectType, setCourse,setDepart,setDestination,selectDepart,selectDestination, setSearchDestinationText} from "../features/counterSlice";
import { useHistory } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RoomIcon from '@material-ui/icons/Room';
import {auth} from "../firebase_file";

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ClearIcon from '@material-ui/icons/Clear';

import { Loader } from "@googlemaps/js-api-loader"
import Maps from "../components/Map";
import Map2 from "../components/Map2";
import Map3 from "../components/Map3";
import Places from "../components/Places";

const Commander=(props)=>{
	
	
	const t=useSelector(selectType);
	
	const [arrive,set_arrive]=useState(false);
	const [depart,set_depart]=useState("");
	const [destination,set_destination]=useState(null);
	const [categorie,set_categorie]=useState("");
	const [type,set_type]=useState(false);
	const [longitude,set_longitude]=useState(0);
	const [latitude,set_latitude]=useState(0);
	
	const dispatch=useDispatch();
	
	const history=useHistory();
	
	const show_depart=()=>{
		
		const cat=document.querySelector("#categorie").value;
		set_categorie(cat);
		set_type(true);
	}
	
	const show_destination_input=()=>{
		if(depart==""){
			alert("Aucune position de depart n'est saisie");
			return;
		}
		set_arrive(true);
	}
	const show_commande_details=()=>{
		if(destination==""){
			alert("Aucune destination n'est saisie");
			return;
		}
		
		const course={depart,destination,categorie};
		dispatch(setCourse(course));
		history.push("/details-commande")
	}
	
	const choisir_emplacement=(nom,quartier)=>{
		if(arrive==false){
			set_depart(nom);
		}else{
			set_destination(nom);
		}
	}

	useEffect(()=>{
		
	},[]);

	useEffect(()=>{
		const google=window.google ;
		console.log("je sui sgoogle",google);
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log("Latitude is :", position.coords.latitude);
			console.log("Longitude is :", position.coords.longitude);
			const objet={lat:position.coords.latitude,lng:position.coords.longitude};
			dispatch(setDepart(objet));
			set_longitude(position.coords.latitude);
			set_latitude(position.coords.longitude)
			set_arrive(true);
		  },
		 
		  );
	},[])

	useEffect(()=>{
		if(t==null) return;
		set_type(true);
		set_categorie(t);
	},[t]);

	


	

	const dep=useSelector(selectDepart);
	const des=useSelector(selectDestination);


	
	const [search_destination,set_search_destination]=useState("");

	const clear_search_destination=(e)=>{
		set_search_destination("");
		dispatch(setSearchDestinationText(""));
		document.querySelector("#input_search").focus();
	}

	function initService(depart) {
        
        const center = {lat:depart.lat,lng:depart.long};
        // Create a bounding box with sides ~10km away from the center point
        const defaultBounds = {
            north: center.lat + 0.1,
            south: center.lat - 0.1,
            east: center.lng + 0.1,
            west: center.lng - 0.1,
        };

       // console.log("depart is ",center)
        const input = document.getElementById("input_search");

        const options = {
            bounds: defaultBounds,
            componentRestrictions: { country: "tg" },
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false,
            types: ["establishment"],
        };

        var google=window.google;
        const autocomplete = new google.maps.places.Autocomplete(input, options);
        
        /*autocomplete.addListener("place_changed",()=>{
            const place=autocomplete.getPlace();
            const lat=place.geometry.location.lat();
            const lng=place.geometry.location.lng();

           const destination={lat,lng};
           dispatch(setDestination(destination))
           prediction(input.value);
        })*/

        
       

    
          
      }

	  useEffect(()=>{
		//initService(dep);
	  },[])

	return(
		<div className="commander" style={{position:"relative"}}>
			{(longitude==0 && latitude==0) && <HeaderBack title="Patientez..." />}
			
			
			
			<div className="commander_body">
				{
					(longitude==0 && latitude==0)? 
					<p style={{textAlign:"center",fontSize:"0.8rem",padding:"1rem"}}>Détection de votre position...</p>:
					<div className="maps" style={{position:"relative"}}>
						<div><Map3 /></div>
						<div><Places /></div>
						<div style={{
							position:"absolute",
							top:"0rem",
							left:"0rem",
							right:"0rem",
							height:"50px",
							backgroundColor:"rgba(0,0,0,0.5)",
							display:"flex",
							alignItems:"center",
							padding:"0 0.5rem",
						}}>
								<button style={{
									backgroundColor:"white",
									border:"none",
									borderRadius:"50%",
									width:"2rem",
									height:"2rem",
									
									marginRight:"0.5rem",
									display:"flex",
									alignItems:"center",
									justifyContent:"center",
									}}
									onClick={e=>{
										dispatch(setDepart(null));
										dispatch(setDestination(null));
										history.push("/main")
									}}
									>
									<ArrowBackIcon />
								</button>
								<div style={{
									flex:1,
									backgroundColor:"white",
									display:"flex",
									alignItems:"center",
									borderRadius:"5px",
									}}>
									<RoomIcon style={{fontSize:"1.2rem",color:"gray"}} />
									<input 
									value={search_destination}
									onChange={e=>{
										set_search_destination(e.target.value)
										dispatch(setSearchDestinationText(e.target.value));
									}}
									style={{
										flex:1,
										padding:"0.5rem",
										border:"none",
										outline:"none",
										borderRadius:"5px",
									}}
									type="text" placeholder="Quelle est votre destination ?" id="input_search"  />
									
									{search_destination!="" && <button style={{
										backgroundColor:"white",
										border:"none",
										outline:"none",
									}}
									onClick={clear_search_destination}
									>
										<ClearIcon style={{fontSize:"1.2rem",color:"gray"}} />
									</button>
									}
									
								</div>
								<button
								style={{
									backgroundColor:"white",
									border:"none",
									borderRadius:"50%",
									width:"2rem",
									height:"2rem",
									borderRadius:"50%",
									marginLeft:"0.5rem",
									display:"none",
									alignItems:"center",
									justifyContent:"center",
									display:"none",
									alignItems:"center",
									}}
								><MoreHorizIcon/></button>
						</div>
					</div>
				}

				
				
				
			</div>
		</div>
	);
}

export default Commander;
