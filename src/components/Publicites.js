import pub_img from "./img/pub.gif";
import { useHistory } from 'react-router';
import {useState,useEffect} from "react";
import { selectPublicites, setPublicite } from "../features/counterSlice";
import logo from "./img/sai.jpg";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useDispatch,useSelector} from "react-redux";
import Modal from "./admin/Modal";
import Sai from "./Sai";

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

const Publicites=()=>{
    const history=useHistory();
    const [data,set_data]=useState([]);
    const pub=useSelector(selectPublicites);
    const [index,set_index]=useState(0);
    const [titre,set_titre]=useState("");
    const [url,set_url]=useState(null);
    const [sai,set_sai]=useState(false);

    const dispatch= useDispatch();

    useEffect(()=>{
        console.log("the pubs",pub);
        set_data(pub);
    },[pub])
    const go_to_pub=(e)=>{

        dispatch(setPublicite(e))
        history.push("/publicite");
    }

    const go_to_sai=(e)=>{
        set_sai(true);
    }
    const close_sai=()=>{
        set_sai(false);
    }

    useEffect(()=>{
        if(data.length==0) return;
        let id_inter=0;
        set_titre(data[0].titre)
        set_url(data[0].url)

    },[data]);

    /*useEffect(()=>{
        if(data.length==0){
            return;
        }
       setTimeout(()=>{
        let res=data[index];
        let current=index;
        if(res==undefined){
            res=data[0];
            current=0;
        }
        set_titre(res.titre);
        set_url(res.url);
        current++;
        set_index(current);

       },5000)
    },[index,data]);*/


    if(data.length==0){
        return null;
    }
    return(
        
        data.length>0 && 
        
        <div style={{
            background:"var(--sub)",
            width:"100vw",
           border:"none",
           position:"fixed",
           bottom:0,
           zIndex:1,
           height:"60px",
           display:"flex",
           fontSize:"0.8rem",
           overflow:"hidden",
          }}
          
          > 
          <ScrollMenu>
          {
              data.map((item,i)=>{
                  console.log("footer ",i,item);
                  return(
                    <div style={{
             
                        width:"100vw",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                    }}
                    
                    onClick={go_to_pub.bind(this,item)}
                    key={i}
                    >
                        <img src={item.url} style={{
                         width:"100%",
                         height:55,
                         resize:"cover",
                         objectFit:"cover",
                          margin:0,
                          padding:0,
                        }} />
                    </div>
                  );
              })
          }
          
         
          </ScrollMenu>
            </div>
           
        
    );
}
export default Publicites;