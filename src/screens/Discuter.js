import HeaderBack from "../components/HeaderBack";
import "./discuter.scss";
import SendIcon from '@material-ui/icons/Send';
import {selectDriver} from "../features/counterSlice";
import {useDispatch,useSelector} from "react-redux";
const Discuter=()=>{
	const driver=useSelector(selectDriver);
	return(
		<div className="discuter">
			<HeaderBack title={driver.nom} />
			<div className="messages">
				
			</div>
			
			<div className="zone_saisie">
				<div>
					<input type="text" placeholder="Saisir votre message" />
					<button>
						<SendIcon />
					</button>
				</div>
				
			</div>
		</div>
	);
}

export default Discuter;