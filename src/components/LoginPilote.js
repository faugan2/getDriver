import "./login_pilote.scss";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useState,useEffect,useRef} from "react";
import {db,auth} from "../firebase_file";
import {useSelector,useDispatch} from "react-redux";
import {setMe} from "../features/counterSlice";
import { useHistory } from "react-router-dom";

const LoginPilote=({click})=>{

    const dispatch= useDispatch();
    const [alerte,set_alerte]=useState("");
    const [code,set_code]=useState("");
    const history=useHistory();
    const login_pilote=(e)=>{
        set_alerte("");
       if(code==""){
           set_alerte("Le code est vide");
           close_alerte();
           return;
       }

       if(code.length!=6){
           set_alerte("Vous devez saisir un code a 6 chiffres");
           close_alerte();
           return;
       }


       const btn=e.target;
       btn.disabled=true;
       btn.innerHTML="Patientez...";
       console.log("le code est ",code);

       db.collection("users")
       .where("password","==",code)
       .where("type","==",2)
       .get().then((snap)=>{
            if(snap.docs.length==0){
                btn.disabled=false;
                btn.innerHTML="Continuer";
                set_alerte("Code erroné");
                close_alerte();
                return;
            }

            const doc=snap.docs[0];
            const key=doc.id;
            const data=doc.data();
            data.key=key;

            const email=data.email;
            auth.signInWithEmailAndPassword(email,code).then(()=>{
                dispatch(setMe(data));
                btn.disabled=false;
                btn.innerHTML="Continuer";
                click();
                history.replace("/")
            }).catch((err)=>{
                btn.disabled=false;
                btn.innerHTML="Continuer";
                set_alerte(err.message);
                close_alerte();
            })

            
            
       }).catch((err)=>{
           btn.disabled=false;
           btn.innerHTML="Continuer";
           set_alerte(err.message);
           close_alerte();
       })
    }
    const close_alerte=()=>{
        setTimeout(()=>{
            set_alerte("");
        },3000)
    }

    const ref=useRef(null);
    useEffect(()=>{
        if(ref.current==null) return;

        ref.current.addEventListener("focus",focused);
        ref.current.addEventListener("blur",blured);
        return()=>{
            if(ref.current!=null){
                ref.current.removeEventListener("focus",focused);
                ref.current.removeEventListener("blur",blured);
            }
            
        }
    },[ref])

    const focused=()=>{
        console.log("i am now focused")
        document.querySelector("#footer").style.display="none";
    }

    const blured=()=>{
        console.log("i am blured")
        document.querySelector("#footer").style.display="block";
    }

    useEffect(()=>{
        setTimeout(()=>{
            ref.current.focus();
            focused();
        },1000)
    },[])


    return(
        <div className="login_pilote">
            <div className="head">
                <p>Veillez entrer votre code pilote pour continuer</p>
            </div>

            <div className="body">
                <div className="line">
                    <label>Code Pilote</label>
                    <div>
                        <input type="tel" autoFocus maxLength={6}  
                        ref={ref}
                        value={code} onChange={e=>set_code(e.target.value)}/>
                        <LockOpenIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    </div>
                </div>

                <div className="line">
                    <button onClick={login_pilote}>Continuer</button>
                </div>

                {alerte!="" && <div className="line">
                    <p>{alerte}</p>
                </div>}


            </div>
        </div>
    );
}

export default LoginPilote;