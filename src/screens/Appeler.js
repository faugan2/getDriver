import HeaderBack from "../components/HeaderBack";
import {selectDriver} from "../features/counterSlice";
import {useDispatch,useSelector} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import "../styles/appeler.scss";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import img from "../components/img/1.jpg";
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import CallEndIcon from '@material-ui/icons/CallEnd';
import { useHistory } from 'react-router';
import {useEffect} from "react";

const Appeler=()=>{
	const driver=useSelector(selectDriver);
	
	const history=useHistory();
	const go_to_home=()=>{
		history.goBack();
	}
	
	useEffect(()=>{
		if(driver==null){
			history.replace("/");
		}
	},[driver])
	return(
		<div className="appeler">
			
				<div className="top">
					<Avatar src={driver.img} style={{
						width:"120px",
						height:"120px",
					}}/>
					<h2>{driver.nom}</h2>
					<p>Appel en cours...</p>
				</div>
				
				<div className="middle">
					<div>
						<button>
							<VolumeUpIcon/>
						</button>
						<p>Volume</p>
					</div>
					
					<div>
						<button>
							<MicOffIcon />
						</button>
						<p>Mute</p>
					</div>
					
					<div>
						<button>
							<VideocamIcon />
						</button>
						<p>Vidéo</p>
					</div>
				</div>
				
				
				<div className="bottom">
					<button onClick={go_to_home}>
						<CallEndIcon/>
					</button>
				</div>
			
		</div>
	);
}

export default Appeler;