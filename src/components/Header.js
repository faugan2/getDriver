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
import {selectTab,setTab,selectUsers, setMe,selectMe,selectLoading} from "../features/counterSlice";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {auth} from "../firebase_file";
import {useHistory} from "react-router";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LockIcon from '@material-ui/icons/Lock';


export default function ProminentAppBar() {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const [tab,set_tab]=useState(0)
  const dispatch= useDispatch();
  const history=useHistory();

  const tab_index=useSelector(selectTab);
  const m=useSelector(selectMe)
  const loading=useSelector(selectLoading);
  
  useEffect(()=>{
	if(m==null && loading==false){
		history.replace("/");
	}
},[m,loading])

  const handle_set_tab=(index)=>{
      console.log(index);
      if(index==undefined){
          return;
      }
      dispatch(setTab(index));
     // set_tab(index);
     console.log("here we go",index)
  }

  const logout=()=>{
    auth.signOut();
    history.replace("/");
  }

  const u=useSelector(selectUsers);
  const [users,set_users]=useState([]);
  const [me,set_me]=useState(null);

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
    }
  },[u,auth]);

  

  useEffect(()=>{
    set_tab(tab_index);
    const btns=document.querySelectorAll("#top_btns > button");
    btns.forEach((btn)=>{
        btn.classList.remove("active");
    })
    console.log("the real index is ",tab_index)
    btns[tab_index]?.classList.add("active");
  },[tab_index,me]);

  
  const go_to_profile=()=>{
	  history.push("/profile");
  }
  
  const go_to_wallet=()=>{
	  history.push("/wallet");
  }

  const go_to_search=()=>{
    history.push("/recherche");
  }
  return (
    <div className={classes.root} id="header">
      <AppBar position="static" style={{backgroundColor:"white"}}>
        <Toolbar className={classes.toolbar} style={{position:"relative"}}>
         
        
          <h2 style={{color:"black",position:"absolute",left:"1rem",fontSize:"1rem"}}>Get Driver</h2>
          
          <IconButton aria-label="search" color="inherit" onClick={go_to_search}>
            <SearchIcon  style={{color:"black"}}/>
          </IconButton>
          <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={handleClick} style={{color:"black"}}>
            <MoreIcon />
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


        </Toolbar>

        {
          me?.type==1 &&  <div className={classes.bottom} id="top_btns">
          <button onClick={(e)=>{handle_set_tab(0)}}>Pilote</button>
          <button onClick={(e)=>{handle_set_tab(1)}}>Historique</button>
          <button onClick={(e)=>{handle_set_tab(2)}}>Contacts</button>
       </div>
        }

        {
          me?.type==2 &&  <div className={classes.bottom} id="top_btns">
          <button onClick={(e)=>{handle_set_tab(0)}}>Courses</button>
          <button onClick={(e)=>{handle_set_tab(1)}}>Historique</button>
          <button onClick={(e)=>{handle_set_tab(2)}}>Contacts</button>
       </div>
        }
       

        
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
   
  },
  menuButton: {
    marginRight: theme.spacing(2),
   
  },
  toolbar: {
   
    alignItems: 'center',
    display:"flex",
    justifyContent:"flex-end"
    
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
    opacity:0,
  },

  bottom:{
      display:"flex",
      justifyContent:"center",
      "& > button":{
          flex:1,
          padding:"0.3rem",
          border:"none",
          backgroundColor:"transparent",
          color:"gray",
          fontSize:"0.9rem",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          outline:"none",
          cursor:"pointer",
          "&.active":{
            borderBottom:"2px solid black",
            color:"black"
            
          }
      }
  }

}));
