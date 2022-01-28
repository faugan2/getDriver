import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import "./ajouter_client.scss";
import {useState,useEffect} from "react";
import firebase from "firebase";
import {auth,db} from "../../firebase_file";


const AjouterClient= (e)=>{

    const [nom,set_nom]=useState("");
    const [email,set_email]=useState("");
    const [pw,set_pw]=useState("");
    const [alerte,set_alerte]=useState("");

    const ajouter_client=async (e)=>{
        if(nom==""){
            alert("Le nom est vide");
            return;
        }
        if(email==""){
            alert("Le prenom est vide");
            return;
        }
        if(pw==""){
            alert("Le mot de passe est vide");
        }

        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";
        const user={nom,email,password:pw,type:2,date:firebase.firestore.FieldValue.serverTimestamp()}
        auth.createUserWithEmailAndPassword(email,pw).then(async ()=>{
           await db.collection("users").add(user);
           btn.disabled=false;
            btn.innerHTML="Ajouter";
            set_nom("");
            set_email("");
            set_pw("");
            set_alerte("Client bien ajouté");
            auth.signOut();

        }).catch((err)=>{
            btn.disabled=false;
            btn.innerHTML="Ajouter";
            set_alerte(err.message);
        })
        
        

    }

    
    return(
        <div className="ajouter_client">
            <div className="line">
                <label>Nom du client</label>
                <div>
                    <AssignmentIndIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" placeholder="Nom" value={nom} onChange={e=>set_nom(e.target.value)} />
                </div>
                
            </div>

            <div className="line">
                <label>Email du client</label>
                <div>
                    <EmailIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="email" placeholder="Email" value={email} onChange={e=>set_email(e.target.value)} />
                </div>
                
            </div>

            <div className="line">
                <label>Mot de passe du client</label>
                <div>
                    <LockIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" placeholder="Mot de passe"  value={pw} onChange={e=>set_pw(e.target.value)}/>
                </div>
                
            </div>

            <div className="line">
                <button onClick={ajouter_client}>Ajouter</button>
            </div>

            <div className="line">
                <p>{alerte}</p>
            </div>
            
        </div>
    );
}

export default AjouterClient;