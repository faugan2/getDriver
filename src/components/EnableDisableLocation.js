import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {auth,db} from "../features/counterSlice";

const EnableDisableLocation=({click})=>{
    return(
        <div className="enable_disabled_location">
            <button onClick={click}>fermer</button>
        </div>
    );
}
export default EnableDisableLocation;