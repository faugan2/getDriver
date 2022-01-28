import HeaderBack from "../components/HeaderBack";
import {auth,db} from "../firebase_file";
import img from "../components/img/1.jpg";
import "./profile.scss";
const Profile=()=>{
	const total=Math.round(Math.random()*200);
	const termine=Math.round(Math.random()*100);
	const encours=total-termine;
	return(
		<div className="profile">
			<HeaderBack title={auth?.currentUser?.email} />
			<div>
				<div style={{
					display:"flex",
					flexDirection:"column",
					alignItems:"center",
					marginTop:"1rem",
				}}>
					<img src={img} style={{width:"120px",height:"120px",borderRadius:"50%",marginBottom:"0.5rem"}} />
					<p style={{
						fontSize:"1rem",
						fontWeight:"bold",
					}}>{auth?.currentUser?.displayName}</p>
					
				</div>
				
				<div style={{
					display:"flex",
					justifyContent:"space-between",
					padding:"1rem",
				}}>
					<div className="stats">
						<p>{total}</p>
						<p>Total</p>
					</div>
					<div className="stats">
						<p>{termine}</p>
						<p>Terminé</p>
					</div>
					<div className="stats">
						<p>{encours}</p>
						<p>En cours</p>
					</div>
				</div>
				
				<div className="zone_edit">
					<button>Editer votre profil</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;