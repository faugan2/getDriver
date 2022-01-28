import { useEffect, useState} from "react";
import {auth, db} from "../../firebase_file";
import "./clients.scss"
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
const Courses=()=>{
    const [data,set_data]=useState([]);
    const [data_show,set_data_show]=useState([]);
    const [search,set_search]=useState("");

    useEffect(()=>{
        db.collection("courses").onSnapshot((snap)=>{
            const d=[];
            snap.docs.map((doc)=>{
                const key=doc.id;
                const data=doc.data();
                data.key=key;
                d.push(data);
            })
            set_data(d);
            set_data_show(d);
        })
    },[])


    return (
        <div className="clients">
            <div className="head">
                <div className="search">
                    <input type="text" placeholder="Rechercher" value={search} onChange={e=>set_search(e.target.value)}/>
                    <SearchIcon style={{color:"gray",fontSize:"1.2rem"}} />
                </div>
                <div className="actions">
                    <button style={{display:"none"}}>
                        <AddIcon  style={{color:"gray",fontSize:"1.2rem"}}/>
                        Ajouter
                    </button>
                </div>
            </div>
            <div className="body">
                <table border={1} width="100%">
                    <thead>
                        <tr>
                            <th width="10%" style={{textAlign:"left"}}>Date</th>
                            <th style={{textAlign:"left"}}>Client</th>
                            <th style={{textAlign:"left"}}>Depart</th>
                            <th style={{textAlign:"left"}}>Destination</th>
                            <th width="5%">Km</th>
                            <th width="8%">Prix</th>
                            <th style={{textAlign:"left"}}>Pilote</th>
                            <th width="10%">Etat</th>
                           
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data_show.map((user)=>{
                                let date=new Date(user.date?.seconds*1000).toUTCString();
                                date=date.split(" ");
                                date=date[1]+" "+date[2]+" "+date[3];
                                const lat=user.origin.lat;
                                const lng=user.origin.lng;
                                const destination_name=user.destination_name;
                                return(
                                    <tr>
                                        <td>{date}</td>
                                        <td>{user.user}</td>
                                        <td>{lat}  {lng}</td>
                                        <td>{destination_name}</td>
                                        <td align="center">{user.distance}</td>
                                        <td align="center">{user.price.total}</td>
                                        <td>-</td>
                                        <td align="center">en cours</td>
                                        
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Courses;