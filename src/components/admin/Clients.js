import { useEffect, useState} from "react";
import {auth, db} from "../../firebase_file";
import "./clients.scss"
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from "./Modal";
import AjouterClient from "./AjouterClient";

const Clients=()=>{
    const [data,setData]=useState([]);
    const [data_show,set_data_show]=useState([]);
    useEffect(()=>{
        db.collection("users").where("type","==",1).onSnapshot((snap)=>{
            const d=[];
            snap.docs.map( (doc)=>{
                const key=doc.id;
                const data=doc.data();
                const email=data.email;
               
                let solde=2000;
                
                data.key=key;
                data.solde=solde;
                d.push(data);
            })
            setData(d);
            console.log(d);
        })
    },[]);

    const [modal_add,set_modal_add]=useState(false)
    const open_add_modal=()=>{
        set_modal_add(true);
    }
    const close_modal=()=>{
        set_modal_add(false);
    }

    const delete_user=async(id)=>{
        await db.collection("users").doc(id).delete();
    }

    useEffect(()=>{
        set_data_show(data);
    },[data]);

    const [search,set_search]=useState("");
    useEffect(()=>{
        if(search==""){
            set_data_show(data);
            return;
        }

        

        const res=data_show.filter((item)=>{
            return item.nom.toLowerCase().indexOf(search.toLowerCase())>=0 || 
            item.email.toLowerCase().indexOf(search.toLowerCase())>=0;
        })

        set_data_show(res);
    },[search])

    return (
        <div className="clients">
            <div className="head">
                <div className="search">
                    <input type="text" placeholder="Rechercher" value={search} onChange={e=>set_search(e.target.value)} />
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
                <table border="1" width="100%">
                    <thead>
                        <tr>
                            <th width="10%">Date</th>
                            <th width="35%" style={{textAlign:"left"}}>Nom</th>
                            <th width="35%" style={{textAlign:"left"}}>Email</th>
                            <th width="10%">Solde</th>
                            <th width="10%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data_show.map((user)=>{
                                let date=new Date(user.date?.seconds*1000).toUTCString();
                                date=date.split(" ");
                                date=date[1]+" "+date[2]+" "+date[3];

                                let nom=user.nom;

                                return(
                                    <tr>
                                        <td align="center">{date}</td>
                                        <td>{nom}</td>
                                        <td>{user.email}</td>
                                        <td align="center">{user.solde}</td>
                                        <td align="center">
                                            <div className="table_actions">
                                                <button onClick={delete_user.bind(this,user.key)}>
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
                content={<AjouterClient />} 
            />}
        </div>
    )
}
export default Clients;