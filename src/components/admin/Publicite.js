import { useEffect, useState} from "react";
import {auth, db} from "../../firebase_file";
import "./clients.scss"
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Modal from "./Modal";
import AjouterPublicite from "./AjouterPublicite";
import DeleteIcon from '@material-ui/icons/Delete';

const Publicite=()=>{
    const [data,set_data]=useState([]);
    const [data_show,set_data_show]=useState([])
    const [modal_add,set_modal_add]=useState(false)
    const [search,set_search]=useState("");

    const open_add_modal=()=>{
        set_modal_add(true);
    }
    const close_modal=()=>{
        set_modal_add(false);
    }

    useEffect(()=>{
        db.collection("publicites").onSnapshot((snap)=>{
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

    const delete_pub=async (id)=>{
        await db.collection("publicites").doc(id).delete();
    }

    useEffect(()=>{
        if(search==""){
            set_data_show(data);
            return;
        }

        const res=data_show.filter((item)=>{
            return item.titre.toLowerCase().indexOf(search.toLowerCase())>=0 || 
            item.description.toLowerCase().indexOf(search.toLowerCase())>=0;
        })

        set_data_show(res);
    },[search])

    return (
        <div className="clients">
            <div className="head">
                <div className="search">
                    <input type="text" placeholder="Rechercher" value={search} onChange={e=>set_search(e.target.value)}/>
                    <SearchIcon style={{color:"gray",fontSize:"1.2rem"}} />
                </div>
                <div className="actions">
                    <button onClick={open_add_modal}>
                        <AddIcon  style={{color:"gray",fontSize:"1.2rem"}}/>
                        Ajouter
                    </button>
                </div>
            </div>
            <div className="body">
                <table width="100%" border="1">
                    <thead>
                        <tr>
                            <th width="5%">N°</th>
                            <th style={{textAlign:"left"}}>Titre</th>
                            <th style={{textAlign:"left"}}>Description</th>
                            <th style={{textAlign:"left"}}>Image</th>
                            <th width="10%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data_show.map((pub,index)=>{
                                return(
                                    <tr key={pub.key}>
                                        <td>{index+1}</td>
                                        <td>{pub.titre}</td>
                                        <td>{pub.description}</td>
                                        <td width="10%">
                                            <img src={pub.url} style={{width:"100%",height:"30px",objectFit:"cover"}}/>
                                        </td>
                                        <td>
                                        <div className="table_actions">
                                            <button  onClick={delete_pub.bind(this,pub.key)}>
                                                <DeleteIcon style={{color:"gray",fontSize:"1.2rem"}} />
                                            </button>
                                        </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

            {modal_add==true && <Modal
                width={30} 
                click={close_modal}
                open={true} 
                content={<AjouterPublicite />} 
            />}
        </div>
    )
}
export default Publicite;