import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router";
import Avatar from '@material-ui/core/Avatar';
import CallIcon from '@material-ui/icons/Call';
const Driver=()=>{
    const styles=useStyles();
    const history=useHistory();
    const go_back=()=>{
        history.replace("/");
    }
    return(
        <div className={styles.driver}>
            <div className="header">
                <button onClick={go_back}><ArrowBackIcon /></button>
                <p>Faugan</p>
            </div>
            <div className="body">
                <div className="top">
                    <Avatar alt="Bidi Faugan" src="1.jpg" />
                    <p>Bidi Faugan</p>
                    <div>
                        <div>
                            <p>100</p>
                            <p>Courses</p>
                        </div>
                        <div className={styles.btn_actions}>
                            <button >
                                <CallIcon /> Applez
                            </button>
                        </div>
                        <div>
                            <p>1200</p>
                            <p>KM</p>
                        </div>
                    </div>
                </div>

               
            </div>
        </div>
    );
}

export default Driver;

const useStyles = makeStyles({
    driver:{
        "& > .header":{
            backgroundColor:"#3f51b5",
            color:"white",
            display:"flex",
            alignItems:"center",
            padding:"1rem",
            "& > button":{
                padding:"0 0.5rem",
                backgroundColor:"transparent",
                border:"none",
                color:"white",
                cursor:"pointer"
            }
        },
        "& > .body":{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
        },
        "& > .body > .top":{
            display:"flex",
            alignItems:"center",
            flexDirection:"column",
            flex:1,
            padding:"1rem",

            "& > .MuiAvatar-root":{
                width:"10rem",
                height:"10rem"
            },
            "& > p":{
                fontWeight:"bold"
            },

            "& > div":{
                display:"flex",
                width:"100%",
                alignItems:"center",
                justifyContent:"center",
                gap:"1rem",
                
                "& > div":{
                    flex:"1",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"center",
                    padding:"1rem",
                    " & > p:first-child":{
                        color:"black",
                        fontWeight:"bold",
                        fontSize:"2rem"
                    },
                    " & > p:last-child":{
                        color:"gray",
                        fontSize:"1rem"
                    },

                    

                }
            }
        },

        "& > .body > .content":{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            
        }
    },
    btn_actions:{
        position:"absolute",
        marginTop:"8rem",
        "& > button":{
            backgroundColor:"whitesmoke",
            width:"70vw",
            padding:"1rem",
            border:"none",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:"1rem",
            borderRadius:"0.2rem",
            backgroundColor:"#3f51b5",
            color:"white",
            fontWeight:"bold",
            opacity:0.8,
            cursor:"pointer",
            fontSize:"1.2rem",
        }
    }
})