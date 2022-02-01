import "./login2.scss";
import ReactCountryFlag from "react-country-flag"
import {useState,useEffect} from "react";
import codes from 'country-calling-code';
import Modal from "../components/admin/Modal";
import LoginPilote from "../components/LoginPilote";

const Login=()=>{
    const [pays,set_pays]=useState([])
    const [code,set_code]=useState("TG")
    const [tel_code,set_tel_code]=useState("+228");
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
    return(
        <div className="login2">
           
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
                            <input type="tel"  />
                        </div>
                </div>

                <div className="line2">
                    <button>Continuez</button>
                </div>

                <div className="line">
                        <p>
                            Etes-vous un pilote ? 
                            <button onClick={e=>set_open(true)}>Cliquez ici</button>
                        </p>
                </div>
            </div>

            <div className="footer">
                <div>
                    <p>From</p>
                    <p>Service Afrique International</p>
                </div>
            </div>

            {
                open==true && <Modal 
                    content={<LoginPilote />}
                    open={true}
                    click={close_modal}
                />
            }
        </div>
    );
}

export default Login;