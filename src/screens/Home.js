import React,{useState,useEffect} from "react";
import Header from "../components/Header";
import SwipeableViews from 'react-swipeable-views';
import {useSelector,useDispatch} from "react-redux";
import {selectTab,setTab,selectMe, setOnline, selectOnline} from "../features/counterSlice";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Drivers from "../components/Drivers";
import Passengers from "../components/Passengers";
import Contacts from "../components/Contacts";
import History from "../components/History";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory } from 'react-router';

import Main from "../components/Main";
import { Loader } from "@googlemaps/js-api-loader";
import Publicites from "../components/Publicites";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    slide: {
      backgroundColor: '#e8e8e8',
      
    },
    slide1: {
      
      
	  display:"flex",
      
    },
    slide2: {
      
     
    },
    slide3: {
      
     
    },
  };

const Home=()=>{

    const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
        version: "weekly",
        libraries:['drawing', 'geometry', 'places', 'visualization'],
      });

	useEffect(()=>{
		loader.load("i am done loading");
	},[])

    const dispatch=useDispatch();
    const [h,setH]=useState(0);
	const history=useHistory();

    useEffect(()=>{
        console.log("ok for this")
        const height=window.screen.height
        const header=document.querySelector("#header")?.clientHeight;
        const dif=height-header;
        setH(dif);

        const sc=document.querySelectorAll(".slide_content");
        sc.forEach((s)=>{
            s.style.height=dif+"px";
        })
    },[])

    useEffect(()=>{
        window.addEventListener('resize', handle_resize_window, true);
        return ()=>{
            console.log("ok")
            window.removeEventListener("resize",handle_resize_window);
        }
    },[])

    const handle_resize_window=(event)=>{
        const height=window.screen.height
        const header=document.querySelector("#header")?.clientHeight;
        const dif=height-header;
        setH(dif);
        console.log("resize is now ",dif);
    }
    
    const tab_index=useSelector(selectTab);
    const [index,setIndex]=useState(0);

    useEffect(()=>{
        setIndex(tab_index);
    },[tab_index]);

    const handleChangeIndex=(index)=>{
        dispatch(setTab(index))
        setIndex(index);
    }

   
    const m=useSelector(selectMe)
	console.log("m is ",m);
    const [me,set_me]=useState(m);
    useEffect(()=>{
        set_me(m);
		
    },[m]);

	
	const commencer_course=()=>{
		history.push("/commander");
	}

    const go_to_pub=(e)=>{
        history.push("/publicite");
    }

    useEffect(()=>{
        const google=window.google ;
        console.log("her we go");
    },[])

   

    
    const online=useSelector(selectOnline);
    

    return(
        <div style={{position:"relative",backgroundColor:"whitesmoke"}}>

           
            <Publicites />
         
            <Header />
            <SwipeableViews enableMouseEvents index={index} onChangeIndex={handleChangeIndex}>
                <div style={Object.assign({}, styles.slide, styles.slide1,{height:h})} className="slide" id="slide1">
                    {me?.type==1 && <Main />}
                    {me?.type==2 &&  <Passengers /> }
                    {
                        me==null && 
                            <div style={{
                                display:"flex",
                                flexDirection:"column",
                                alignItems:"center",
                                justifyContent:"center",
                                padding:"1rem",
                                width:"100vw",
                            }}>
                             <CircularProgress style={{color:"#3f51b5"}} size={15} />
                             <p style={{
                                 fontSize:"0.8rem",
                                 fontWeight:"bold",
                             }}>Chargement...</p>
                            </div>
                    }
                   
                    
                </div>
                <div style={Object.assign({}, styles.slide, styles.slide2,{height:h})} className="slide" id="slide2">
                   <History />
                </div>
                <div style={Object.assign({}, styles.slide, styles.slide3,{height:h})} className="slide" id="slide3">
                    <Contacts />
                </div>
                
        </SwipeableViews>
            <div style={{position:"fixed",bottom:"4rem",right:"2rem",display:"none"}}>

                {(index==0 || index==1 )&& <Fab color="default" aria-label="add"
					onClick={commencer_course}

				><ShoppingCartIcon style={{color:"#3f51b5"}} /></Fab>}
                
            </div>
            
        
        </div>
    );
}

export default Home;