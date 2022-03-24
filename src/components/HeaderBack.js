
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {selectTab,setTab,selectUsers, setMe,selectMe,selectLoading} from "../features/counterSlice";
import { useHistory } from 'react-router';
import "../styles/headerback.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const HeaderBack =({title})=>{
	const history=useHistory();
	const go_back=()=>{
		history.goBack();
	}
	
	 const m=useSelector(selectMe)
  const loading=useSelector(selectLoading);
  
  useEffect(()=>{
	if(m==null && loading==false){
		history.replace("/");
	}
},[m,loading])

	
	return(
		<div className="headerback">
			<button onClick={go_back}>
			<ArrowBackIcon style={{color:"white"}}/>
			</button>
			{title}
		</div>
	);
}

export default HeaderBack;