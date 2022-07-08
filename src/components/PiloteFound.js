import "../styles/pilote_found.scss";
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import CallIcon from '@material-ui/icons/Call';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Loader } from "@googlemaps/js-api-loader"
import {useEffect, useState,useRef} from "react";
import {useSelector,useDispatch} from "react-redux";
import {selectMe,selectPilote,selectCommandes,selectClient,setClient,setPilote, selectCommande} from "../features/counterSlice";
import {db} from "../firebase_file";
import firebase from "firebase";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Modal from "./admin/Modal";
import DetailCommand from "./DetailCommand";
import BottomSheet from "./BottomSheet";
const PiloteFound=({click})=>{

    const me=useSelector(selectClient);
    const  pilote=useSelector(selectPilote);
    const commandes=useSelector(selectCommandes);
    const course=useSelector(selectCommande);
    
    const dispatch=useDispatch();
    

    const [center,set_center]=useState(null)
    const [map,set_map]=useState(null);
    const [depart_marker,set_depart_marker]=useState(null);
    const [destination_marker,set_destination_marker]=useState(null);
    const [poly_center,set_poly_center]=useState(null);
    const [poly_destination,set_poly_destination]=useState(null);
    const [distance,set_distance]=useState(0);
    const [in_progress,set_in_progress]=useState(false);
    const [commande_key,set_commande_key]=useState(null);
    const [open_detail,set_open_detail]=useState(false);


    const ref_cmd=useRef(null);
    const ref_cancel=useRef(null);

    useEffect(()=>{
        const res=commandes.filter((item)=>{
            return (item.client==me?.key && item.pilote==pilote?.key) || 
                    (item.client==pilote?.key && item.pilote==me?.key)
        })

        if(res.length>0){
            set_in_progress(true);
            set_commande_key(res[0].key);
        }else{
            set_in_progress(false);
        }
    },[commandes]);
    
    const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
        version: "weekly",
        libraries:['drawing', 'geometry', 'places', 'visualization'],
    });

    useEffect(()=>{

        if(pilote==null) return;
        if(me==null) return;
        //console.log("position of client me and pilote",me.location,pilote.location);
       
        //if(loader==null || loader==undefined || depart==null) return;
 
         let new_center={ lat: me?.location?.lat, lng: me?.location?.lng };
         let new_center_pilote={lat:pilote?.location?.lat,lng:pilote?.location?.lng};

 
         loader.load().then(() => {
            
            const google=window.google ;
            
            const m = new google.maps.Map(document.getElementById("map"), {
            center:new_center,
            zoom: 12,
            mapTypeId:"roadmap",
            disableDefaultUI: true
             });
 
 
         const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
         const d_marker = new google.maps.Marker({
             position: new_center,
            title:0
         });
         d_marker.setMap(m);
 
 
         set_map(m);
         set_depart_marker(d_marker)
 
         //if(destination==null) return;
 
         const des_marker = new google.maps.Marker({
             position: new_center_pilote,
            title:0
         });
         des_marker.setMap(m);
         set_destination_marker(des_marker);
         m.setZoom(10);
 
        // set_poly_center(center);
         //set_poly_destination(destination);
 
         var line=new google.maps.Polyline({path:[new_center,new_center_pilote],map:m});
 
         const distance=haversine_distance(d_marker,des_marker);
         set_distance(distance.toFixed(2))
         console.log("the disatnce is",distance);
 
         });
         
     },[me,pilote]);


     function haversine_distance(mk1, mk2) {
        var R = 6371.0710; // Radius of the Earth in kilometers
        var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
        var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)
    
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
      }

      const commander=()=>{
          const pilote_key=pilote?.key;
          const me_key=me?.key;
          ref_cmd.current.disabled=true;
          db.collection("commandes").add({
              client:me_key,
              pilote:pilote_key,
              course,
              date:firebase.firestore.FieldValue.serverTimestamp()
          }).then(()=>{
              //ref_cmd.current.disabled=false;
          })  
      } 

      const cancel=async ()=>{
        const pilote_key=pilote?.key;
        const me_key=me?.key;
        
        ref_cancel.current.disabled=true;
        await db.collection("commandes").doc(commande_key).delete();
        //ref_cancel.current.disabled=false;
        //close_pop();
      }

      const close_pop=()=>{
          
        dispatch(setClient(null));
        dispatch(setPilote(null));
        click();
      }
     
      const open_modal_detail=()=>{
          set_open_detail(true);
      }

      const close_detail=()=>{
          
          set_open_detail(false);
      }
    return(
        <div className="pilote_found">

            <button onClick={close_pop} className="btn_close">
                <CloseIcon />
            </button>   
            <div className="content_bottom">
               <div id="map">Chargement de la carte...</div>
            </div> 

            <div className="footer_bottom">
                {in_progress==false && <button onClick={commander} ref={ref_cmd}>
                    <ShoppingCartIcon />
                    Commander
                </button>}

                {in_progress==true &&
                    <button onClick={cancel} ref={ref_cancel} className="btn_cancel">
                        <RemoveShoppingCartIcon />
                        Annuler
                    </button>
                }
                <button>
                    <CallIcon />
                    Appeler</button>

                <button>
                    <span>{distance}</span>
                    <span>km</span>
                </button>
            </div>

            <button className="detail_commande" onClick={open_modal_detail}>
                <ShoppingBasketIcon />
            </button>

            {(open_detail==true && course!=null) && <BottomSheet content={
                <DetailCommand commande={commande_key} close={close_detail} />
            } open={true} />}
        </div>
    )
}

export default PiloteFound;