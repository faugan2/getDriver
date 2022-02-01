import "./sai.scss";
import RoomIcon from '@material-ui/icons/Room';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
const Sai=()=>{
    return(
        <div className="sai">
           <div className="nom">Service Afrique International</div>
           <div className="adresse">
               <RoomIcon style={{color:"gray",fontSize:"1.2rem"}} />
               Adidogomé Yokoe, non loin de xBar</div>
           <div className="telephone">
               <CallIcon style={{color:"gray",fontSize:"1.2rem"}}/>
               +228 91 56 75 90</div>
           <div className="email">
               <EmailIcon style={{color:"gray",fontSize:"1.2rem"}}/>
               serviceafriqueinternational@gmail.com</div>
        </div>
    );
}

export default Sai;