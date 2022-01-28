import { useEffect, useState} from "react";
import {auth, db} from "../../firebase_file";
import "./clients.scss"
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Modal from "./Modal";
import AjouterTarif from "./AjouterTarif";

const Tarifs=()=>{
    const [data,setData]=useState([]);
    const [modal_add,set_modal_add]=useState(false)
    const open_add_modal=()=>{
        set_modal_add(true);
    }
    const close_modal=()=>{
        set_modal_add(false);
    }
    return (
        <div className="clients">
            <div className="head">
                <div className="search">
                    <input type="text" placeholder="Rechercher" />
                    <SearchIcon style={{color:"gray",fontSize:"1.2rem"}} />
                </div>
                <div className="actions">
                    <button onClick={open_add_modal}>
                        <AddIcon  style={{color:"gray",fontSize:"1.2rem"}}/>
                        Ajouter
                    </button>
                </div>
            </div>
            <div className="body"></div>

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