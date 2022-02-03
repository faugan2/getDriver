
import ReactCountryFlag from "react-country-flag"
import {useState,useEffect,useRef} from "react";
import codes from 'country-calling-code';
import Modal from "./admin/Modal";
import LoginPilote from "./LoginPilote";
import "./login_etape1.scss";
import {useSelector,useDispatch} from "react-redux";
import {setEtape, setLogin} from "../features/counterSlice";

const LoginEtape1=()=>{
    const [pays,set_pays]=useState([])
    const [code,set_code]=useState("TG")
    const [tel_code,set_tel_code]=useState("+228");
    const [telephone,set_telephone]=useState("");
    const [generated_code,set_generated_code]=useState("");
    const [alerte,set_alerte]=useState("");
    const dispatch= useDispatch();

    const ref=useRef(null);

    useEffect(()=>{

        const res=codes.filter((item)=>{
            return item.isoCode2==code;
        })

        console.log("the line is ",res);
        if(res.length>0){
            set_tel_code(res[0].countryCodes[0]);
        }
    },[code])

    useEffect(()=>{
        set_pays(codes);
    },[codes]);

    const [open,set_open]=useState(false);
    const close_modal=()=>{
        set_open(false);
    }

    const continuer=(e)=>{
        set_alerte("");
        if(telephone==""){
            set_alerte("Vous devez saisir votre numéro de téléphone");
            setTimeout(()=>{
                set_alerte("");
            },3000)
            return;
        }

        const obj={telephone,code,tel_code}
        dispatch(setLogin(obj));
        dispatch(setEtape(2));
        
    }

    useEffect(()=>{
        if(ref.current==null) return;
        ref.current.addEventListener("focus",focused);
        ref.current.addEventListener("blur",blured);
        return()=>{
            ref.current.removeEventListener("focus",focused);
            ref.current.removeEventListener("blur",blured);
        }
    },[ref])

    const focused=()=>{
        document.querySelector("#footer").style.display="none";
    }

    const blured=()=>{
        console.log("i am blured")
        document.querySelector("#footer").style.display="block";
    }

    return(
        <div className="login_etape1">
            <div className="head">
                <h1>Qui êtes-vous ?</h1>
                <p>Veillez confirmer votre identité en quelques secondes</p>
            </div>

            <div className="body">
                <div className="line">
                    <div>
                        <p>
                        <ReactCountryFlag countryCode={code}
                            style={{
                                fontSize: '2em',
                                lineHeight: '2em',
                            }}
                            svg
                        />
                        </p>
                        <select onChange={e=>set_code(e.target.value)} value={code}>
                            {
                                pays.map((p)=>{
                                    return(
                                        <option key={p.isoCode2} value={p.isoCode2}>{p.country}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    
                </div>

                <div className="line">
                        
                        <div>
                            <p>+{tel_code}</p>
                            <input type="tel"  values={telephone} onChange={e=>set_telephone(e.target.value)} 
                            ref={ref}
                            />
                        </div>
                </div>

                <div className="line2">
                    <button onClick={continuer}>Continuez</button>
                </div>

                {
                    alerte!="" && <div className="line">
                            <p>{alerte}</p>
                        </div>
                }

                <div className="line">
                        <p>
                            Etes-vous un pilote ? 
                            <button onClick={e=>set_open(true)}>Cliquez ici</button>
                        </p>
                </div>
            </div>

            {
                open==true && <Modal 
                    content={<LoginPilote click={close_modal} />}
                    open={true}
                    click={close_modal}
                />
            }
        </div>
    );

}

export default LoginEtape1;