import {useState,useEffect} from "react";
import {taxi, vehicule_leger, vehicule_lourd,bus} from "./img";
import {types} from "./admin/data";
import "./pilote.scss";
import StarBorderIcon from '@material-ui/icons/StarBorder';
const Pilote=({pilote})=>{
    if(pilote.pilote==undefined){
        return null;
    }
    return(
        <div className="pilote">
            
            {/*pilote.pilote==1 && <img src={taxi} style={{width:50,height:50,resize:"contain",borderRadius:"50%"}}/>}
            {pilote.pilote==2 && <img src={vehicule_leger} style={{width:50,height:50,resize:"contain",borderRadius:"50%"}}/>}
            {pilote.pilote==3 && <img src={vehicule_lourd} style={{width:50,height:50,resize:"contain",borderRadius:"50%"}}/>}
            {pilote.pilote==4 && <img src={bus} style={{width:50,height:50,resize:"contain",borderRadius:"50%"}}/>*/}
            <img src={pilote.url}  style={{width:50,height:50,resize:"contain",borderRadius:"50%"}}/>
            <p className="nom">{pilote.nom}</p>
            <p className="type">{types[pilote.pilote]}</p>
            <StarBorderIcon style={{color:"gray",fontSize:"1.2rem"}}/>
        </div>
    )
}

export default Pilote;