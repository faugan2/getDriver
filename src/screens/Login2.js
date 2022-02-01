import "./login2.scss";
import LoginFooter from "../components/LoginFooter";
import LoginEtape1 from "../components/LoginEtape1";
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import { selectCode, selectEtape, selectLogin, setCode } from "../features/counterSlice";
import LoginEtape2 from "../components/LoginEtape2";
import LoginEtape3 from "../components/LoginEtape3";
const Login=()=>{
    
    const etape=useSelector(selectEtape);
    const code=useSelector(selectCode);
    const info=useSelector(selectLogin);

    const dispatch= useDispatch();
    const generated_code=()=>{
        if(code!=null){
            dispatch(setCode(null));
            setTimeout(()=>{
                dispatch(setCode(code))
                return;
            },2000)
            return;
        }
        
        let c="";
        for(var i=0; i<6; i++){
            const n=Math.round(Math.random()*9);
            c+=n;
        }
        
        dispatch(setCode(c));
        
    }

    useEffect(()=>{
        generated_code();
    },[])

    useEffect(()=>{
        if(code==null || info==null) return;
        const telephone=info.telephone;
        const tel_code=info.tel_code;
        if(telephone=="" || telephone==undefined || telephone==null){
            return;
        }

        if(tel_code=="" || tel_code==undefined || tel_code==null){
            return;
        }

        console.log("going to send the smsm with",code);

    },[code,info]);
    
    return(
        <div className="login2">
           {etape==1 && <LoginEtape1 />}
           {etape==2 && <LoginEtape2  generated_code={generated_code} />}
           {etape==3 && <LoginEtape3  />}
           <LoginFooter />
            
        </div>
    );
}

export default Login;