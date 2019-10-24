import React from 'react';
import  {firebaseConfig} from  './Components/firebase.js'
import './App.css';
import * as firebase from "firebase";

import {NavBar} from './Components/NavBar'




function App() {
  
  if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }
  

  return (
    
    <div>
      <NavBar/>
    </div>
  )
}

export default App;
