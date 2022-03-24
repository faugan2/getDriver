import {makeStyles} from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import {auth,db} from "../firebase_file";
import {useState,useEffect} from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {useDispatch} from "react-redux";
import {setCourse} from "../features/counterSlice";
import {bus,vehicule_leger,vehicule_lourd,taxi} from "./img";

import "../styles/historique.scss";
import Course from './Course';
const History = () => {
    const styles=useStyles();
	const history=useHistory();
	const [data,set_data]=useState([]);
	const dispatch= useDispatch();

	useEffect(async ()=>{
		
		const docs=await db.collection("courses").where("user","==",auth?.currentUser?.email).get();
		const dt=[];
		docs.forEach((doc)=>{
			const timestamp=doc.data().date?.seconds*1000;
			const d=new Date(timestamp).toUTCString();
			const t={key:doc.id, ...doc.data(),timestamp,str_date:d}
			
			console.log(t);
			dt.push(t);
			
		})
		set_data(dt);
	},[]);
	
	const commencer_course=()=>{
		history.push("/commander");
	}
	
	const remove_course=async (e,key)=>{
		console.log(e);
		e.stopPropagation();
		const btn=e.target;
		btn.disabled=true;
		//const btn_alert=document.querySelector(`#payienter_${key}`);
		//btn_alert.style.display="block";
		await db.collection("courses").doc(key).delete();
		//await deleteDoc((doc(db,"courses",key)));
		
		const res=data.filter((item)=>{
			return item.key!=key;
		})
		
		set_data(res);
	}
	
	const go_to_recherche_pilote=(e,key,destination,destination_name,user,price,date,categorie,origin,type,distance,search)=>{
		const course={
            type,
            origin,
            destination,
            distance,
            destination_name,
            price,
            date,
            search,
            user
        }
		
		dispatch(setCourse(course))
		history.push("/recherche_pilote");
	}
    return (
        <div className={styles.container}>
			{data.length==0 && <h1>Commencez une course</h1>}
			{data.length==0 && <p>Vous n'avez enregistré aucune course. 
			Utilisez le bouton ci-dessous pour commencer.</p>}
			{/*data.length==0 && <button onClick={commencer_course}>Commencer une course</button>*/}
		   
		   {
			   data.map(({key,destination,destination_name,user,price,date,categorie,origin,type,distance,str_date,search})=>{
				   let d=str_date
				   d=d.split(" ");
				   d=d[1]+" "+d[2]+" "+d[3];
				   
				   console.log("the date is ",str_date)

				   return <Course 
				   	can_delete={true}
				   	key={key}
					destination={destination}
					destination_name={destination_name}
					user={user}
					price={price}
					date={date}
					categorie={categorie}
					origin={origin}
					type={type}
					distance={distance}
					str_date={str_date}
					search={search}
					d={d}
					remove_course={e=>remove_course(e,key)}
					go_to_recherche_pilote={e=>{
						go_to_recherche_pilote(e,key,destination,destination_name,user,price,date,categorie,origin,type,distance,search)
					}}
				   />
				  
				   
			   })
		   }
           
        </div>
    )
}

export default History

const useStyles = makeStyles({
    container:{
        color:"black",
        padding:"1rem",
        display:"flex",
        flexDirection:"column",
        minHeight:"calc(100vh - 160px)",
        
		
        gap:"1rem",
		
		
        "& > h1":{
            fontSize:"0.8rem",
			marginBottom:"1rem",
			textAlign:"center",
        },
        "& > p":{
            fontSize:"0.8rem",
			textAlign:"center",
        },
        " & > button":{
            width:"100%",
            padding:"1rem",
            border:"none",
            outline:"none",
            backgroundColor:"white",
            color:"black",
            fontWeight:"bold",
			marginBottom:"2rem",
			marginTop:"2rem",
			borderRadius:"5px",
        },
        "& > .p_last":{
            color:"gray",
        }
    },
	
	course:{
		backgroundColor:"white",
		padding:"1rem",
		position:"relative",
		marginBottom:"1rem",

		"&:last-child":{
			
			marginBottom:"4rem"
		}
	},
	
	course_top:{
		display:"flex",
		alignItems:"center",
	}
})