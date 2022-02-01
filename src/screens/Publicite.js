import HeaderBack from "../components/HeaderBack";
import "./publicite.scss";
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import { selectPulicite } from "../features/counterSlice";
const Publicite=()=>{

    const pub=useSelector(selectPulicite);
    const [data,set_data]=useState(null);
    useEffect(()=>{
        set_data(pub);
    },[pub]);
    console.log("we got",pub);
    return <div className="publicite">
            <HeaderBack title="Annonces-Recrutements" />
            <div className="publicite_body">
                <img src={data?.url}/>
                <p style={{fontSize:"0.8rem",margin:"0.5rem",fontWeight:"bold"}}>{data?.titre}</p>
                <p style={{fontSize:"0.8rem"}}>{data?.description}</p>
               
            </div>
        </div>
}

export default Publicite;