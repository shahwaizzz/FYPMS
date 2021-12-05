import React from "react";
import Loader from "react-loader-spinner";

export default function Progressbar(props) {
   return (
       <div className="progress-bar"> 
        <Loader type="Puff" color="#097545" height={80} width={80} visible={props.visibility}/>
  </div>);
}