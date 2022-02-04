import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {auth,db} from "../firebase_file";
import {selectDriverLocation, setDriverLocation} from "../features/counterSlice"
import "./enable_disable_location.scss";

const EnableDisableLocation=({click})=>{
    const location=useSelector(selectDriverLocation);
    const dispatch= useDispatch();
    console.log("driver location is ",location);
    const update_location=()=>{
        dispatch(setDriverLocation(!location))
        click();
    }
    return(
        <div className="enable_disabled_location">
            {location==false &&
            
                <div className="line">
                    <p>
                        Votre localisation est désactivée, aucun client ne poura vous retrouver dans ses recherche
                    </p>
                    <button onClick={update_location} className="btn_activer_location">Reactiver ma localisation</button>
                </div>
            }

            {
                location==true && 

                <div className="line">
                    
                    <p>
                        Votre localisation est activée, les clients proches de vous peuvent vous localiser.
                    </p>
                    <button onClick={update_location} className="btn_disable_location">Désactivée ma localisation</button>
                </div>
            }
            
        </div>
    );
}
export default EnableDisableLocation;