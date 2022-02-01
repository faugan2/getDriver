import { useEffect, useState} from "react";
import {auth, db} from "../../firebase_file";
import "./clients.scss"
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from "./Modal";
import AjouterClient from "./AjouterClient";
import { setAdminSoldeClient,selectAdminSoldeClient, setAdminClient, setAdminClients } from "../../features/counterSlice";
import {useDispatch,useSelector} from "react-redux";
import SoldeClient from "./SoldeClient";
const Clients=()=>{
    const [data,setData]=useState([]);
    const [data_show,set_data_show]=useState([]);
    const dispatch= useDispatch();
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
            dispatch(setAdminClients(d))
            console.log(d);
        })
    },[]);

    const [modal_add,set_modal_add]=useState(false)
    const open_add_modal=()=>{
        set_modal_add(true);
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

    useEffect(()=>{
        
        db.collection("argent").onSnapshot((snap)=>{
            const d=[];
            snap.docs.map((doc)=>{
                const key=doc.id;
                const data=doc.data();
                data.key=key;
                d.push(data);
            })

            dispatch(setAdminSoldeClient(d));
        })
    },[])

    const soldes=useSelector(selectAdminSoldeClient);

    useEffect(()=>{
        if(data_show.length==0 || soldes.length==0) return;
        setTimeout(()=>{
            const tds=document.querySelectorAll(".solde");
        for(var i=0; i<tds.length; i++){
            const td=tds[i];
            const key=td.dataset.key;
            const email=td.dataset.email

            set_solde(soldes,key,email,td);
            
        }
        },5000);
        
    },[data_show,soldes])

    const set_solde=(soldes,key,email,td)=>{
        const res=soldes.filter((solde)=>{
            return solde.email==email;
        });
        var total=0;
        for(var j=0; j<res.length; j++){
            let t=parseFloat(res[j].montant);
            total+=t;
            console.log(t);
        }
        td.innerHTML=total;
    }

    const solde_client=(e)=>{
        const el=e.target;
        const key=el.dataset.key;
        const email=el.dataset.email;
        const type=el.dataset.type;
        dispatch(setAdminClient(key))
        set_open_solde(true);
    }

    const [open_solde,set_open_solde]=useState(false);
    const close_modal=()=>{
        set_open_solde(false);
    }

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
                            <th width="10%">Poto</th>
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
                                    <tr key={user.key}>
                                        <td align="center">{date}</td>
                                        <td>{nom}</td>
                                        <td>{user.email}</td>
                                        <td 
                                        align="center" 
                                        className="solde" 
                                        data-key={user.key} 
                                        data-email={user.email}
                                        data-type={user.type}
                                        onClick={solde_client}
                                        style={{cursor:"pointer"}}
                                        ></td>
                                        <td></td>
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

            {open_solde==true && <Modal 
                width={30}
                click={close_modal}
                open={true} 
                content={<SoldeClient />} 
            />}
        </div>
    )
}
export default Clients;