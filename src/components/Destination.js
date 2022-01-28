import "./destination.scss";
import PlaceIcon from '@material-ui/icons/Place';
const Destination=({nom,quartier,click})=>{
	return(
		<div className="destination" onClick={click.bind(this,nom,quartier)}>
			<button>
				<PlaceIcon />
			</button>
			<div>
				<p>{nom}</p>
				<p>{quartier}</p>
			</div>
		</div>
	);
}

export default Destination;