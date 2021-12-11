import React, { useState } from 'react'
import Dashboard from './dashboard';
import './index.css';
import Login from "./login"

function handleValidation(params) {
  
}
function App() {
  const [validation, setValidation] = useState(true);
  if(validation){
    return (
      <div className="App">
        <Dashboard/>
      </div>
    );
  }else{
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
  
}

export default App;
