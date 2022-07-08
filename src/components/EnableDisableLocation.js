import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {auth,db} from "../firebase_file";
import {selectDriverLocation, setDriverLocation,setOpenLocation,selectMe} from "../features/counterSlice"
import CloseIcon from '@material-ui/icons/Close';
import "../styles/enable_disable_location.scss";

const EnableDisableLocation=({click})=>{
    const location=useSelector(selectDriverLocation);
    const dispatch= useDispatch();
    const me=useSelector(selectMe)
   
    const update_location=async ()=>{
        
        if(location==false){
            (async()=>{
               navigator.geolocation.watchPosition(async function (position) {
                    
                    const rand=0;

                    const objet={lat:position.coords.latitude+rand,lng:position.coords.longitude+rand};
                    console.log("updating position=",rand);
                    await db.collection("users").doc(me?.key).update({location:objet},{merge:true});
                    dispatch(setDriverLocation(false));
                    dispatch(setOpenLocation(false));
                    click();
                },
        
                  showError,
                  { enableHighAccuracy: true, timeout: 5000},
                  );
            })();
        }else{
            dispatch(setDriverLocation(false));
            dispatch(setOpenLocation(false));
            click();
        }
    }

    const showError=(err)=>{
        console.log("updating there is an ERROR",err)
    }

    useEffect(()=>{
       if(location==false){
           console.log("updating going to ask for it")
       }
    },[location]);
    return(
        <div className="enable_disabled_location">

            
            {(location==false || location==undefined) &&
            
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
            <div className="btn_close">
                <button onClick={e=>{
                    click();
                    dispatch(setOpenLocation(false));
                }}>
                    <CloseIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                </button>
            </div>
           
            
        </div>
    );
}
export default EnableDisableLocation;