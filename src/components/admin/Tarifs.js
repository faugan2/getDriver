import { useEffect, useState} from "react";
import {auth, db} from "../../firebase_file";
import "./clients.scss"
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Modal from "./Modal";
import AjouterTarif from "./AjouterTarif";
import {types} from "./data";
import DeleteIcon from '@material-ui/icons/Delete';

const Tarifs=()=>{
    const [data,set_data]=useState([]);
    const [data_show,set_data_show]=useState([]);
    const [modal_add,set_modal_add]=useState(false)
    const open_add_modal=()=>{
        set_modal_add(true);
    }
    const close_modal=()=>{
        set_modal_add(false);
    }

    useEffect(()=>{
        db.collection("tarifs").onSnapshot((snap)=>{
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
    },[]);

    const delete_tarif=async (id)=>{
       await db.collection("tarifs").doc(id).delete();
    }
    const [search,set_search]=useState("");
    useEffect(()=>{
        if(search==""){
            set_data_show(data);
            return;
        }

        

        const res=data_show.filter((item)=>{
            return item.nom.toLowerCase().indexOf(search.toLowerCase())>=0
            
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
                <table border={1} width="100%">
                    <thead>
                        <tr>
                            <th width="5%">N°</th>
                            <th style={{textAlign:"left"}}>Type</th>
                            <th width="10%">Frais fixed</th>
                            <th width="10%">Prix unitaire</th>
                            <th width="10%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data_show.map((tarif,index)=>{
                                const type=tarif.type;
                                const frais_fixe=tarif.frais_fixe;
                                const course=tarif.course;
                                return(
                                    <tr key={tarif.key}>
                                        <td align="center">{index+1}</td>
                                        <td>{tarif.nom}</td>
                                        <td align="center">{frais_fixe}</td>
                                        <td align="center">{course}</td>
                                        <td align="center">
                                            <div className="table_actions">
                                                <button  onClick={delete_tarif.bind(this,tarif.key)}>
                                                    <DeleteIcon style={{color:"gray",fontSize:"1.2rem"}}/>
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
                content={<AjouterTarif />} 
            />}
        </div>
    )
}
export default Tarifs;