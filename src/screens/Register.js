import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useHistory} from "react-router";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import firebase from "firebase";
import {auth,db} from "../firebase_file";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
const Register = () => {
    const classes=useStyles();
    const history=useHistory();
    const [pw_visible,set_pw_visible]=useState(false);
    const [pw_visible2,set_pw_visible2]=useState(false);
    const [nom,set_nom]=useState("");
    const [email,set_email]=useState("");
    const [password,set_password]=useState("");
    const [password2,set_password2]=useState("");
    const [type,set_type]=useState(1);
    const [alerte,set_alerte]=useState("");

    const go_to_login=()=>{
        history.push("/login");
    }

    const register=async (e)=>{
        const btn=e.target;
        if(nom==""){
            set_alerte("Vous devez saisir un nom");
            return;
        }
        if(email==""){
            set_alerte("Vous devez saisir une adresse mail");
            return;
        }
        if(password==""){
            set_alerte("Vous devez saisir un mot de passe");
            return;
        }

        if(password2==""){
            set_alerte("Vous devez saisir un mot de passe de confirmation");
            return;
        }

        if(password!=password2){
            set_alerte("Les mots de passe ne sont pas conformes");
            return;
        }
        set_alerte("Patientez...");
        btn.disabled=true;
        btn.style.opacity="0.6";
       
        const user={nom,email,password,type,date:firebase.firestore.FieldValue.serverTimestamp()};

        auth.createUserWithEmailAndPassword(email,password).then(async (res)=>{
            await db.collection("users").add(user);
            await db.collection("argent").add({email,montant:2000,date:firebase.firestore.FieldValue.serverTimestamp(),type:1})
            
          //await addDoc(collection(db,"users"),user);
          auth.currentUser.updateProfile({
              displayName:nom
          }).then(()=>{
              history.replace("/");
          }).catch((err)=>{
              console.log("error updating the profile ",err.message);
          })
        }).catch((err)=>{
            set_alerte(err.message);
            btn.disabled=false;
            btn.style.opacity=1;
        })

        
    }
    return (
        <div className={classes.container}>
           <div style={{marginTop:"10%",
           
           width:"80%",
           display:"flex",
           justifyContent:"center",
           alignItems:"center",
           flexDirection:"column",
           
           backgroundColor:"whitesmoke",
           fontSize:"0.8rem",
           }}>
                <h1>Créer un compte</h1>

                <div>
                    <TextField 
                       type="text"
                        label="Votre nom"
                        value={nom}
                        onChange={e=>set_nom(e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <AssignmentIndIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                            </InputAdornment>
                            ),
                        }}
                    />
                </div>
                
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
                                <LockOpenIcon style={{color:"gray",fontSize:"1.2rem"}}/>
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

                <div>
                    <TextField 
                        type={pw_visible2==true?"text":"password"}
                        label="Confirmez le mot de passe"
                        value={password2}
                        onChange={e=>set_password2(e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <LockOpenIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                            </InputAdornment>
                            ),

                            endAdornment: (
                                <InputAdornment position="end" onClick={e=>set_pw_visible2(!pw_visible2)}>
                                    {pw_visible2==false && <VisibilityOff style={{color:"gray",fontSize:"1.2rem"}}/>}
                                    {pw_visible2==true && <Visibility style={{color:"gray",fontSize:"1.2rem"}}/>}
                                </InputAdornment>
                                ),
                        }}
                    />
                </div>
                <div style={{display:"none"}}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Type d'utilisateur</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        onChange={e=>set_type(e.target.value)}
                    >
                        <MenuItem value={1}>Je suis un passager</MenuItem>
                        <MenuItem value={2}>Je suis un chauffeur</MenuItem>
                        
                    </Select>
                    </FormControl>
                </div>

                <div>
                    <button onClick={register} style={{fontSize:"0.8rem"}}>VALIDER</button>
                </div>

                <p style={{marginTop:"0.8rem",color:"indianred"}}>{alerte}</p>

                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    marginTop:"3rem",
                    fontSize:"0.8rem",
                    
                }}>
                    <p>Déjà inscrit ?</p>
                    <a style={{
                        color:"#3f51b5",
                        fontWeight:"500",
                        padding:"1rem 0",
                        cursor:"pointer",
                        
                    }}
                    onClick={go_to_login}
                    >Se connecter</a>
                </div>
               
      
            </div>
        </div>
    )
}

export default Register




const useStyles = makeStyles((theme) => ({
    
    container:{
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
		backgroundColor:"whitesmoke",
        textAlign:"center",
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
                color:"black",
                fontWeight:"bold",
                fontSize:"1rem",
				borderRadius:"5px",
            }
        }
    }
  }));