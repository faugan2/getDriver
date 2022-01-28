import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import "./ajouter_client.scss";
import {useState,useEffect} from "react";
import firebase from "firebase";
import {auth,db,storage} from "../../firebase_file";
import {types} from "./data";

const AjouterClient= (e)=>{

    const [alerte,set_alerte]=useState("");
   

    const ajouter_pub=async(e)=>{
        set_alerte("");
        const c_description=document.querySelector("#description");
        const c_file=document.querySelector("#file");
        const c_titre=document.querySelector("#titre");

        const description=c_description.value;
        const titre=c_titre.value;
        const files=c_file.files;
        
        if(titre==""){
            set_alerte("Le titre est vide");
            return;
        }
        if(description==""){
            set_alerte("La description est vide");
            return;
        }

        if(files.length==0){
            set_alerte("Aucune image n'est ajoutée");
            return;
        }
        const file=files[0];
        const name=file.name;
        const ref=storage.ref("images/"+name);
        
        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";

        ref.put(file).then(async (res)=>{
            const url=await ref.getDownloadURL();
            const pub={titre,description,url,date:firebase.firestore.FieldValue.serverTimestamp()};
            await db.collection("publicites").add(pub);
            btn.disabled=false;
            btn.innerHTML="Ajouter";
            c_titre.value="";
            c_description.value="";
            c_file.value="";
            set_alerte("Publicité bien ajoutée");
        }).catch((err)=>{
            btn.disabled=false;
            btn.innerHTML="Ajouter";
            set_alerte(err.message);
        })
    }
    
    return(
        <div className="ajouter_client">
           
            <div className="line">
                <label>Titre</label>
                <div>
                    <input type="text" placeholder="Titre" id="titre" />
                </div>
            </div>
            <div className="line">
                <label>Image</label>
                <div>
                    
                    <input type="file" id="file" accept="image/*" />
                </div>
                
            </div>

            <div className="line">
                <label>Prix unitaire par KM</label>
                <div>
                   <textarea placeholder="Description" id="description" />
                </div>
                
            </div>

            <div className="line">
                <button onClick={ajouter_pub}>Ajouter</button>
            </div>

            <div className="line">
                <p>{alerte}</p>
            </div>
            
        </div>
    );
}

export default AjouterClient;