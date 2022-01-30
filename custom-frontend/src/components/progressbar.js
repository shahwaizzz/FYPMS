import React from "react";
import Loader from "react-loader-spinner";

export default function Progressbar(props) {
   return (
       <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center',margin:'auto',width:'100%'}}> 
        <Loader type="Puff" color="#097545" height={150} width={150} visible={props.visibility}/>
 </div>
  );
}