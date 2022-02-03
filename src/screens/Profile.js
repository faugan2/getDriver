import HeaderBack from "../components/HeaderBack";
import {auth,db,storage} from "../firebase_file";
import img from "../components/img/1.jpg";
import "./profile.scss";
import {useSelector,useDispatch} from "react-redux";
import {selectCourses, selectMe, setMe} from "../features/counterSlice";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useState,useEffect, useRef} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
const Profile=()=>{
	

	const [encours,set_encours]=useState(0);
	const [termine,set_termine]=useState(0);
	const [total,set_total]=useState(0);

	const dispatch= useDispatch();
	const me=useSelector(selectMe)
	console.log("me=",me);
	const ref_photo=useRef(null);
	const [url,set_url]=useState(null);
	const [nom,set_nom]=useState("");
	const [changing_photo,set_changing_photo]=useState(false);

	const courses=useSelector(selectCourses);


	const change_photo=()=>{
		ref_photo.current.click();
	}

	useEffect(()=>{
		if(me==null || me.url==undefined) return;
		set_url(me.url)
		set_nom(me.nom);
	},[me]);

	const file_changed=()=>{
		const files=ref_photo.current.files;
		if(files.length==0) return;

		const file=files[0];
		const filename=file.name;
		const ref=storage.ref("images/"+filename);
		set_alerte("");
		set_changing_photo(true)
		ref.put(file).then(()=>{
			ref.getDownloadURL().then((url)=>{
				db.collection("users").doc(me.key).update({url},{merge:true}).then(()=>{
					console.log("ok we are good");
					const new_me={...me,url};
					dispatch(setMe(new_me))
					set_changing_photo(false);
				}).catch((err)=>{
					set_alerte(err.message)
					set_changing_photo(false);
				})
			})
		}).catch((err)=>{
			set_alerte(err.message)
			set_changing_photo(false);
		})
		
	}

	const close_alerte=()=>{
		setTimeout(()=>{
			set_alerte("");
		},3000);
	}

	const [alerte,set_alerte]=useState("")
	const [changing_name,set_changing_name]=useState(false)
	const [processing_name,set_processing_name]=useState(false);
	const changer_nom=()=>{
		if(nom==""){
			set_alerte("Le nom est vide");
			close_alerte();
			return;
		}
		set_processing_name(true);

		db.collection("users").doc(me.key).update({nom},{merge:true}).then(()=>{
			set_processing_name(false);
			set_changing_name(false);
			const new_me={...me,nom};
			dispatch(setMe(new_me));
		}).catch((err)=>{
			set_processing_name(false);
			set_alerte(err.message);
			close_alerte();
		})
		
	}

	useEffect(()=>{
		console.log("all courese are",courses)
	},[courses])
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
						url==undefined && <AccountCircleIcon style={{width:150,height:150}} />
					}
					{url!=undefined && <img src={url} style={{
						width:"120px",height:"120px",borderRadius:"50%",
						marginBottom:"0.5rem",
						border:"1px solid silver"
						}} />}

						{alerte!="" && <p style={{fontSize:"0.7rem",color:"indianred"}}>{alerte}</p>}

						
					

					<button onClick={change_photo}>
						{changing_photo==false && <CameraAltIcon />}
						{changing_photo==true && <CircularProgress style={{color:"white"}} size={15} />}
					</button>
					<input type="file" ref={ref_photo} onChange={file_changed} accept="image/*"  style={{display:"none"}}/>
				</div>

				<div style={{
							borderBottom:"1px solid silver",
							width:"150px",
							margin:"auto",
							display:"flex",
							flexDirection:"column",
							alignItems:"center",
						}}>
							{changing_name==false && <p style={{
								fontSize:"0.8rem",
								fontWeight:"bold",
							}}>{nom}
							</p>}

							{changing_name==false && <button style={{
								width:"100px",
								border:"none",
								backgroundColor:"#e8e8e8",
								display:"flex",
								alignItems:"center",
								justifyContent:"center",
								}}
								onClick={e=>set_changing_name(true)}
								>
								<EditIcon style={{color:"gray"}}/>
							</button>}

							{changing_name==true && 
							<div className="zone_edit_profile">
								<div className="line">
									<label>Changez votre nom</label>
									<div>
										<input type="text" value={nom} onChange={e=>set_nom(e.target.value)}/>
										<button onClick={changer_nom}>
											{processing_name==false && <CheckIcon />}
											{processing_name==true && <CircularProgress style={{color:"#3f51b5"}} size={15} />}
										</button>
									</div>
								</div>
							</div>
							}


						</div>
				
				<div style={{
					display:"flex",
					justifyContent:"space-between",
					padding:"1rem",
					marginTop:"2rem",
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
				
				<div className="zone_edit" style={{display:"none"}}>
					<button>Editer votre profil</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;