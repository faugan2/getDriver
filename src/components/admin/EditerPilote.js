import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import "./ajouter_client.scss";
import {useState,useEffect,useRef} from "react";
import firebase from "firebase";
import {auth,db, storage} from "../../firebase_file";
import PhotoIcon from '@material-ui/icons/Photo';
import SettingsIcon from '@material-ui/icons/Settings';
import {useSelector,useDispatch} from "react-redux";
import {selectAdminPilote} from "../../features/counterSlice";

const AjouterClient= (e)=>{

    const [nom,set_nom]=useState("");
    const [email,set_email]=useState("");
    const [pw,set_pw]=useState("");
    const [alerte,set_alerte]=useState("");
    const [type,set_type]=useState("0");
    const [photo,set_photo]=useState(null);
    const [telephone,set_telephone]=useState("");
    const ref=useRef(null);
    const [url,set_url]=useState(null);

    const pilote=useSelector(selectAdminPilote);

    const get_code_pilote=()=>{
        let cp="";
        for(var i=0; i<6; i++){
            cp+=Math.round(Math.random()*9);
        }

        return cp;
    }

    

    useEffect(()=>{
        if(pilote==null) return;
        set_nom(pilote.nom);
        set_type(pilote.type);
        set_pw(pilote.password);
        set_email(pilote.email);
        set_url(pilote.url);
        set_telephone(pilote.telephone)

    },[pilote]);

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

        if(telephone==""){
            set_alerte("Le téléphone est vide");
            return;
        }

        if(pw.length<6){
            set_alerte("Le code pilote doit être égal à 6 chiffres");
            return;
        }
        if(isNaN(parseInt(pw))){
            set_alerte("Le code pilote doit être composé uniquement que de chiffre");
            return;
        }

        const files=ref.current.files;
        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";

        if(files.length==0){
            const user={
                nom,
                email,
                telephone,
                password:pw,
                type:2,
                pilote:type
            }

            db.collection("users").doc(pilote.key).update(user,{merge:true}).then(()=>{
                    btn.innerHTML="Modifier";
                    btn.disabled=false;
                    set_alerte("Pilote bien modifié");
            }).catch((err)=>{
                    btn.disabled=false;
                    btn.innerHTML="Modifier";
                    set_alerte(err.message);
            })
        }else{
            const file=files[0];
            const filename=file.name;
            const ref_storage=storage.ref("images/"+filename);

            ref_storage.put(file).then(()=>{
                ref_storage.getDownloadURL().then(async (url)=>{
                    const user={
                        url,
                        nom,
                        email,
                        telephone,
                        password:pw,
                        type:2,
                        pilote:type
                    }

                    set_url(url);

                    await db.collection("users").doc(pilote.key).update(user,{merge:true});
                    btn.innerHTML="Modifier";
                    set_alerte("Pilote bien modifié");
                    btn.disabled=false;
                    
                }).catch((err)=>{
                    btn.disabled=false;
                    btn.innerHTML="Modifier";
                    set_alerte(err.message);
                })
            }).catch((err)=>{
                btn.disabled=false;
                btn.innerHTML="Modifier";
                set_alerte(err.message);
            })
        }

       
        
    
      

       
       


        
        

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

                {url!=null && <img src={url} style={{width:25,height:25,resize:"contain",borderRadius:"50%"}}/>}
                
            </div>


            <div className="line">
                <label>Code pilote (6 chiffres)</label>
                <div>
                    <LockIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" placeholder="Mot de passe" 
                    maxLength={6}
                    value={pw} onChange={e=>set_pw(e.target.value)}/>
                </div>
                
            </div>

            <div className="line">
                <label>Téléphone</label>
                <div>
                    <LockIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" placeholder="22890909090" 
                   
                    value={telephone} onChange={e=>set_telephone(e.target.value)}/>
                </div>
                
            </div>

            <div className="line">
                <button onClick={ajouter_client}>Modifier</button>
            </div>

            <div className="line">
                <p>{alerte}</p>
            </div>
            
        </div>
    );
}

export default AjouterClient;