import "../styles/login_etape2.scss";
import {useSelector,useDispatch} from "react-redux";
import { selectLogin,setLogin,selectCode, setEtape, } from "../features/counterSlice";
import {useState,useEffect,useRef} from "react";
import Modal from "./admin/Modal";
import ChangerNumero from "./ChangerNumero";

const LoginEtape2=({generated_code})=>{
    const info=useSelector(selectLogin);
    const code=useSelector(selectCode);
    const [alerte,set_alerte]=useState("");
    const [open,set_open]=useState(false);
    const [code_input,set_code_input]=useState("");
    const ref=useRef(null);

    const dispatch= useDispatch();

    const close_modal=()=>{
        set_open(false);
    }

    useEffect(()=>{
        ref.current.style.borderBottom="none";
        if(code_input=="" || code_input.length<6){
            return;
        }
        console.log("code has riched",code_input)
        if(code_input!=code){
            ref.current.style.borderBottom="2px solid red";
            return;
        }

        dispatch(setEtape(3));
    },[code_input])


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
        document.querySelector("#footer").style.display="none";
    }

    const blured=()=>{
        console.log("i am blured")
        document.querySelector("#footer").style.display="block";
    }


    return (
        <div className="login_etape2">
           <div className="head">
                <h1>Confirmation du code</h1>
                <p>Saisissez le code à 6 chiffre qui est envoyé sur votre numéro de téléphone 
                     &nbsp;<label>+{info.tel_code}&nbsp;{info.telephone}</label>. 

                    <button onClick={e=>set_open(true)}>Numéro erroné ?</button>
                </p>
            </div>
           <div className="body">
               <div className="line">
                   <input type="tel" placeholder="------" maxLength={6} value={code_input}
                    onChange={e=>set_code_input(e.target.value)}
                    ref={ref}
                   />
               </div>

               <div className="line2">
                   <p>Code non recu ?

                       <button onClick={generated_code}>Renvoyer le code</button>
                   </p>
               </div>

              {alerte!="" && <div className="line2">
                   <p>{alerte}</p>
               </div> 
                }
               <div className="line2">
                   <p>{code}</p>
               </div>
           </div>

           {
               open==true && <Modal 
               content={<ChangerNumero click={close_modal} />}
               click={close_modal}
               open={true}
               />
           }
        </div>
    )
}
export default LoginEtape2;