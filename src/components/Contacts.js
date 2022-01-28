import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CommuteIcon from '@material-ui/icons/Commute';
import img from "./img/paella.jpg";
import "./contacts.scss";

const Services=()=>{
    const styles=useStyles();
    return(
        <div className="contacts">
            <div className="body">
                <h1>Aucun contact n'est trouvé</h1>
                <p>Vous retrouverez ici la liste des pilotes avec lesquels vous aviez effectué des courses</p>
            </div>
            
        </div>
    );
}

const useStyles = makeStyles({
    row:{
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        margin:"1rem",
        gap:"1rem",
        "& > div":{
            flex:"1",
            height:"120px",
            display:"flex",
            padding:"1rem",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            "& > svg":{
                fontSize:"5rem",
                color:"#3f51b5",
            }
        }
    },

    promo:{
        margin:"1rem",
        "& > div":{
            border:"1px solid silver",
            borderRadius:"5px",
            "& > .header":{
                backgroundColor:"silver",
                opacity:0.6,
                padding:"0.5rem",
                color:"black",
                fontWeight:"bold",
            },
            "& > .body":{
                color:"gray",
                padding:"0.5rem",
                minHeight:"5rem",

                "& > div":{
                    display:"flex",
                    flexDirection:"column",
                    borderBottom:"1px dotted silver",
                    paddingBottom:"0.5rem",
                    marginBottom:"1rem",
                    "& > img":{

                    },
                    "& > h1":{
                        fontSize:"1.2rem",
                    },
                    "& > p":{
                        fontSize:"0.8rem",
                    }
                }
            }
        }
    }
})

export default Services;