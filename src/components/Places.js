import {useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { selectDepart, selectDestinationName, selectDistance, selectMap, 
    selectSearchDestinationText, setDestination, setDestinationName,
    selectType,
    setCourse,
    selectIcon,
    selectTarifs

} from "../features/counterSlice";
import "./places.scss";
import RoomIcon from '@material-ui/icons/Room';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import {auth, db} from "../firebase_file";
import firebase from "firebase";
import {useHistory} from "react-router-dom";

const Places=()=>{

    const dispatch= useDispatch();
    const history=useHistory();

    const map=useSelector(selectMap);
    function initService(depart) {
        
        const center = {lat:depart.lat,lng:depart.long};
        // Create a bounding box with sides ~10km away from the center point
        const defaultBounds = {
            north: center.lat + 0.1,
            south: center.lat - 0.1,
            east: center.lng + 0.1,
            west: center.lng - 0.1,
        };

       // console.log("depart is ",center)
        const input = document.getElementById("pac-input");

        const options = {
            bounds: defaultBounds,
            componentRestrictions: { country: "tg" },
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false,
            types: ["establishment"],
        };

        var google=window.google;
        /*const autocomplete = new google.maps.places.Autocomplete(input, options);
        
        autocomplete.addListener("place_changed",()=>{
            const place=autocomplete.getPlace();
            const lat=place.geometry.location.lat();
            const lng=place.geometry.location.lng();

           const destination={lat,lng};
           dispatch(setDestination(destination))
           prediction(input.value);
        })*/

        
       

    
          
      }

      const prediction=(input)=>{
        set_show_places(true);
        set_show_detail(false);
        const displaySuggestions = function (predictions, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
                document.getElementById("results").innerHTML="<li>Aucun resulat</li>";
              return;
            }
            
            if(input.value==""){
                document.getElementById("results").innerHTML="";
                return;
            }
            document.getElementById("results").innerHTML="";
            console.log(predictions.length);
            
            predictions.forEach((prediction) => {
                
              const li = document.createElement("li");
              li.onclick=()=>{
                 const place_id=prediction.place_id;
                 dispatch(setDestinationName(prediction.description));
                 var request = {
                    placeId: place_id,
                    fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
                  };

                  var service=new google.maps.places.PlacesService(map);
                  service.getDetails(request,(place,status)=>{
                      const lat=place.geometry.location.lat();
                      const lng=place.geometry.location.lng();
                      dispatch(setDestination({lat,lng}));
                      set_destination({lat,lng});
                      set_show_places(false);
                      set_show_detail(true);
                  })
                  
              }
        
              li.appendChild(document.createTextNode(prediction.description));
              document.getElementById("results").appendChild(li);
            });
          };
        
          var google=window.google;
          const service = new google.maps.places.AutocompleteService();
          const center = {lat:depart.lat,lng:depart.lng};
          // Create a bounding box with sides ~10km away from the center point
          
          const defaultBounds = {
              north: center.lat + 0.1,
              south: center.lat - 0.1,
              east: center.lng + 0.1,
              west: center.lng - 0.1,
          };

          console.log("the boundry is ",defaultBounds,center);

         
         //const request=new google.maps.places.AutocompletionRequest.
          service.getQueryPredictions({input,bounds:defaultBounds}, displaySuggestions);
        
      }
      
    const depart=useSelector(selectDepart)
    const search=useSelector(selectSearchDestinationText);

    useEffect(()=>{
        if(depart==null) return;
        initService(depart);
        if(search==""){
            document.getElementById("results").innerHTML="";
            return;
        }
        if(search.length>2){
            prediction(search);
        }
        
    },[depart,search]);

    const [show_detail,set_show_detail]=useState(false);
    const [show_places,set_show_places]=useState(false);
    const [distance,set_distance]=useState(0);

    const d=useSelector(selectDistance);
    useEffect(()=>{
        set_distance(d.toFixed(2));
    },[d]);

    const destination_name=useSelector(selectDestinationName);
    const [des_name,set_des_name]=useState("");
    useEffect(()=>{
        set_des_name(destination_name);
    },[destination_name]);

    const [type,set_type]=useState(null);
    const [origin,set_origin]=useState(null);
    const [destination,set_destination]=useState(null);
    
    const t=useSelector(selectType);
    useEffect(()=>{
        set_type(t);
    },[t]);

    useEffect(()=>{
        set_origin(depart);
    },[depart]);

    const [deplacement,set_deplacement]=useState(0);
    const [ht,set_ht]=useState(0);
    const [total,set_total]=useState(0);
    const [course,set_course]=useState(0);

    const tarifs=useSelector(selectTarifs);

    useEffect(()=>{
        console.log("le tarfis est ",tarifs,"pour ",type);
        if(type==null) return;
        const index=type.index;
        const res=tarifs.filter((tarif)=>{
            return tarif.type==index;
        })
        if(res.length==0) return;
        const res2=res[0];
        set_deplacement(res2.frais_fixe);
        set_course(res2.course);
    },[tarifs,type]);

    useEffect(()=>{
        if(distance==0) return;
        const res=distance*course;
        set_ht(res.toFixed(2));
        set_total((parseFloat(res)+parseFloat(deplacement)).toFixed(2));

    },[distance,course,deplacement]);

    const lancer_recherche=async (e)=>{
        
        const {name,index,icon}=type;
        const course={
            type:{name,index},
            origin,
            destination,
            distance,
            destination_name:des_name,
            price:{deplacement,course:ht,total},
            date:firebase.firestore.FieldValue.serverTimestamp(),
            search,
            user:auth?.currentUser?.email
        }
        console.log(course)
        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";
        dispatch(setCourse(course));
       await db.collection("courses").add(course);

        btn.disabled=false;
        btn.innerHTML="Lancez la recherche";

        history.replace("/recherche_pilote");

    }

   
    
    return(
        <div className="places" style={{position:"relative"}}>

           <div style={{display:`${show_places==true?"block":"none"}` }}>
            <ul id="results" ></ul>
           </div>
           
           <div style={{display:`${show_detail==true?"block":"none"}` }}>
               <div style={{
                   display:"flex",
                   
                   alignItems:"center",
                   padding:"0 0.5rem",
                   
               }}>
                    
                    <button style={{border:"none",backgroundColor:"whitesmoke",flex:1,display:"flex",
                    alignItems:"center",justifyContent:"flex-start",fontSize:"0.7rem",gap:"0.5rem"}}>
                        <RoomIcon style={{fontSize:"1.2rem",opacity:0.6}} />
                        {des_name}
                        
                        </button>

                        <button
                        onClick={e=>{
                            set_show_detail(!show_detail);
                            set_show_places(!show_places);
                        }}
                        style={{border:"none",backgroundColor:"white",width:"2rem",height:"2rem",borderRadius:"50%"}}>
                        <MoreHorizIcon />
                    </button>
               </div>

               <div style={{
                   display:"flex",
                   padding:"0.3rem 0.5rem",
                   alignItems:"center",
                   justifyContent:"flex-start",
                  
               }}>
                   
                   

                   <button style={{border:"none",backgroundColor:"whitesmoke",flex:1,display:"flex",
                   alignItems:"center",justifyContent:"flex-start",fontSize:"0.7rem",gap:"0.5rem"}}>
                   <AirplanemodeActiveIcon style={{fontSize:"1.2rem",opacity:0.6}} />
                   {distance} KM
                        
                    </button>

               </div>


               <div style={{
                   display:"flex",
                   padding:"0.3rem 0.5rem",
                   alignItems:"center",
                   justifyContent:"flex-start",
                   borderBottom:"1px solid silver",
               }}>
                   
                   

                   <button style={{border:"none",backgroundColor:"whitesmoke",flex:1,display:"flex",
                   alignItems:"center",justifyContent:"flex-start",fontSize:"0.7rem",gap:"0.5rem"}}>
                   
                   {type?.icon.icon}
                   {type?.name}
                        
                    </button>

               </div>

               
               <div className="prix_detail">
                   <p>Deplacement Pilote</p>
                   <p>1 x {deplacement}</p>
                   <p>{deplacement} CFA</p>
               </div>

               <div className="prix_detail">
                   <p>Course</p>
                   <p>{distance} x {course}</p>
                   <p>{ht} CFA</p>
               </div>

               <div className="prix_detail">
                   <p>Total</p>
                   <p style={{
                       fontWeight:"bold",
                       color:"black",

                   }}>{total} CFA</p>
               </div>


               <div style={{
                   padding:"0.5rem",
                   display:"flex",
                   alignItems:"center",
                   justifyContent:"center",

               }}>
                   <button style={{
                       padding:"0.6rem",
                        border:"1px solid silver",
                        backgroundColor:"white",
                        borderRadius:"5px",
                        width:"150px",
                   }}
                   onClick={lancer_recherche}
                   >Lancez la recherche</button>
               </div>
               
           </div>

           
            <div className="zone_places">
                <input type="text" placeholder="Quelle est votre destination ?" id="pac-input" 
                
                onChange={e=>{
                    const v=e.target.value;
                    if(v.length>2){
                        prediction(v);
                    }
                }}/>
                
            </div>
            
            
        </div>
    );
}

export default Places;