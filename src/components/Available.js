import "../styles/available.scss";
import CloseIcon from '@material-ui/icons/Close';
import {useSelector,useDispatch} from "react-redux";
import {setAvailable,selectMe} from "../features/counterSlice";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useState,useEffect} from "react";
import {auth,db} from "../firebase_file";

const Available=({click,available})=>{
    const dispatch= useDispatch();
    const me=useSelector(selectMe);

    const [progress,set_progress]=useState(false);

    const confirm_add=async ()=>{
        set_progress(true)
        db.collection("users").doc(me?.key).update({available:true},{merge:true}).then(()=>{
            set_progress(false);
            dispatch(setAvailable(true));
            click();
        }).catch((err)=>{
            alert(err.message);
            set_progress(false);
        });
        
    }

    const confirm_remove=()=>{
        set_progress(true);
        db.collection("users").doc(me?.key).update({available:false},{merge:true}).then(()=>{
            set_progress(false);
            dispatch(setAvailable(false));
            click();
        }).catch((err)=>{
            alert(err.message);
            set_progress(false);
        });
       
    }

    return(
        <div className="available">
            {
                available==false && 
                <button className="btn_add" onClick={confirm_add}>Confirmez votre disponibilité</button>
            }
            {
                available==true && 
                <button className="btn_remove" onClick={confirm_remove}>Confirmez votre indisponibilité</button>
            }
            {progress==true && <p className="alerte">
                <CircularProgress  size={15} style={{color:"var(--color)"}} />
                patientez... 
            </p>}
            <button className="btn_close" onClick={click}>
                <CloseIcon />
            </button>
        </div>
    );
}
export default Available;