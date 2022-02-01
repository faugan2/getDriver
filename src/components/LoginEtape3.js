import "./login_etape3.scss";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {useState,useEffect,useRef} from "react";
import {storage,db,auth} from "../firebase_file";
import {useSelector,useDispatch} from "react-redux";
import {selectLogin} from "../features/counterSlice";
import {useHistory} from "react-router";

const LoginEtape3=()=>{
    const [alerte,set_alerte]=useState("");
    const [url,set_url]=useState(null);
    const [nom,set_nom]=useState("");
    const info=useSelector(selectLogin);
    const ref=useRef(null);
    const history=useHistory();

    const pick_image=()=>{
        ref.current.click();
    }

    const file_changed=()=>{
        const files=ref.current.files;
        if(files.length==0) return;
        const file=files[0];

        const reader=new FileReader();
        reader.addEventListener("load",()=>{
            const url=reader.result;
            set_url(url);
        })

        reader.readAsDataURL(file)
    }

    const terminer=async (e)=>{
        set_alerte("");
        if(nom==""){
            set_alerte("Le nom est vide");
            return;
        }

        const files=ref.current.files;
        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";

        if(files.length>0){
            const file=files[0];
            const filename=file.name;
            const ref_storage=storage.ref("images/"+filename);
            ref_storage.put(file).then(()=>{
                ref_storage.getDownloadURL().then((url)=>{
                    const client={nom,url,...info}
                    
                    create_account(client,btn);

                }).catch((err)=>{
                    btn.disabled=false;
                    btn.innerHTML="Terminer";
                    set_alerte(err.message);
                })
            }).catch((err)=>{
                btn.disabled=false;
                btn.innerHTML="Terminer";
                set_alerte(err.message);
            })
        }else{
            const client={nom,...info}        
            create_account(client,btn);
        }
    }

    

    const create_account=async (client,btn)=>{
        
        const telephone=client.telephone;
        const code=client.code;
        const tel_code=client.tel_code;
        const email=(code+""+tel_code+""+telephone+"@"+code+".com").toLowerCase();
        const password=tel_code+""+telephone;

        const new_client={...client,email,password,type:1};
        const snap=await db.collection("users")
        .where("email","==",email)
        .where("password","==",password)
        .get();

        if(snap.docs.length==0){
            console.log("the doc is zero for",email)
            //create account
            auth.createUserWithEmailAndPassword(email,password).then(()=>{
                //insert user into database
                db.collection("users").add(new_client).then(async ()=>{
                    btn.disabled=false;
                    btn.innerHTML="Terminer";
                    console.log("All is OK");

                    await auth.currentUser.updateProfile({
                        displayName:client.nom,
                        photoURL:client.url
                    })

                    history.replace("/");


                }).catch((err)=>{
                    btn.disabled=false;
                    btn.innerHTML="Terminer";
                    set_alerte(err.message)
                    auth.signOut();
                })
            }).catch((err)=>{
                btn.disabled=false;
                btn.innerHTML="Terminer";
                set_alerte(err.message)
            })
        }else{
            //sign in
            const key=snap.docs[0].id;
            auth.signInWithEmailAndPassword(email,password).then(()=>{
                //update user info
                console.log("the key is ",key)
                db.collection("users").doc(key).update(new_client,{merge:true}).then(async ()=>{
                    await auth.currentUser.updateProfile({
                        displayName:client.nom,
                        photoURL:client.url
                    })

                    history.replace("/");
                }).catch((err)=>{
                    btn.disabled=false;
                    btn.innerHTML="Terminer";
                    set_alerte(err.message)
                    auth.signOut();
                })
            }).catch((err)=>{
                btn.disabled=false;
                btn.innerHTML="Terminer";
                set_alerte(err.message)
            })
        }

        btn.disabled=false;
        btn.innerHTML="Terminer";
        
    }

    return(
        <div className="login_etape3">
            <div className="head" onClick={pick_image}>
                {url==null && <AccountCircleIcon  style={{color:"gray",fontSize:"10rem"}}/>}
                {url!=null && <img src={url}  />}
                <button>
                    <CameraAltIcon />
                </button>
                <input type="file" style={{display:"none"}} ref={ref} accept="image/*"
                onChange={file_changed}
                />
            </div>
            <div className="body">
                <div className="line">
                        <label>Quel est votre nom ?</label>
                        <div>
                            <input type="text" value={nom} onChange={e=>set_nom(e.target.value)} />
                            <AccountBoxIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                        </div>
                </div>

                <div className="line">
                    <button onClick={terminer}>Terminer</button>
                </div>

               {alerte!="" &&  <div className="line">
                    <p>{alerte}</p>
                </div>
                }
            </div>
        </div>
    );
}

export default LoginEtape3;