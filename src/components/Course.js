import {taxi, vehicule_leger, vehicule_lourd,bus} from "./img";
import {makeStyles} from '@material-ui/core/styles';
import {types} from "./admin/data";

import DeleteIcon from '@material-ui/icons/Delete';
const Course=({go_to_recherche_pilote,key,d,destination,destination_name,user,price,date,categorie,origin,type,distance,search,remove_course,can_delete})=>{
    const styles=useStyles();
    return(
        <div className={styles.course} onClick={go_to_recherche_pilote}>
        
          {can_delete ==true &&   <button style={{
                position:"absolute",
                right:"0rem",
                top:"0rem",
                
                height:"1.5rem",
                border:"none",
                background:"none",
                color:"gray",
                display:"flex",
                
            }}
            onClick={remove_course}
            >
                <p style={{color:"gray",fontSize:"0.7rem",display:"none"}} id={`payienter_${key}`}>patientez...</p>
                <DeleteIcon style={{fontSize:"1rem"}} />
                
            </button>}
            <div className={styles.course_top}>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                }}>
                    
                {type.index==1 && <img src={taxi} style={{width:30,height:30,resize:"contain",borderRadius:"50%"}}/>} 
                {type.index==2 && <img src={vehicule_leger} style={{width:25,height:25,resize:"contain",borderRadius:"50%"}}/>} 
                {type.index==3 && <img src={vehicule_lourd} style={{width:30,height:30,resize:"contain",borderRadius:"50%"}}/>} 
                {type.index==4 &&<img src={bus} style={{width:25,height:25,resize:"contain",borderRadius:"50%"}}/>} 
                    
                </div>
                <div style={{marginLeft:"0.5rem"}}>
                    <p style={{
                        fontSize:"0.7rem",
                        fontWeight:"bold",
                    }}>{destination_name}
                    </p>
                    <p style={{
                        fontSize:"0.7rem",
                        color:"gray",
                    }}>
                        {type.name}
                    </p>

                    
                </div>
            </div>
            
            
            
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItmes:"center",
                fontSize: "0.7rem"
                }}
                className="historique_bottom"
                >
                <div>
                    <p>Date</p>
                    <p>{d}</p>
                </div>
                <div>
                    <p>Km</p>
                    <p>{distance}</p>
                </div>
                <div>
                    <p>Prix</p>
                    <p>{price.total} CFA</p>
                </div>
                <div>
                    <p style={{textAlign:"center"}}>Etat</p>
                    <p>En cours</p>
                </div>
            </div>
            
            
        </div>
   )};



   const useStyles = makeStyles({
    container:{
        color:"black",
        padding:"1rem",
        display:"flex",
        flexDirection:"column",
        
        
		
        gap:"1rem",
		
		
        "& > h1":{
            fontSize:"0.8rem",
			marginBottom:"1rem",
			textAlign:"center",
        },
        "& > p":{
            fontSize:"0.8rem",
			textAlign:"center",
        },
        " & > button":{
            width:"100%",
            padding:"1rem",
            border:"none",
            outline:"none",
            backgroundColor:"white",
            color:"black",
            fontWeight:"bold",
			marginBottom:"2rem",
			marginTop:"2rem",
			borderRadius:"5px",
        },
        "& > .p_last":{
            color:"gray",
        }
    },
	
	course:{
		backgroundColor:"white",
		padding:"1rem",
		position:"relative",
		marginBottom:"1rem",

		"&:last-child":{
			
			marginBottom:"4rem"
		}
	},
	
	course_top:{
		display:"flex",
		alignItems:"center",
	}
})


export default Course;