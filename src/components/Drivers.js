import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import RoomIcon from '@material-ui/icons/Room';
import {useDispatch} from "react-redux";
import {setDriver} from "../features/counterSlice";
import { useHistory } from 'react-router';
import Driver from "./Driver";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";

export default function Drivers() {
  const dispatch= useDispatch();
  const history=useHistory();

  const [data,setData]=useState([1,2,3,4,5,6,7,8,9,10])
  const show_driver_profile=(driver)=>{
      dispatch(setDriver(driver));
        history.push("/driver");
  }
  
  const commander=(e)=>{
	  history.push("/commander");
  }
  
  const discuter=(nom)=>{
	  dispatch(setDriver({nom}))
	  history.push("/discuter");
  }
  const appeler=(nom,img)=>{
	  dispatch(setDriver({nom,img}))
	  
	  history.push("/appeler");
  }

  return (
   <div style={{color:"black",flex:1,marginBottom:"5rem"}}>
		<Driver click={commander} photo={img1} nom="Amidou" categorie="Taxi" discuter={discuter} appeler={appeler}/>
		<Driver click={commander} photo={img2} nom="Jack" categorie="Pois Léger" discuter={discuter} appeler={appeler} />
		<Driver click={commander} photo={img3} nom="Kokou" categorie="Pois Lourds" discuter={discuter} appeler={appeler} />
		<Driver click={commander} photo={img1} nom="Atsou" categorie="Bus" discuter={discuter} appeler={appeler} />
		<Driver click={commander} photo={img2} nom="Luc" categorie="Mini Bus" discuter={discuter} appeler={appeler} />
   </div>
  );
}
