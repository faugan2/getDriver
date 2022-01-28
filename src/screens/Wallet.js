import HeaderBack from "../components/HeaderBack";
import {auth,db} from "../firebase_file";
import img from "../components/img/1.jpg";
import "./wallet.scss";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useEffect, useState} from "react";

const Wallet=()=>{
	const show_payement_system=()=>{
		set_payement(true);
	}
	
	const valider_payement=()=>{
		set_payement(false);
	}
	const [payement,set_payement]=useState(false);
	const [argent,set_argent]=useState(0);
	useEffect(()=>{
		db.collection("argent").where("email","==",auth?.currentUser?.email).get().then((snap)=>{
			let total=0;
			snap.docs.map((doc)=>{
				const montant=doc.data().montant;
				total+=parseFloat(montant);
			})

			console.log("le montant est ",total);
			set_argent(total);
		})
	},[]);
	
	return(
		<div className="wallet">
			<HeaderBack title="Mon porte feuille" />
			<div className="top_wallet">
				<AttachMoneyIcon style={{
					fontSize:"4rem",
					backgroundColor:"#3f51b5",
					borderRadius:"50%",
					marginTop:"1rem",
					marginBottom:"1rem",
					color:"white",
				}}/>
				<p style={{
					fontSize:"1.3rem",
					fontWeight:"bold",
				}}>{argent}  CFA</p>
				<p style={{
					fontSize:"0.8rem",
					color:"gray",
				}}>Total de mon compte</p>
			</div>
			
			<div style={{
				backgroundColor:"silver",
				padding:"1rem",
				opacity:"0.6",
				marginTop:"2rem",
			}}>
				<p style={{
					fontSize:"0.8rem",
				}}>CHARGEZ MON COMPTE</p>
			</div>
			
			{payement==false && <div>
			<div className="wallet_money" onClick={show_payement_system}>
				<div>
					<AttachMoneyIcon  style={{
						backgroundColor:"silver",
						borderRadius:"50%",
						padding:"0.3rem",
						marginRight:"0.5rem",
						backgroundColor:"#3f51b5",
						color:"white",
					}}/>
					<p style={{
						fontSize:"0.8rem",
						fontWeight:"bold",
					}}>500  CFA</p>
				</div>
				<ArrowForwardIosIcon style={{color:"gray"}} />
			</div>
			
			<div className="wallet_money" onClick={show_payement_system}>
				<div>
					<AttachMoneyIcon  style={{
						backgroundColor:"silver",
						borderRadius:"50%",
						padding:"0.3rem",
						marginRight:"0.5rem",
						backgroundColor:"#3f51b5",
						color:"white",
					}}/>
					<p style={{
						fontSize:"0.8rem",
						fontWeight:"bold",
					}}>1000  CFA</p>
				</div>
				<ArrowForwardIosIcon style={{color:"gray"}}  />
			</div>
			
			<div className="wallet_money" onClick={show_payement_system}>
				<div>
					<AttachMoneyIcon  style={{
						backgroundColor:"silver",
						borderRadius:"50%",
						padding:"0.3rem",
						marginRight:"0.5rem",
						backgroundColor:"#3f51b5",
						color:"white",
					}}/>
					<p style={{
						fontSize:"0.8rem",
						fontWeight:"bold",
					}}>2000  CFA</p>
				</div>
				<ArrowForwardIosIcon style={{color:"gray"}}  />
			</div>
			
			<div className="wallet_money" onClick={show_payement_system}>
				<div>
					<AttachMoneyIcon  style={{
						backgroundColor:"silver",
						borderRadius:"50%",
						padding:"0.3rem",
						marginRight:"0.5rem",
						backgroundColor:"#3f51b5",
						color:"white",
					}}/>
					<p style={{
						fontSize:"0.8rem",
						fontWeight:"bold",
					}}>5000  CFA</p>
				</div>
				<ArrowForwardIosIcon style={{color:"gray"}}  />
			</div>
			
			</div>
			}
			
			{
				payement==true &&
				<div style={{
					display:"flex",
					flexDirection:"column",
					alignItems:"center",
					marginTop:"2rem",
				}}>
					<h2 style={{
						fontSize:"0.8rem",
						
					}}>CHARGER AVEC : </h2>
					<div style={{
						marginTop:"1rem",
						display:"flex",
						alignItems:"center",
					}}>
						<button style={{
							padding:"1rem",
							width:"100px",
							marginRight:"1rem",
							border:"none",
							outline:"none",
							backgroundColor:"white",
							color:"#3f51b5",
							fontWeight:"bold",
							
						}}
						onClick={valider_payement}
						>Flooz</button>
						<button 
						onClick={valider_payement}
						style={{
							padding:"1rem",
							width:"100px",
							marginRight:"1rem",
							border:"none",
							outline:"none",
							backgroundColor:"white",
							color:"#3f51b5",
							fontWeight:"bold",
							
						}}>T-Money</button>
					</div>
				</div>
			}
			
			
		</div>
	);
}

export default Wallet;