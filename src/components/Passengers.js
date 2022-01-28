import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';


export default function Passengers() {
  const classes = useStyles();
  const [data,setData]=useState([1,2,3,4,5,6,7,8,9,10])

  return (
    <List className={classes.root}>
        {
            data.map((el,index)=>{
                let img="1.jpg";
                if(index%2==0){
                    img="2.jpg";
                }
                if(index%3==0){
                    img="3.jpg";
                }
                return(
                    <ListItem key={index}>
                        <ListItemAvatar>
                        <Avatar style={{width:"3.2rem",height:"3.2rem"}} src={img}></Avatar>
                        </ListItemAvatar>
                       
                        <ListItemText primary="Bidi fogan" secondary={
                            <span className={classes.details}>
                                <span>Adigogome - Tokoin</span>
                                <span>2km</span>
                                <span>2000 Fr</span>
                            </span>
                        } />
                            
                    </ListItem>
                );
            })
        }
      
      
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    details:{
        display:"flex",
        justifyContent:"flex-start",
        gap:"1rem",
        alignItems:"center",
        
    }
  }));
