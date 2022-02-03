import CallIcon from '@material-ui/icons/Call';
import "./changer_numero.scss";
import {useSelector,useDispatch} from "react-redux";
import {useState,useEffect,useRef} from "react";
import { selectLogin,setLogin } from '../features/counterSlice';

const ChangerNumero=({click})=>{
    const [telephone,set_telephone]=useState("");
    const [alerte,set_alerte]=useState("");
    const info=useSelector(selectLogin);
    const dispatch= useDispatch();
    const [code,set_code]=useState("");

    const changer_numero=()=>{
        set_alerte("");
        if(telephone==""){
            set_alerte("Le numero de téléphone est vide");
            return;
        }
        if(code==""){
            set_alerte("Le code est vide");
            return;
        }

        const new_code=code.replace("+","").replace(" ","");
        const new_info={...info,telephone,tel_code:new_code};
        
        dispatch(setLogin(new_info));

        set_alerte("Le code sera renvoyé sur votre nouveau numero +"+new_code+" "+telephone);
        setTimeout(()=>{
            click();
        },3000)

    }

    const ref=useRef(null);
    const ref2=useRef(null);

    useEffect(()=>{
        if(ref2.current==null) return;

        ref2.current.addEventListener("focus",focused);
        ref2.current.addEventListener("blur",blured);
        return()=>{
            if(ref2.current!=null){
                ref2.current.removeEventListener("focus",focused);
                ref2.current.removeEventListener("blur",blured);
            }
            
        }
    },[ref2])

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
        <div className="changer_numero">
            <div className="line">
                <label>Saisissez le nouveau numéro</label>
                <div>
                   
                    <input type="tel"  placeholder="+228" maxLength={4} ref={ref} 
                     value={code} onChange={e=>set_code(e.target.value)}/>
                    <input type="tel" placeholder="91 56 75 90" ref={ref2}
                    value={telephone} onChange={e=>set_telephone(e.target.value)}
                    />
                    
                </div>
            </div>

            <div className="line">
                <button onClick={changer_numero}>Valider</button>
            </div>

            {
                alerte!="" && <div className="line">
                        <p>{alerte}</p>
                    </div>
            }
        </div>
    );
}

export default ChangerNumero;