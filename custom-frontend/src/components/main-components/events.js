import React, { useEffect, useState } from "react";
import { eventUrl } from "../../apis";
import axios from "axios";

export default function Events() {
  const [getData, setGetData] = useState(false);
  const api = axios.create({
    baseURL: `http://localhost:3000/api/v1/pmo/events`,
  });

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        console.log(res.data);
        setGetData(res.data.events);
      })
      .catch((res) => {
        alert(res);
      });
  }, []);

  return (
    <div>
      <h1>Events</h1>
      {getData && getData.map((e) => <h1>{e.name}</h1>)}
    </div>
  );
}
