import "./login_pilote.scss";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useState,useEffect} from "react";
const LoginPilote=()=>{

    const [alerte,set_alerte]=useState("");
    return(
        <div className="login_pilote">
            <div className="head">
                <p>Veillez entrer votre code pilote pour continuer</p>
            </div>

            <div className="body">
                <div className="line">
                    <label>Code Pilote</label>
                    <div>
                        <input type="text" autoFocus />
                        <LockOpenIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    </div>
                </div>

                <div className="line">
                    <button>Continuer</button>
                </div>

                <div className="line">
                    <p>{alerte}</p>
                </div>
            </div>
        </div>
    );
}

export default LoginPilote;