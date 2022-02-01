import "./login2.scss";
import ReactCountryFlag from "react-country-flag"
import {useState,useEffect} from "react";
import codes from 'country-calling-code';

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
            </div>

            <div className="footer">
                <div>
                    <p>From</p>
                    <p>Service Afrique International</p>
                </div>
            </div>
        </div>
    );
}

export default Login;