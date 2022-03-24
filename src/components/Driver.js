import Avatar from '@material-ui/core/Avatar';
import   "../styles/driver.scss";
import avatar from "./img/1.jpg";
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CallIcon from '@material-ui/icons/Call';
import ForumIcon from '@material-ui/icons/Forum';
import {useState,useEffect} from "react";

const Driver=({nom,categorie,click,appeler,discuter,photo})=>{
	
	const course=Math.round(Math.random()*100);
	const kilometre=Math.round(Math.random()*5000);
	const tarif=Math.round(Math.random()*2000);
	const conduite=Math.round(Math.random()*5);
	const [etoile,set_etoile]=useState(Math.ceil(Math.random()*4));
	
	const [etoiles,set_etoiles]=useState([]);
	useEffect(()=>{
		let tmp=[];
		for(let i=0; i<etoile; i++){
			tmp.push(i);
		}
		set_etoiles(tmp);
	},[etoile])
	return (
		<div className="container">
			<div className="top">
				<div className="left">
					<Avatar src={photo} />
					<div className="info">
						<p className="info_nom">{nom}</p>
						<p className="info_categorie">{categorie}</p>

						<div>
						{
							etoiles.map((item)=>{
								return <StarBorderIcon key={item} style={{fontSize:"0.9rem"}}/>
							})	
						}
					</div>
					</div>
				</div>
				<div className="right">

				<button onClick={discuter.bind(this,nom)}>
						<ForumIcon style={{fontSize:"1.1rem"}}/>
						
					</button>
					
					<button onClick={appeler.bind(this,nom,photo)}>
						<CallIcon style={{fontSize:"1.1rem"}} />
						
					</button>

					
				</div>
			</div>
			
			<div className="bottom" >
			
				{/*<div>
					<p>{course}</p>
					<p>Courses</p>
				</div>
				<div>
					<p>{kilometre}</p>
					<p>Kilometrage</p>
				</div>
				<div>
					<p>{tarif}</p>
					<p>Tarif Moyen</p>
				</div>
				
				<div>
					<p>{conduite}/5</p>
					<p>Conduite</p>
				</div>*/}
			</div>
		</div>
	);
}

export default Driver;