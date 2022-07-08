import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectCourse, selectUsers,selectMe,setPilote,setClient,setCommande} from "../features/counterSlice";
import HeaderBack from "../components/HeaderBack";
import "../styles/recherche_pilote.scss";
import CallIcon from '@material-ui/icons/Call';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {taxi,vehicule_leger,vehicule_lourd,bus} from "../components/img";
import Pilote from "../components/Pilote";
import CircularProgress from '@material-ui/core/CircularProgress';
import BottomSheet from "../components/BottomSheet";
import PiloteFound from "../components/PiloteFound";
import {auth,db} from "../firebase_file";

const moment=require("moment-timezone");
const RecherchePilote=()=>{
    const c=useSelector(selectCourse);
    const [course,set_course]=useState(null);
    const [date,set_date]=useState("");
    const users=useSelector(selectUsers);
    const [pilotes,set_pilotes]=useState([]);
    const [loading,set_loading]=useState(true);
    const [position,set_position]=useState(null);
    const [open,set_open]=useState(false);

    const me=useSelector(selectMe);
    const dispatch= useDispatch();

    useEffect(()=>{
        if(c==null) return;
        

        let type=c.type.index;
        const res=users.filter((user)=>{
            return user.type==2 && user.pilote==type;
        })
        
        
        //console.log("all results are ",res);
       const res2= res.filter((item,i)=>{
            const location=item.location;
            return true;
            return location!=undefined;
        })

       
        const res3=res2.filter((item,i)=>{
            const active=item.location_active;
            const available=item.available;
            
            if(active==undefined) return false;
            if(available==undefined) return false;


            return (active && available);
        })
       
        set_loading(false);
        if(res3.length>1){
            const res4=res3.slice(0,1);
            set_pilotes(res4);
        }else{
            set_pilotes(res3);
        }
        

    },[users,c]);
    useEffect(()=>{
        set_course(c);
        if(c==null) return;
        var d=moment(c?.date?.seconds*1000).format("ll");
        set_date(d);
    },[c])

    useEffect(()=>{
        const id=navigator.geolocation.watchPosition(function(position) {
            
            const objet={lat:position.coords.latitude,lng:position.coords.longitude};
            console.log("position of client ",objet);
            db.collection("users").doc(me?.key).update({location:objet},{merge:true});

            
          },

          (err)=>{console.log("erreur=",err)},
          { enableHighAccuracy: true, timeout: 5000},
          );

          return ()=>{
              console.log("position of we must clear the watch");
              navigator.geolocation.clearWatch(id);
          }
    },[]);

    const open_bottom=(pilote,course)=>{
        dispatch(setPilote(pilote));
        dispatch(setClient(me));
        dispatch(setCommande(course));
        set_open(true);
    }
    const close_bottom=()=>{
        
        set_open(false);
        dispatch(setPilote(null));
    }
    return (
        <div className="recherche">
            <HeaderBack title="Recherche de pilotes" />
            <div className="recherche_body">
                
                {
                    loading==true && <div className="info">
                        <CircularProgress style={{color:"#3f51b5"}} size={15}/>
                        <p>Recherche de pilotes encours...</p>
                        </div>
                }
                {(pilotes.length==0 && loading==false) && <div className="info">
                    <p>Aucun pilote n'est trouvé dans votre entourage</p>
                    <p>Applez-nous pour vous mettre en contact avec un pilote</p>
                    <button>
                        <CallIcon style={{fontSize:"1.5rem"}} />
                        Appelez</button>
                </div>
                }

                {
                    (pilotes.length >0 && loading==false) && 
                    <div className="liste_pilotes" style={{
                        
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        
                    }}>
                           {
                               pilotes.map((pilote)=>{
                                   return(
                                       <Pilote 
                                       key={pilote.key} 
                                       pilote={pilote} 
                                       distance={true} 
                                       me={me}
                                       course={c}
                                       click={open_bottom.bind(this,pilote,c)}
                                       />
                                   );
                               })
                           }
                    </div>
                }




                <div className="course" style={{display:"none"}}>
                    <div className="top">
                    {course?.type.index==1 &&  <img src={taxi} style={{width:25,height:25,resize:"contain",borderRadius:"50%"}}/>} 
                    {course?.type.index==2 &&  <img src={vehicule_leger} style={{width:25,height:25,resize:"contain",borderRadius:"50%"}}/>} 
                    {course?.type.index==3 &&  <img src={vehicule_lourd} style={{width:25,height:25,resize:"contain",borderRadius:"50%"}}/>} 
                    {course?.type.index==4 &&  <img src={bus} style={{width:25,height:25,resize:"contain",borderRadius:"50%"}}/>} 
                    
                    <div style={{marginLeft:"0.5rem"}}>
                        <p style={{
                            fontSize:"0.7rem",
                            fontWeight:"bold",
                        }}>{course?.destination_name}
                        </p>
                        <p style={{
                            fontSize:"0.7rem",
                            color:"gray",
                        }}>
                            {course?.type.name}
                        </p>

                        
                    </div>

                    
                    </div>
                    <div style={{
                        
                        }}
                        className="bottom"
                        >
                        <div>
                            <p>Date</p>
                            <p>{date}</p>
                        </div>
                        <div>
                            <p>Km</p>
                            <p>{course?.distance}</p>
                        </div>
                        <div>
                            <p>Prix</p>
                            <p>{course?.price.total} CFA</p>
                        </div>
                        <div>
                            <p style={{textAlign:"center"}}>Etat</p>
                            <p>En cours</p>
                        </div>
                    </div>
                </div>
            </div>

            {open==true && <BottomSheet content={<PiloteFound click={close_bottom} />} />}
        </div>
    )
}

export default RecherchePilote;