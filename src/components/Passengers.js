import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { selectCourses, selectUsers } from '../features/counterSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {auth,db} from "../firebase_file";
import SearchIcon from '@material-ui/icons/Search';
import Course from './Course';
export default function Passengers() {
  const classes = useStyles();
  const [data,set_data]=useState([]);
  const c=useSelector(selectCourses)
  const users=useSelector(selectUsers);

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

  return (
    <div className={classes.container}>
       {data.length==0 && <h1>Aucune course</h1>}
		{data.length==0 && <p>Aucune course n'est trouvée proche de vous.<br />
		Utilisez la loupe ci-dessus pour faire des recherches.</p>
        }

        {
            data.length>0 && <div>
               {
			   data.map(({key,destination,destination_name,user,price,date,categorie,origin,type,distance,str_date,search})=>{
				let d=new Date(date?.seconds*1000).toUTCString();  
                //let d=str_date
				   d=d.split(" ");
				   d=d[1]+" "+d[2]+" "+d[3];

                  
				   
				   console.log("the date is ",str_date)

				   return <Course 
                   can_detele={false}
				   	key={key}
					destination={destination}
					destination_name={destination_name}
					user={user}
					price={price}
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
						go_to_recherche_pilote(e,key,destination,destination_name,user,price,date,categorie,origin,type,distance,search)
					}}
				   />
				  
				   
			   })
		   }
            </div>
        }
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