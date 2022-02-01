import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectCourse, selectUsers} from "../features/counterSlice";
import HeaderBack from "../components/HeaderBack";
import "./recherche_pilote.scss";
import CallIcon from '@material-ui/icons/Call';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {taxi,vehicule_leger,vehicule_lourd,bus} from "../components/img";
import Pilote from "../components/Pilote";

const RecherchePilote=()=>{
    const c=useSelector(selectCourse);
    const [course,set_course]=useState(null);
    const [date,set_date]=useState("");
    const users=useSelector(selectUsers);
    const [pilotes,set_pilotes]=useState([]);
    const [loading,set_loading]=useState(true);
    useEffect(()=>{
        if(c==null) return;
        let type=c.type.index;
        const res=users.filter((user)=>{
            return user.type==2 && user.pilote==type;
        })
        console.log("pilotes are ",res);
        set_loading(false);
        set_pilotes(res);
    },[users,c]);
    useEffect(()=>{
        set_course(c);
        console.log("we got",c)
        if(c==null) return;
        var d=new Date(c?.date?.seconds*1000).toUTCString();
        d=d.split(" ");
        d=d[1]+" "+d[2]+" "+d[3];
        set_date(d);
    },[c])
    return (
        <div className="recherche">
            <HeaderBack title="Recherche de pilotes" />
            <div className="recherche_body">
                
                {
                    loading==true && <div className="info"><p>Recherche encours...</p></div>
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
                        minHeight:"60vh",
                        display:"flex",
                        alignItems:"flex-start",
                        flexWrap:"wrap",
                        gap:"1rem",
                        padding:"0.5rem",
                    }}>
                           {
                               pilotes.map((pilote)=>{
                                   return(
                                       <Pilote key={pilote.key} pilote={pilote}/>
                                   );
                               })
                           }
                    </div>
                }




                <div className="course">
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
                        display:"flex",
                        justifyContent:"space-between",
                        alignItmes:"center",
                        fontSize: "0.7rem"
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
        </div>
    )
}

export default RecherchePilote;