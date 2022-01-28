import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import "./ajouter_client.scss";
import {useState,useEffect} from "react";
import firebase from "firebase";
import {auth,db} from "../../firebase_file";


const AjouterClient= (e)=>{

    const [alerte,set_alerte]=useState("");

    
    return(
        <div className="ajouter_client">
            <div className="line">
                <label>Type de véhicule</label>
                <div>
                    <AssignmentIndIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <select>
                        <option>Choisir un type de véhicule</option>
                        <optin value="1">Taxi</optin>
                        <option value="2">Véhicule léger</option>
                        <option value="3">Véhicule lourd</option>
                        <option value="4">Bus</option>
                    </select>
                </div>
                
            </div>

            <div className="line">
                <label>Frais fixe de déplacement par KM</label>
                <div>
                    <EmailIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" placeholder="Email"  />
                </div>
                
            </div>

            <div className="line">
                <label>Prix unitaire par KM</label>
                <div>
                    <LockIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" placeholder="Mot de passe"  />
                </div>
                
            </div>

            <div className="line">
                <button>Ajouter</button>
            </div>

            <div className="line">
                <p>{alerte}</p>
            </div>
            
        </div>
    );
}

export default AjouterClient;