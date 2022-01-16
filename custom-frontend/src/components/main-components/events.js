import React, { useEffect, useState } from "react";
import { eventUrl } from "../../apis";
import axios from 'axios';

export default function Events() {
  const [getData, setGetData] = useState(false);
// useEffect(() => {
//   fetch(eventUrl)
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//     setGetData(result.events);
//     console.log(getData);
//   },(error) => {
//       alert(error);
// });
// }, []);
const api = axios.create({
  baseURL : eventUrl
});

useEffect(() => {
api.get("/")
.then(res =>  {setGetData(res.events);console.log(getData)})
.catch(res => {alert(res)})
},[]);
  return (
    <div>
      <button className='btn'>Create Event</button>
      {/* {getData&&getData.} */}
    </div>
  );
}
