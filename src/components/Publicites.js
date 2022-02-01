import pub_img from "./img/pub.gif";
import { useHistory } from 'react-router';
import {useState,useEffect} from "react";
import { selectPublicites, setPublicite } from "../features/counterSlice";
import logo from "./img/sai.jpg";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useDispatch,useSelector} from "react-redux";
import Modal from "./admin/Modal";
import Sai from "./Sai";
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
        
        let i=index;
        if(i==data.length) i--;
        const selected_pub=data[i];
        dispatch(setPublicite(selected_pub))
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

    useEffect(()=>{
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
    },[index,data]);
    if(data.length==0){
        return null;
    }
    return(
        
        data.length>0 && <div style={{
            background:"#2faad6",
            width:"100%",
           border:"none",
           position:"fixed",
           bottom:0,
           zIndex:1,
           padding:0,
           margin:0,
           height:"60px",
           display:"flex",
           fontSize:"0.8rem",
          }}
          
          > 
          
          {sai==true && <Modal content={<Sai />} open={true} click={close_sai}/>}
          <div style={{
              
              width:"70px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
          }}
          onClick={go_to_sai}
          >
             <button style={{
                 backgroundColor:"white",
                 border:"none",
                 height:"55px",
             }}>
                <img src={logo} style={{width:50,height:50,resize:"cover",borderRadius:"50%"}}/>
             </button>
          </div>

          <div style={{
              flex:1,
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              flexDirection:"column",

              }}
              onClick={go_to_pub}
              >
                  
                  <p style={{
                      textAlign:"center",
                      whiteSpace:"nowrap",
                      width:"200px",
                      textOverflow:"ellipsis",
                      overflow:"hidden",
                      fontWeight:"bold",
                      color:"black",
                      marginBottom:"0.5rem",
                      fontSize:"0.7rem",
                      }}>
                        {titre}
                      </p>
                  <button style={{
                      backgroundColor:"orange",
                      padding:"0.2rem",
                      width:"80px",
                      border:"none",
                      borderRadius:"3px",
                      color:"white",
                      opacity:0.9,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      fontSize:"0.7rem",
                  }}>
                      Voir plus
                  <ArrowForwardIosIcon style={{color:"white",fontSize:"1rem"}}/>
                  </button>
              
              </div>
          <div style={{
             
              width:"70px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              
          }}
          
          onClick={go_to_pub}
          >
              <img src={url} style={{
               width:55,height:55,resize:"cover",
                objectFit:"cover",
                margin:0,
                padding:0,
              }} />
          </div>
             
            </div>
        
    );
}
export default Publicites;