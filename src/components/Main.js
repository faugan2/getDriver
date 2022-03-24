import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import "../styles/main.scss";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {useHistory} from 'react-router';
import {setType,setDepart,setDestination, setIcon, setOnline} from "../features/counterSlice";
import {useDispatch} from "react-redux";
import {auth} from "../firebase_file";
import {useEffect, useState} from "react";
import driver from "./img/driver.jpg"
import driver2 from "./img/driver2.jpg"
import driver3 from "./img/driver3.jpg"
import driver4 from "./img/driver4.jpg"
import {bus,vehicule_leger,vehicule_lourd,taxi} from "./img";

const Main=()=>{
    const history=useHistory();
    const dispatch= useDispatch();
   const go_to_commande=(type,name,icon)=>{
       console.log("going to commande",type,name) ;
       
        dispatch(setType({index:type,name,icon}));
        dispatch(setIcon(icon));
        history.push("/commander");
   }

   useEffect(()=>{
    dispatch(setDepart(null));
    dispatch(setDestination(null));
   },[]);

   
   
    return(
        <div className="main">
            
            <div className="main_info">
                <h1>Bonjour {auth?.currentUser?.displayName},</h1>
                <p>Quel type de pilote cherchez-vous ?</p>
            </div>
            <div className="main_line">
            <button 
             className="option1"
            onClick={go_to_commande.bind(this,4,"Bus",{icon:<DirectionsBusIcon style={{fontSize:"1.2rem",opacity:0.6}}/>})}>
                    <div>
                        {/*<DirectionsBusIcon  style={{width:60,height:60,resize:"contain",color:"gray"}}/>*/}
                       
                        <img src={driver} style={{width:60,height:60,resize:"contain"}}/>
                    </div>
                    <p>Bus</p>
                    <ArrowRightAltIcon  style={{
                        backgroundColor:"#3f51b5",
                        color:"white",
                        padding:"0.2rem",
                        borderRadius:"50%",
                        fontSize:"1.2rem",
                        marginTop:"0.5rem",
                    }} />
                </button>

                <button  className="option2" 
                onClick={go_to_commande.bind(this,2,"Vehicule léger",{icon:<AirportShuttleIcon style={{fontSize:"1.2rem",opacity:0.6}}/>})}>
                    <div>
                        {/*<AirportShuttleIcon  style={{width:60,height:60,resize:"contain",color:"gray"}}/>*/}
                        <img src={driver2} style={{width:60,height:60,resize:"contain"}}/>
                    </div>
                    <p>Véhicule léger</p>
                    <ArrowRightAltIcon  style={{
                        backgroundColor:"#3f51b5",
                        color:"white",
                        padding:"0.2rem",
                        borderRadius:"50%",
                        fontSize:"1.2rem",
                        marginTop:"0.5rem",
                    }} />
                </button>
            </div>

            <div className="main_line">
                <button  className="option3" onClick={go_to_commande.bind(this,3,"Poids lourds",{icon:<LocalShippingIcon style={{fontSize:"1.2rem",opacity:0.6}}/>})}>
                    <div>
                        {/*<LocalShippingIcon  style={{width:60,height:60,resize:"contain",color:"gray"}}/>*/}
                        <img src={driver3} style={{width:60,height:60,resize:"contain"}}/>
                    </div>
                    <p>Poids lourds</p>
                    <ArrowRightAltIcon  style={{
                        backgroundColor:"#3f51b5",
                        color:"white",
                        padding:"0.2rem",
                        borderRadius:"50%",
                        fontSize:"1.2rem",
                        marginTop:"0.5rem",
                    }} />
                </button>

                

                <button  className="option4" onClick={go_to_commande.bind(this,1,"Taxi",{icon:<LocalTaxiIcon style={{fontSize:"1.2rem",opacity:0.6}}/>})}>
                    <div>
                       {/* <LocalTaxiIcon  style={{width:60,height:60,resize:"contain",color:"gray"}}/>*/}
                        <img src={driver4} style={{width:60,height:60,resize:"contain"}}/>
                    </div>
                    <p>Taxi</p>
                    <ArrowRightAltIcon  style={{
                        backgroundColor:"#3f51b5",
                        color:"white",
                        padding:"0.2rem",
                        borderRadius:"50%",
                        fontSize:"1.2rem",
                        marginTop:"0.5rem",
                    }} />
                </button>
            </div>
           
        </div>
    );
}

export default Main;