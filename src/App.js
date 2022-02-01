import React from 'react';
import './App.css';
import '@fontsource/roboto';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Driver from "./screens/Driver";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Commander from "./screens/Commander"
import DetailsCommande from "./screens/DetailsCommande";
import Profile from "./screens/Profile";
import Wallet from "./screens/Wallet"
import Discuter from "./screens/Discuter";
import Appeler from "./screens/Appeler";
import Publicite from "./screens/Publicite";
import Recherche from './screens/Recherche';
import Direction from "./screens/Direction";
import RecherchePilote from './screens/RecherchePilote';
import Admin from "./screens/Admin";

import Login2 from "./screens/Login2";

function App() {
  return (
    <Router>
       <Switch>
          <Route path="/" exact >
            <Splash />
          </Route>

          <Route path="/login" exact >
            <Login />
          </Route>

          <Route path="/login2" exact >
            <Login2 />
          </Route>

          <Route path="/register" exact >
            <Register />
          </Route>

          <Route path="/main" exact >
            <Home />
          </Route>


          <Route path="/driver" exact >
            <Driver />
          </Route>
		  
		   <Route path="/commander" exact >
            <Commander />
          </Route>
		  
		   <Route path="/details-commande" exact >
            <DetailsCommande />
          </Route>
		  
		  <Route path="/profile" exact >
            <Profile />
          </Route>
		  
		   <Route path="/wallet" exact >
            <Wallet />
          </Route>
		  
		   <Route path="/discuter" exact >
            <Discuter />
          </Route>
		  
		   <Route path="/appeler" exact >
            <Appeler />
          </Route>

          <Route path="/publicite" exact >
            <Publicite />
          </Route>

          <Route path="/recherche" exact >
            <Recherche />
          </Route>

          <Route path="/direction" exact >
            <Direction />
          </Route>

          <Route path="/recherche_pilote" exact >
            <RecherchePilote />
          </Route>

          <Route path="/admin" exact >
            <Admin />
          </Route>

        </Switch>
    </Router>
    
  );
}

export default App;
