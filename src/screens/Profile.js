import HeaderBack from "../components/HeaderBack";
import {auth,db,storage} from "../firebase_file";
import img from "../components/img/1.jpg";
import "./profile.scss";
import {useSelector,useDispatch} from "react-redux";
import {selectMe} from "../features/counterSlice";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useState,useEffect, useRef} from "react";

const Profile=()=>{
	const total=Math.round(0);
	const termine=Math.round(0);
	const encours=total-termine;
	const me=useSelector(selectMe)
	console.log("me=",me);
	const ref_photo=useRef(null);
	const change_photo=()=>{
		ref_photo.current.click();
	}

	const file_changed=()=>{
		const files=ref_photo.current.files;
		if(files.length==0) return;

		const file=files[0];
		const filename=file.name;
		const ref=storage.ref("images/"+filename);
		ref.put(file).then(()=>{
			
		}).catch((err)=>{
			console.log(err.message)
		})
		
	}
	return(
		<div className="profile">
			<HeaderBack title="Mon Profile" />
			<div className="profile_body">
				<div style={{
					display:"flex",
					flexDirection:"column",
					alignItems:"center",
					marginTop:"1rem",
				}}
					className="top"
				>

					{
						me.url==undefined && <AccountCircleIcon style={{width:150,height:150}} />
					}
					{me.url!=undefined && <img src={me.url} style={{
						width:"120px",height:"120px",borderRadius:"50%",
						marginBottom:"0.5rem",
						border:"1px solid silver"
						}} />}
					<p style={{
						fontSize:"1rem",
						fontWeight:"bold",
					}}>{me?.nom}</p>

					<button onClick={change_photo}>
						<CameraAltIcon />
					</button>
					<input type="file" ref={ref_photo} onChange={file_changed} accept="image/*"  style={{display:"none"}}/>
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