import React, { useEffect, useState } from "react";
import { eventUrl } from "../../apis";
import axios from 'axios';

export default function Events() {
  const [getData, setGetData] = useState(false);
const api = axios.create({
  baseURL : eventUrl
});

useEffect(() => {
api.get("/")
.then(res =>  {setGetData(res.data.events)})
.catch(res => {alert(res)})
},[]);
  return (
    <div>
      <button className='btn'>Create Event</button>
     {getData&&getData.map(e=>(
       <h1>{e.name}</h1>
     ))} 
    </div>
  );
}
