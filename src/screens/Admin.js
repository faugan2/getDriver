import "./admin.scss";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import {useState,useEffect} from "react";

import Clients from "../components/admin/Clients";
import Pilotes from "../components/admin/Pilotes";
import Courses from "../components/admin/Courses";
import Tarifs from "../components/admin/Tarifs";

import Publicite from "../components/admin/Publicite";

const Admin=()=>{

    const [page,set_page]=useState(1);
    const change_page=(e,index)=>{
        set_page(index);
        const btn=e.target;
        const btns=document.querySelectorAll(".btn_option");
        btns.forEach((b)=>{
            b.classList.remove("active");
        })
        btn.classList.add("active")

    }
    return (
        <div className="admin">

            <div className="left">
                <button onClick={e=>{change_page(e,1)}} className="btn_option active">
                    <PeopleOutlineIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    Clients
                </button>
                <button  onClick={e=>{change_page(e,2)}} className="btn_option">
                    <DriveEtaIcon  style={{color:"gray",fontSize:"1.2rem"}} />
                    Pilotes
                </button>
                <button  onClick={e=>{change_page(e,3)}} className="btn_option">
                    <ShoppingCartIcon  style={{color:"gray",fontSize:"1.2rem"}} />
                    Courses
                </button>
                <button  onClick={e=>{change_page(e,4)}} className="btn_option">
                    <MonetizationOnIcon  style={{color:"gray",fontSize:"1.2rem"}}/>
                    Tarifs
                </button>
                <button  onClick={e=>{change_page(e,5)}} className="btn_option">
                    <ViewCarouselIcon  style={{color:"gray",fontSize:"1.2rem"}} />
                    Publicité
                </button>
               
            </div>
            <div className="right">
                {page==1 && <Clients />}
                {page==2 && <Pilotes />}
                {page==3 && <Courses />}
                {page==4 && <Tarifs />}
                {page==5 && <Publicite />}
            </div>

        </div>
    );
}

export default Admin;
