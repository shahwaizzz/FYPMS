import React, { useEffect, useState } from "react";
import { getstdmarks } from "../../../apis";
import axios from "axios";
import { AiOutlineBook, AiOutlineProject } from 'react-icons/ai'
import { MdOutlineEmojiEvents, MdOutlineSupervisedUserCircle } from 'react-icons/md'
import {FaHighlighter} from 'react-icons/fa'


const Marks = () => {
  const token = localStorage.getItem("stdtoken");

  useEffect(() => {
    const stdmarks = async () => {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        url: getstdmarks,
      };

      try {
        const response = await axios(options);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    stdmarks();

    return stdmarks;
  });

  return (
    <>
      
      <div className="home">
      <div className="home-box">
                <FaHighlighter size="4rem" />
                <h2>Proposal Marks</h2>
                <p>Total Marks </p>
            </div>
            <div className="home-box">
                <FaHighlighter size="4rem" />
                <h2>Mid Marks</h2>
                <p>Total Marks </p>
            </div>
            <div className="home-box">
                <FaHighlighter size="4rem" />
                <h2>Final Marks</h2>
                <p>Total Marks </p>
            </div>
            <div className="home-box">
                <FaHighlighter size="4rem" />
                <h2>Supervisor Marks</h2>
                <p>Total Marks 0</p>
            </div>
      </div>
    </>
  );
};

export default Marks;
