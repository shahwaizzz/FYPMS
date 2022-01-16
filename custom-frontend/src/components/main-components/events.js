import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Events() {
  const [getData, setGetData] = useState(false);
  //   const [getEvents, setGetEvents] = useState(false);
  //   const url = "http://localhost:3000/api/v1/pmo/events";
  //   const api = axios.create({
  //     baseURL: "http://localhost:3000/api/v1/pmo/events",
  //   });
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/pmo/events")
      .then((res) => res.json())
      .then((resp) => {
        setGetData(resp.events);
        console.log(getData);
      })
      .catch((err) => console.log(err));
  });
  //   useEffect(() => {
  //     api
  //       .get("/")
  //       .then((res) => {
  //         setGetEvents(res.events);
  //       })
  //       .catch((res) => {
  //         alert(res);
  //       });
  //   }, []);

  return (
    <div>
      <button className='btn'>Create Event</button>
      <br />
      {getData.map((e) => {
        <h4>{e.name}</h4>;
      })}
      al
    </div>
  );
}
