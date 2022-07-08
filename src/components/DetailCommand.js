import "../styles/detail_command.scss";
import CloseIcon from '@material-ui/icons/Close';
import {useSelector,useDispatch} from "react-redux";
import { selectCommandes } from "../features/counterSlice";
import { useEffect,useState } from "react";

const DetailCommand=({commande,close})=>{
    
    const commandes=useSelector(selectCommandes);
    const [course,set_course]=useState(null);
    useEffect(()=>{
        const res=commandes?.filter((item)=>{
            return item.key==commande;
        })
       

        if(res.length>0){
            set_course(res[0].course);
        }
        
    },[commandes])
    const close_detail=()=>{
        
        close();
    }

    return(
        <div className="detail_commande">
            
            
            <h1>Detail de la commande</h1>
            <div className="line">
                <p>Depart</p>
                <p>...</p>
            </div>

            <div className="line">
                <p>Destination</p>
                <p>{course?.destination_name}</p>
            </div>

            <div className="line">
                <p>Distance</p>
                <p>{course?.distance} km</p>
            </div>

            <div className="line">
                <p>Prix</p>
                <p>{course?.price.total} CFA</p>
            </div>

            <button className="btn_close_detail" onClick={close_detail}><CloseIcon /></button>

            
        </div>
    );
}

export default DetailCommand;