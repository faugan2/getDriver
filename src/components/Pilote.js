import {useState,useEffect} from "react";
import {taxi, vehicule_leger, vehicule_lourd,bus} from "./img";
import {types} from "./admin/data";
import "../styles/pilote.scss";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {calcCrow} from "./functions";

const Pilote=({pilote,distance,me,course,click})=>{
    if(pilote.pilote==undefined){
        return null;
    }

    let km=0;
    if(distance==true){

        let me_lat=course?.location?.lat;
        let me_lng=course?.location?.lng;
        if(me?.location!=undefined){
            me_lat=me?.location.lat;
            me_lng=me?.location.lng;
        }
        
         km=calcCrow(
            parseFloat(pilote.location?.lat),
            parseFloat(pilote.location?.lng),
            parseFloat(me_lat),
            parseFloat(me_lng)
        ).toFixed(2);
        console.log("position of client distance is true",me.location,course.origin,km);
    }
    return(
        <div className="pilote" onClick={click}>
            
            {/*pilote.pilote==1 && <img src={taxi} style={{width:50,height:50,resize:"contain",borderRadius:"50%"}}/>}
            {pilote.pilote==2 && <img src={vehicule_leger} style={{width:50,height:50,resize:"contain",borderRadius:"50%"}}/>}
            {pilote.pilote==3 && <img src={vehicule_lourd} style={{width:50,height:50,resize:"contain",borderRadius:"50%"}}/>}
            {pilote.pilote==4 && <img src={bus} style={{width:50,height:50,resize:"contain",borderRadius:"50%"}}/>*/}
            <img src={pilote.url}  style={{width:50,height:50,resize:"contain",borderRadius:"50%"}}/>
            <p className="nom">{pilote.nom}</p>
            <p className="type">{types[pilote.pilote]}</p>
            {distance==true && <p style={{
                color:"var(--color)",
                fontWeight:"bold",
            }}>
                {
                    isNaN(km) ? "? " : km
                } km
            </p>}
            <StarBorderIcon style={{color:"gray",fontSize:"1.2rem"}}/>
            
        </div>
    )
}

export default Pilote;