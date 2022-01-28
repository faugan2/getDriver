
import HeaderBack from "../components/HeaderBack";
import map from "../components/img/map.png";
import "./details_commande.scss";
import {useSelector,useDispatch} from "react-redux";
import {selectCourse} from "../features/counterSlice";
import {useState,useEffect} from "react";
import {useHistory} from "react-router";
import {auth,db} from "../firebase_file";
import firebase from "firebase";

const DetailCommande=()=>{
	const course=useSelector(selectCourse);
	const history=useHistory();
	const [prix,set_prix]=useState(Math.round(Math.random()*500));
	
	const confirmer_course=async(e)=>{
		const btn=e.target;
		btn.disabled=true;
		btn.innerHTML="Patientez...";
		const new_course={...course,prix,date:firebase.firestore.FieldValue.serverTimestamp(),user:auth?.currentUser?.email}
		try{
			//await addDoc(collection(db,"courses"),new_course);
			await db.collection("courses").add(new_course);
			history.push("/");
		}catch(err){
			alert("Erreur "+err);
			btn.disabled=false;
			btn.innerHTML="Confirmez la course";
		}
		
		
	}
	
	useEffect(()=>{
		if(course==null){
			history.replace("/");
		}
	},[course])
	
	
	
	
	return(
		<div className="detail_commande">
			
			<div className="detail_commande_body">
				<div className="maps">
					<img src={map} />
				</div>
				<div className="details">
					<div className="details_line" style={{display:"none"}}>
						<div>
							<p>{course?.depart}</p>
							<p>Depart</p>
						</div>
						<div>
							<p>{course?.destination}</p>
							<p>Destination</p>
						</div>
					</div>
					<div className="details_line">
						<div>
							<p>0.8</p>
							<p>Km estimée</p>
						</div>
						<div>
							<p>0.5</p>
							<p>Heur estimée</p>
						</div>
					</div>
					
					<div className="detail_price">
						<h2>{prix} CFA</h2>
					</div>
					
					<div className="detail_confirm">
						<button onClick={confirmer_course}>Confirmez la course</button>
					</div>
					
				</div>
				
			</div>
		</div>
	);
}

export default DetailCommande;