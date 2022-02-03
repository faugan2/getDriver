import React,{useState,useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {auth} from "../firebase_file";
import {useHistory} from "react-router-dom";
import logo from "../components/img/logo.jpg"

import {db} from "../firebase_file";

import {useDispatch} from "react-redux";
import {setUsers,setLoading, setTarifs, setPublicites, setCourses, setOnline} from "../features/counterSlice";

const Splash = () => {
    const styles=useStyles();
    const history=useHistory();
    const dispatch= useDispatch();
	const [loading,set_loading]=useState(false);
    useEffect(()=>{
        load_users();
        auth.onAuthStateChanged((user)=>{
            if(user==null){
                history.replace("/login2");
            }else{
                const email=auth?.currentUser.email;
                
                history.replace("/main");
            }
        })
       
    },[auth])

    const load_users=async ()=>{
		set_loading(true);
       
		
        const ref=db.collection("users");
        ref.onSnapshot(async (snap)=>{
            const users=[];
           snap.docs.map((user)=>{
            const key=user.id;
            const data=user.data();
            const date=data.date?.seconds;
            data.date=date;
            data.key=key;
            users.push(data);
           })
           dispatch(setUsers(users));
		   set_loading(false);

           await load_tarifs();
           await load_pub();
           await load_courses();
           //send to redux;
        })
    }
    
	
	useEffect(()=>{
		dispatch(setLoading(loading));
	},[loading])

    const load_tarifs=async ()=>{
        db.collection("tarifs").onSnapshot((snap)=>{
            const d=[];
            snap.docs.map((doc)=>{
                const key=doc.id;
                const data=doc.data();
                data.key=key;
                d.push(data)
            })
            dispatch(setTarifs(d));
            console.log("traif=",d);
        })
    }

    const load_pub=async ()=>{
        db.collection("publicites").onSnapshot((snap)=>{
            const d=[];
            snap.docs.map((doc)=>{
                const key=doc.id;
               
              

                const timestamp=doc.data().date?.seconds*1000;
			    const dt=new Date(timestamp).toUTCString();
			    const t={key:doc.id, ...doc.data(),timestamp,str_date:dt}
			

                d.push(t)
            })
            dispatch(setPublicites(d));
        })
    }

    const load_courses=async ()=>{
        db.collection("courses").onSnapshot((snap)=>{
            const d=[];
            snap.docs.map((doc)=>{
                const key=doc.id;
                const data=doc.data();
                data.key=key;
                d.push(data);
            })

            dispatch(setCourses(d))
        })
    }

    const onOffLine=(event)=>{
        if(navigator.onLine){
            console.log("we are online");
            dispatch(setOnline(true))
        }else{
            console.log("we are offline");
            dispatch(setOnline(false))
        }
    }
    
    useEffect(()=>{
        window.addEventListener("online",onOffLine)
        window.addEventListener("offline",onOffLine)
    
        return ()=>{
            window.removeEventListener("online",onOffLine);
            window.removeEventListener("offline",onOffLine);
        }
    },[]);

    
    return (
        <div className={styles.container}>
             <div style={{width:100,height:100}}>
               <img src={logo} style={{width:"100%"}}/>
             </div>
            <CircularProgress style={{color:"#3f51b5"}} size={15} />
            <p style={{fontSize:"0.8rem",fontWeight:"bold"}}>Chargement...</p>
        </div>
    )
}

export default Splash


const useStyles = makeStyles((theme) => ({

    container:{
        backgroundColor:"#e8e8e8",
        display:"flex",
        height:"100vh",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        color:"black",
    },

    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));