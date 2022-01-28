import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectCourse} from "../features/counterSlice";
import HeaderBack from "../components/HeaderBack";
import "./recherche_pilote.scss";
import CallIcon from '@material-ui/icons/Call';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
const RecherchePilote=()=>{
    const c=useSelector(selectCourse);
    const [course,set_course]=useState(null);
    const [date,set_date]=useState("");
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
                <div className="info">
                    <p>Aucun pilote n'est trouvé dans votre entourage</p>
                    <p>Applez-nous pour vous mettre en contact avec un pilote</p>
                    <button>
                        <CallIcon style={{fontSize:"1.5rem"}} />
                        Appelez</button>
                </div>




                <div className="course">
                    <div className="top">
                    {course?.type.index==1 && <LocalTaxiIcon style={{backgroundColor:"whitesmoke",padding:"0.5rem",borderRadius:"50%"}} />} 
                    {course?.type.index==2 && <AirportShuttleIcon style={{backgroundColor:"whitesmoke",padding:"0.5rem",borderRadius:"50%"}} />} 
                    {course?.type.index==3 && <LocalShippingIcon style={{backgroundColor:"whitesmoke",padding:"0.5rem",borderRadius:"50%"}} />} 
                    {course?.type.index==4 && <DirectionsBusIcon style={{backgroundColor:"whitesmoke",padding:"0.5rem",borderRadius:"50%"}} />} 
                    
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