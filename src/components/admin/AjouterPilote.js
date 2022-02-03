import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import "./ajouter_client.scss";
import {useState,useEffect,useRef} from "react";
import firebase from "firebase";
import {auth,db, storage} from "../../firebase_file";
import PhotoIcon from '@material-ui/icons/Photo';
import SettingsIcon from '@material-ui/icons/Settings';
const AjouterClient= (e)=>{

    const [nom,set_nom]=useState("");
    const [email,set_email]=useState("");
    const [pw,set_pw]=useState("");
    const [alerte,set_alerte]=useState("");
    const [type,set_type]=useState("0");
    const [photo,set_photo]=useState(null);
    const ref=useRef(null);

    const get_code_pilote=()=>{
        let cp="";
        for(var i=0; i<6; i++){
            cp+=Math.round(Math.random()*9);
        }

        return cp;
    }

    useEffect(()=>{
        const c=get_code_pilote();
        set_pw(c);
    },[]);
    const ajouter_client=async (e)=>{
        set_alerte("");
        if(nom==""){
            set_alerte("Le nom est vide");
            return;
        }
        if(email==""){
            set_alerte("Le prenom est vide");
            return;
        }
        if(pw==""){
            set_alerte("Le code pilote est vide");
        }

        if(type=="0"){
            set_alerte("Le type de pilote est vide");
            return;
        }
        if(pw.length<6){
            set_alerte("Le code pilote doit être de 6 chiffres");
            return;
        }

        if(isNaN(parseInt(pw))){
            set_alerte("Le code pilote doit être composé uniquement que de chiffre");
            return;
        }

        const files=ref.current.files;
        if(files.length==0){
            alert("Aucune photo n'est ajoutée");
            return;
        }

        const file=files[0];
        const filename=file.name;
        
       

        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";

        const ref_storage=storage.ref("images/"+filename);
        ref_storage.put(file).then(()=>{
            ref_storage.getDownloadURL().then((url)=>{
                const user={
                    url,
                    nom,
                    email
                    ,password:pw,
                    type:2,
                    date:firebase.firestore.FieldValue.serverTimestamp(),
                    pilote:type
                }

                console.log("the objct is user",user)
                auth.createUserWithEmailAndPassword(email,pw).then(async ()=>{
                await db.collection("users").add(user);
                btn.disabled=false;
                    btn.innerHTML="Ajouter";
                    set_nom("");
                    set_email("");
                    set_pw("");
                    set_alerte("Pilote bien ajouté");
                    auth.signOut();

                }).catch((err)=>{
                    btn.disabled=false;
                    btn.innerHTML="Ajouter";
                    set_alerte(err.message);
                })
            }).catch((err)=>{
                btn.disabled=false;
                btn.innerHTML="Ajouter";
                set_alerte(err.message);
            })
        }).catch((err)=>{
            btn.disabled=false;
            btn.innerHTML="Ajouter";
            set_alerte(err.message);
        })


        /*const user={nom,email,password:pw,type:2,date:firebase.firestore.FieldValue.serverTimestamp(),pilote:type}
        auth.createUserWithEmailAndPassword(email,pw).then(async ()=>{
           await db.collection("users").add(user);
           btn.disabled=false;
            btn.innerHTML="Ajouter";
            set_nom("");
            set_email("");
            set_pw("");
            set_alerte("Pilote bien ajouté");
            auth.signOut();

        }).catch((err)=>{
            btn.disabled=false;
            btn.innerHTML="Ajouter";
            set_alerte(err.message);
        })
        */
        

    }

    
    return(
        <div className="ajouter_client">
             <div className="line">
                <label>Type de pilote</label>
                <div>
                    <SettingsIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <select value={type} onChange={e=>set_type(e.target.value)}>
                        <option value="0">Choisir un type de pilote</option>
                        <option value="1">Taxi</option>
                        <option value="2">Véhicule léger</option>
                        <option value="3">Véhicule lourd</option>
                        <option value="4">Bus</option>
                    </select>
                </div>
                
            </div>

            <div className="line">
                <label>Nom du pilote</label>
                <div>
                    <AssignmentIndIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" placeholder="Nom" value={nom} onChange={e=>set_nom(e.target.value)} />
                </div>
                
            </div>

            <div className="line">
                <label>Email du pilote</label>
                <div>
                    <EmailIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="email" placeholder="Email" value={email} onChange={e=>set_email(e.target.value)} />
                </div>
                
            </div>

            <div className="line">
                <label>Photo du pilote</label>
                <div>
                    <PhotoIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="file"  ref={ref} accept="image/*" />
                </div>
                
            </div>


            <div className="line">
                <label>Code pilote (6 chiffres)</label>
                <div>
                    <LockIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" placeholder="Code pilote"  
                    maxLength={6}
                    value={pw} onChange={e=>set_pw(e.target.value)}/>
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