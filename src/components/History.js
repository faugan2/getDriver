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

import "./historique.scss";
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
		const btn=e.target;
		btn.disabled=true;
		const btn_alert=document.querySelector(`#payienter_${key}`);
		btn_alert.style.display="block";
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
				  
				   return(
						<div key={key} className={styles.course} onClick={e=>{
							go_to_recherche_pilote(e,key,destination,destination_name,user,price,date,categorie,origin,type,distance,search)
							}}>
						
							<button style={{
								position:"absolute",
								right:"0rem",
								top:"0rem",
								
								height:"1.5rem",
								border:"none",
								background:"none",
								color:"gray",
								display:"flex",
								
							}}
							onClick={e => remove_course(e,key)}
							>
								<p style={{color:"gray",fontSize:"0.7rem",display:"none"}} id={`payienter_${key}`}>patientez...</p>
								<DeleteIcon style={{fontSize:"1rem"}} />
								
							</button>
							<div className={styles.course_top}>
								<div style={{
									display:"flex",
									flexDirection:"column",
									justifyContent:"center",
									alignItems:"center",
								}}>
									
								{type.index==1 && <img src={taxi} style={{width:30,height:30,resize:"contain",borderRadius:"50%"}}/>} 
								{type.index==2 && <img src={vehicule_leger} style={{width:25,height:25,resize:"contain",borderRadius:"50%"}}/>} 
								{type.index==3 && <img src={vehicule_lourd} style={{width:30,height:30,resize:"contain",borderRadius:"50%"}}/>} 
								{type.index==4 &&<img src={bus} style={{width:25,height:25,resize:"contain",borderRadius:"50%"}}/>} 
									
								</div>
								<div style={{marginLeft:"0.5rem"}}>
									<p style={{
										fontSize:"0.7rem",
										fontWeight:"bold",
									}}>{destination_name}
									</p>
									<p style={{
										fontSize:"0.7rem",
										color:"gray",
									}}>
										{type.name}
									</p>

									
								</div>
							</div>
							
							
							
							<div style={{
								display:"flex",
								justifyContent:"space-between",
								alignItmes:"center",
								fontSize: "0.7rem"
								}}
								className="historique_bottom"
								>
								<div>
									<p>Date</p>
									<p>{d}</p>
								</div>
								<div>
									<p>Km</p>
									<p>{distance}</p>
								</div>
								<div>
									<p>Prix</p>
									<p>{price.total} CFA</p>
								</div>
								<div>
									<p style={{textAlign:"center"}}>Etat</p>
									<p>En cours</p>
								</div>
							</div>
							
							
						</div>
				   );
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
	},
	
	course_top:{
		display:"flex",
		alignItems:"center",
	}
})