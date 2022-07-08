import React,{useState,useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import {useSelector,useDispatch} from "react-redux";
import {setDriverLocation,selectTab,setTab,selectUsers, setMe,selectMe,selectLoading, 
  setCode, setEtape, setLogin, setOldLogin, selectDriverLocation,selectOpenLocation,setOpenLocation,
  selectAvailable, selectCommandes,setInteraction,selectInteraction,setClient,setPilote,selectClient,selectPilote,
  setCommande
} from "../features/counterSlice";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {auth,db} from "../firebase_file";
import {useHistory} from "react-router";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LockIcon from '@material-ui/icons/Lock';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import Modal from "./admin/Modal";
import EnableDisableLocation from './EnableDisableLocation';
import firebase from "firebase";
import "../styles/header.scss";
import BlockIcon from '@material-ui/icons/Block';
import Available from "./Available";
import BottomSheet from "./BottomSheet";
import PiloteFound from './PiloteFound';

export default function ProminentAppBar() {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const [tab,set_tab]=useState(0)
  const dispatch= useDispatch();
  const history=useHistory();

  const tab_index=useSelector(selectTab);
  const m=useSelector(selectMe)
  const loading=useSelector(selectLoading);
  const ol=useSelector(selectOpenLocation);
  
  useEffect(()=>{
	if(m==null && loading==false){
		history.replace("/");
	}
},[m,loading])

  const handle_set_tab=(index)=>{
      if(index==undefined){
          return;
      }
      dispatch(setTab(index));
  }

  const logout=()=>{
    auth.signOut();
    dispatch(setCode(null));
    dispatch(setLogin(null));
    dispatch(setEtape(1));
    dispatch(setOldLogin(null));
    history.replace("/");
  }

  const u=useSelector(selectUsers);
  const [users,set_users]=useState([]);
  const [me,set_me]=useState(null);
  const [first_load,set_first_load]=useState(true)

  useEffect(()=>{
   
    console.log("all users are ",u);
    set_users(u);
	/*if(u.length==0){
		history.replace("/");
		return;
	}*/

    const email=auth?.currentUser?.email;
    const res=u.filter((user)=>{
      
      return user.email==email;
    })
    if(res.length>0){
      
      set_me(res[0]);
      dispatch(setMe(res[0]));
      if(res[0].type==2){
        dispatch(setDriverLocation(res[0].location_active));
      }
    
    }
  },[u,auth]);

 

  

  useEffect(()=>{
    set_tab(tab_index);
    const btns=document.querySelectorAll(".bottom > button");
    btns.forEach((btn)=>{
        btn.classList.remove("active");
    })
    console.log("the real index is ",tab_index,me)
    btns[tab_index]?.classList.add("active");
  },[tab_index,me]);

  
  const go_to_profile=()=>{
	  history.push("/profile");
  }
  
  const go_to_wallet=()=>{
	  history.push("/wallet");
  }

  const go_to_search=()=>{
    const zone=document.querySelector(".top_search.p");
    if(zone==null){
      history.push("/recherche");
    }
  }

  const enable_disabled_location=()=>{
    set_open(true);
  }

  const [open,set_open]=useState(false);
  const close_modal=()=>{
    set_open(false);
    dispatch(setOpenLocation(false))
  }
  const driverLocation=useSelector(selectDriverLocation);
  
  useEffect(()=>{
      if(me==null) return;
      
      if(me.type==1) return;


      if(driverLocation== null || driverLocation==undefined) return;

      const key=me.key;
      console.log("driver =",key);

      console.time("Updating");

      db.collection("users").doc(key)
      .update({
        location_active:driverLocation,
        date:firebase.firestore.FieldValue.serverTimestamp()
      },{merge:true})
      .then(()=>{
        console.log("driver location activation uupdated")
      }).catch((err)=>{
        console.log("driver error updating the driver location")
      })

      console.timeEnd("Updating");
      const icon=document.querySelector(".active_location");
      console.log("the icon is ",icon);
      if(icon==undefined || icon==null){
        return;
      }
     /// animate_location_icon(icon?.parentNode);



  },[driverLocation]);
  const [op,set_op]=useState(0.5);
  

  useEffect(()=>{
    if(me==null) return;
    const type=me.type;
    if(type==1) return;
    const location_active=me.location_active;
    //dispatch(setDriverLocation(location_active));

  },[me]);

  useEffect(()=>{
    set_open(ol);
  },[ol])

  const [available,set_available]=useState(false);
  const a=useSelector(selectAvailable);
  const [open_available,set_open_available]=useState(false);
  useEffect(()=>{
    if(me==null ) return;
    if(me?.available==undefined) return;
    set_available(me?.available);
  },[me]);


  const handle_available=()=>{
    set_open_available(true);
  }
  const close_modal_available=()=>{
    set_open_available(false);
  }

  const commandes=useSelector(selectCommandes);
  const client=useSelector(selectClient);
  const pilote=useSelector(selectPilote);

  const [open_interaction,set_open_interaction]=useState(false);

  useEffect(()=>{
    if(u==null) return;
    if(commandes==null) return;

    const res=commandes.filter((item)=>{
      return item?.client==m?.key || item?.pilote==m?.key;
    })
    
    if(res.length==0) return;
    const line=res[0];
    dispatch(setCommande(line));

    const pilote_key=line.pilote;
    const client_key=line.client;
    
    const res_client=u.filter((item)=>{
      return item.key==client_key;
    })
    if(res_client.length>0){
      dispatch(setClient(res_client[0]));
    }

    const res_pilote=u.filter((item)=>{
      return item.key==pilote_key;
    })

    if(res_pilote.length>0){
      dispatch(setPilote(res_pilote[0]));
    }

  },[commandes,u])

  useEffect(()=>{
    if(client==null || pilote==null || commandes==null || commandes?.length==0){
      set_open_interaction(false);
    }else{
      set_open_interaction(true);
    }
  },[client,pilote,commandes])
  
  return (
    <div className="header">
     

        {
            open==true && <Modal 
            open={true}
            content={<EnableDisableLocation click={close_modal}/>}

            />
          }

        {
            open_available==true && <Modal 
            open={true}
            content={<Available click={close_modal_available} available={available} />}

            />
          }

        <div className="top">
          <h2>Get Driver</h2>
         
          <div className={`top_search ${me?.type==2 ? "p":"c" }`}  onClick={go_to_search}>
              <SearchIcon  style={{color:"gray",fontSize:"1.2rem"}}/>
              Rechercher
          </div>
          {
            me?.type==2 && 
            <button 
            onClick={handle_available}
            style={{padding:"0 0.5rem",backgroundColor:"transparent",border:"none"}}
            >
              {available==false && <BlockIcon style={{color:"white"}} />}
              {available==true && <BlockIcon style={{color:"var(--color)"}} />}
            </button>
          }
          {me?.type==2 && 
          <button  onClick={enable_disabled_location} 
          style={{padding:"0 0.5rem",backgroundColor:"transparent",border:"none"}}
          >
            
            {(driverLocation==false || driverLocation==undefined) && <LocationOffIcon  style={{color:"white"}}/>}
            {driverLocation==true && <LocationOnIcon  style={{color:"var(--color)"}} className="active_location" />}
          </button>
          }

          
          <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={handleClick}>
            <MoreIcon style={{color:"white"}} />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={go_to_profile}>
				<AccountCircleIcon  style={{color:"gray",fontSize:"1.2rem"}}/>
			<label style={{color:"gray",fontSize:"0.9rem"}}>Profile</label></MenuItem>
            <MenuItem onClick={go_to_wallet}>
				<MonetizationOnIcon style={{color:"gray",fontSize:"1.2rem"}}/>
				<label style={{color:"gray",fontSize:"0.9rem"}}>Porte feuille</label></MenuItem>
           
            <MenuItem onClick={logout}>
				<LockIcon style={{color:"gray",fontSize:"1.2rem"}}/>
				<label style={{color:"gray",fontSize:"0.9rem"}}>Deconnexion</label></MenuItem>
         </Menu>


        </div>

        {
          me?.type==1 &&  <div className="bottom" >
          <button onClick={(e)=>{handle_set_tab(0)}}>Pilote</button>
          <button onClick={(e)=>{handle_set_tab(1)}}>Historique</button>
          <button onClick={(e)=>{handle_set_tab(2)}}>Contacts</button>
       </div>
        }

        {
          me?.type==2 &&  <div className="bottom" >
          <button onClick={(e)=>{handle_set_tab(0)}}>Courses</button>
          <button onClick={(e)=>{handle_set_tab(1)}}>Historique</button>
          <button onClick={(e)=>{handle_set_tab(2)}}>Contacts</button>
       </div>
        }
       

       {open_interaction==true && <BottomSheet content={<PiloteFound click={null} />} />}
      
    </div>
  );
}
