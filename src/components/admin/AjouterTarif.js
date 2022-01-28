import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import "./ajouter_client.scss";
import {useState,useEffect} from "react";
import firebase from "firebase";
import {auth,db} from "../../firebase_file";
import {types} from "./data";

const AjouterClient= (e)=>{

    const [alerte,set_alerte]=useState("");
    const [type,set_type]=useState(0);
    const [frais_fixe,set_frais_fixe]=useState("");
    const [course,set_course]=useState("");

    const ajouter_tarif=async (e)=>{
        set_alerte("");
        if(type==0){
            set_alerte("Le type est vide");
            return;
        }
        if(frais_fixe==0){
            set_alerte("Le frais fixe est vide");
            return;
        }

        if(course==0){
            set_alerte("Le prix unitaire est vide");
            return;
        }
        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";
        const nom=types[type];
        const tarif={type,frais_fixe,course,date:firebase.firestore.FieldValue.serverTimestamp(),nom}

        db.collection("tarifs").add(tarif).then(()=>{
            btn.disabled=false;
            btn.innerHTML="Ajouter";
            set_type(0);
            set_frais_fixe("");
            set_course("")
            set_alerte("Tarif bien ajouté");
        }).catch((err)=>{
            set_alerte(err.message)
        })
    }
    
    return(
        <div className="ajouter_client">
            <div className="line">
                <label>Type de véhicule</label>
                <div>
                    <AssignmentIndIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <select value={type} onChange={e=>set_type(e.target.value)}>
                        <option value="0">Choisir un type de véhicule</option>
                        <option value="1">Taxi</option>
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
                    <input type="text" placeholder="300" value={frais_fixe} onChange={e=>set_frais_fixe(e.target.value)}  />
                </div>
                
            </div>

            <div className="line">
                <label>Prix unitaire par KM</label>
                <div>
                    <LockIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" placeholder="150" value={course} onChange={e=>set_course(e.target.value)}  />
                </div>
                
            </div>

            <div className="line">
                <button onClick={ajouter_tarif}>Ajouter</button>
            </div>

            <div className="line">
                <p>{alerte}</p>
            </div>
            
        </div>
    );
}

export default AjouterClient;