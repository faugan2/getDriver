import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useHistory} from "react-router";
import {auth} from "../firebase_file";
import Modal from "../components/admin/Modal";
import MPOublie from "../components/MPOublie";

const Login = () => {
    const classes=useStyles();
    const history=useHistory();
    const [pw_visible,set_pw_visible]=useState(false);
    const [email,set_email]=useState("");
    const [password,set_password]=useState("");
    const [alerte,set_alerte]=useState("");
    

    const go_to_register=()=>{
        history.push("/register");
    }

    const login=async (e)=>{
        const btn=e.target;
        if(email==""){
            set_alerte("Vous devez saisir une adresse mail");
            return;
        }
        if(password==""){
            set_alerte("Vous devez saisir un mot de passe");
            return;
        }
       
        set_alerte("Patientez...");
        btn.disabled=true;
        btn.style.opacity="0.6";
         auth.signInWithEmailAndPassword(email,password)
		 .then((userCredential) => {
			// Signed in 
			history.replace("/");
			// ...
		  })

		 .catch((err)=>{
            set_alerte(err.message);
            btn.disabled=false;
            btn.style.opacity=1;
        });
       
    }

    const mot_de_passe_oublier=()=>{
        set_open(true)
    }
    const [open,set_open]=useState(false);
    const close_modal=()=>{
        
        set_open(false);
    }
    return (
        <div className={classes.container}>

           {open==true && <Modal
                open={true}
                click={close_modal}
                content={<MPOublie />}
            />
           }
           <div style={{
               marginTop:"10%",
               width:"80%", 
               display:"flex",
               flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            fontSize:"0.8rem"
        }}>
                <h1>Se connecter</h1>
                <div>
                    <TextField 
                       type="email"
                        label="Votre email"
                        value={email}
                        onChange={e=>set_email(e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                            </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div>
                    <TextField 
                        type={pw_visible==true?"text":"password"}
                        label="Mot de passe"
                        value={password}
                        onChange={e=>set_password(e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <LockOpenIcon style={{color:"gray",fontSize:"1.2rem"}} />
                            </InputAdornment>
                            ),

                            endAdornment: (
                                <InputAdornment position="end" onClick={e=>set_pw_visible(!pw_visible)}>
                                    {pw_visible==false && <VisibilityOff style={{color:"gray",fontSize:"1.2rem"}}/>}
                                    {pw_visible==true && <Visibility style={{color:"gray",fontSize:"1.2rem"}}/>}
                                </InputAdornment>
                                ),
                        }}
                    />
                </div>

                <button style={{
                    alignSelf:"flex-end",
                    marginTop:"0.5rem",
                    marginRight:"0.5rem",
                    border:"none",
                    backgroundColor:"whitesmoke",
                    fontSize:"0.8rem",
                    opacity:0.6,
                    cursor:"pointer"
                }}
                    onClick={mot_de_passe_oublier}
                >
                        Mot de passe oublié ?
                </button>

                <div>
                    <button onClick={login} style={{fontSize:"0.8rem"}}>LOGIN</button>
                </div>

               
                <p style={{marginTop:"0.7rem",color:"indianred"}}>{alerte}</p>

                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    marginTop:"3rem",
                    fontSize:"0.8rem",
                    
                }}>
                    <p>Pas encore inscrit ?</p>
                    <a style={{
                        color:"#3f51b5",
                        fontWeight:"500",
                        padding:"1rem 0",
                        cursor:"pointer"
                    }}
                    onClick={go_to_register}
                    >Créez un compte</a>
                </div>
               
      
            </div>
        </div>
    )
}

export default Login




const useStyles = makeStyles((theme) => ({
    
    container:{
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        textAlign:"center",
		backgroundColor:"whitesmoke",
        "& > div > h1":{
            color:"black",
			fontSize:"1.1rem"
        },
        "& > div > div":{
            
            width:"70vw",
            marginTop:"1.2rem",
            "&>*":{
                width:"100%"
            },
            "& > button":{
                padding:"0.6rem",
                border:"1px solid silver",
                outline:"none",
                cursor:"pointer",
                backgroundColor:"white",
                
				borderRadius:"5px",
                color:"black",
                fontWeight:"bold",
                fontSize:"1rem"
            }
        }
    }
  }));