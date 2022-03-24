import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { selectCourses, selectUsers,selectDriverLocation,setOpenLocation } from '../features/counterSlice';
import {selectCourse,selectMe,setPilote,setClient,setCommande} from "../features/counterSlice";
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {auth,db} from "../firebase_file";
import SearchIcon from '@material-ui/icons/Search';
import Course from './Course';
import RoomIcon from '@material-ui/icons/Room';
import "../styles/passengers.scss";
import PiloteFound from './PiloteFound';
import BottomSheet from "./BottomSheet";

export default function Passengers() {
  const classes = useStyles();
  const dispatch= useDispatch();

  const [data,set_data]=useState([]);
  const c=useSelector(selectCourses)
  const users=useSelector(selectUsers);
  const location=useSelector(selectDriverLocation);
  const me=useSelector(selectMe);

  const [location_active,set_location_active]=useState(false);
 const [open,set_open]=useState(false);

  useEffect(()=>{
    set_location_active(location);
  },[location]);

  useEffect(()=>{
    const res=users.filter((user)=>{
        return user.email==auth?.currentUser?.email;
    })
    if(res.length==0) return;
    const me=res[0];

    const res2=c.filter((item)=>{
        return me.pilote==item.type.index;
    })

    set_data(res2);
    console.log("courses are",res2)
  },[c,users]);

    const remove_course=async (e,key)=>{
   
    }

    const open_activate_location=()=>{
        dispatch(setOpenLocation(true));
    }

const go_to_recherche_pilote=(e,key,destination,destination_name,user,price,date,categorie,origin,type,distance,search)=>{
   /* const course={
        type,
        origin,
        destination,
        distance,
        destination_name,
        price,
        date,
        search,
        user
    }
    
    dispatch(setCourse(course))
    history.push("/recherche_pilote");*/
}


    const open_bottom=(pilote,course)=>{
        dispatch(setPilote(pilote));
        dispatch(setClient(me));
        dispatch(setCommande(course));
        set_open(true);
    }
    const close_bottom=()=>{
        set_open(false);
        dispatch(setPilote(null));
        dispatch(setClient(null));
    }
    if(location_active==false){
        return(
            <div className="location_off">
                <p>Activez votre localisation géographique pour : </p>
                <ul>
                    <li>Voir les courses</li>
                    <li>Etre visible aux passagers</li>
                </ul>
                <button onClick={open_activate_location}>
                    <RoomIcon style={{fontSize:"1.2re"}}/>
                    Activer ma localisation</button>
            </div>
        )
    }

  return (
    <div className={classes.container}>
       {data.length==0 && <h1>Aucune course</h1>}
		{data.length==0 && <p>Aucune course n'est trouvée proche de vous.<br />
		Utilisez la loupe ci-dessus pour faire des recherches.</p>
        }

        {
            data.length>0 && <div>
               {
			   data.map((course,i)=>{
                   const {key,destination,destination_name,user,price,date,categorie,origin,type
                    ,distance,str_date,search}=course;
				let d=new Date(date?.seconds*1000).toUTCString();  
                //let d=str_date
				   d=d.split(" ");
				   d=d[1]+" "+d[2]+" "+d[3];

                   const res=users.filter((item)=>{
                       return item.email==user;
                   })

                   let user_info=null;
                   if(res.length>0){
                       user_info=res[0];
                   }
                   console.log("the res is ",res);

                  
				   
				   console.log("the date is ",str_date)

				   return <Course 
                   can_detele={false}
				   	key={key}
					destination={destination}
					destination_name={destination_name}
					user={user}
					price={price}
                    user_info={user_info}
					date={date}
					categorie={categorie}
					origin={origin}
					type={type}
					distance={distance}
					str_date={str_date}
					search={search}
					d={d}
					remove_course={e=>remove_course(e,key)}
					go_to_recherche_pilote={e=>{
                        open_bottom(me,course);
						//go_to_recherche_pilote(e,key,destination,destination_name,user,price,date,categorie,origin,type,distance,search)
					}}

                    me={me}
                    course={course}
                    click={open_bottom.bind(this,me,course)}
				   />
				  
				   
			   })
		   }
            </div>
        }

        {open==true && <BottomSheet content={<PiloteFound click={close_bottom} />} />}
    </div>
  );
}

const useStyles = makeStyles({
    container:{
        color:"black",
        padding:"1rem",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        width:"100%",
        "&>div":{
            
            width:"100%",
            flex:1,
        },
		
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