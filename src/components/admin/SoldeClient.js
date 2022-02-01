import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {selectAdminClient,selectAdminSoldeClient,selectAdminClients} from "../../features/counterSlice";
import "./solde_client.scss";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {db} from "../../firebase_file";
import firebase from "firebase";

const SoldeClient=()=>{
    const key=useSelector(selectAdminClient);
    const soldes=useSelector(selectAdminSoldeClient);
    const clients=useSelector(selectAdminClients);

    const [solde,set_solde]=useState(0);
    const [alerte,set_alerte]=useState("");
    const [ajouter,set_ajouter]=useState("");

    useEffect(()=>{
        const client=clients.filter((item)=>{
            return item.key==key;
        })[0];
        const email=client.email;

        let total=0;

        const res=soldes.filter((item)=>{
            return item.email==email;
        })

        for(var i=0; i<res.length; i++){
            const m=parseFloat(res[i].montant);
            total+=m;
        }

        set_solde(total);
        
    },[soldes,clients,key]);

    const valider=(e)=>{
        if(ajouter==""){
            set_alerte("Le montant est vide");
            return;
        }

        const client=clients.filter((item)=>{
            return item.key==key;
        })[0]

        const type=client.type;
        const email=client.email;
        const argent={
            type,
            montant:ajouter,
            email,
            date:firebase.firestore.FieldValue.serverTimestamp(),
        }
        const btn=e.target;
        btn.disabled=true;
        set_alerte("Patientez...");

        db.collection("argent").add(argent).then(()=>{
            btn.disabled=false;
            btn.innerHTML="Valider";
            set_alerte("Solde bien modifié");
            setTimeout(()=>{
                set_alerte("");
            },3000)
        }).catch((err)=>{
            btn.disabled=false;
            btn.innerHTML="Valider";
            set_alerte(err.message);
            setTimeout(()=>{
                set_alerte("");
            },3000)
        })
    }

    return(
        <div className="solde_client">
            <div className="top">
                <p>{solde}</p>
                <p>Solde</p>
            </div>

            <div className="bottom">
                
                <div className="line">
                   
                    <div>
                        <input type="text" placeholder="Modifier le solde" 
                        value={ajouter} onChange={e=>set_ajouter(e.target.value)}
                        />
                        <AttachMoneyIcon  style={{color:"gray",fontSize:"1.2rem"}} />
                    </div>
                </div>

                <div className="line">
                    <button onClick={valider}>Valider</button>
                </div>

                {alerte!="" && <div className="line">
                    <p>{alerte}</p>
                </div>
                }
            </div>

            <div className="footer">
                <p>
                    NB: le montant peut être positif(ex:500) ou négatif (ex:-500)
                </p>
            </div>
        </div>
    )
}

export default SoldeClient;