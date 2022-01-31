import React, { useEffect, useState } from "react";
import { getstdmarks } from "../../../apis";
import axios from "axios";
import { AiOutlineBook, AiOutlineProject } from 'react-icons/ai'
import { MdOutlineEmojiEvents, MdOutlineSupervisedUserCircle } from 'react-icons/md'
import {FaHighlighter} from 'react-icons/fa'
import {erroralert} from '../../../components/alert'


const Marks = () => {
  const std = localStorage.getItem("student");

  const [marks,setmarks] = useState()

  useEffect(() => {
    const stdmarks = async () => {
      const options = {
        method: "GET",
        headers: { 'Content-Type': 'application/json'},
        url: getstdmarks(JSON.parse(std).userId),
      };

      try {
        const response = await axios(options);
        setmarks(response.data.marks[0].marks)

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
                <p>Total Marks {marks?.proposal ? marks?.proposal : '(not yet assigned)'}</p>
            </div>
            <div className="home-box">
                <FaHighlighter size="4rem" />
                <h2>Mid Marks</h2>
                <p>Total Marks {marks?.mid ? marks?.mid : '(not yet assigned)'}</p>
            </div>
            <div className="home-box">
                <FaHighlighter size="4rem" />
                <h2>Final Marks</h2>
                <p>Total Marks {marks?.final ? marks?.final : '(not yet assigned)'}</p>
            </div>
            <div className="home-box">
                <FaHighlighter size="4rem" />
                <h2>Supervisor Marks</h2>
                <p>Total Marks {marks?.supervisor ? marks?.supervisor : '(not yet assigned)'}</p>
            </div>
      </div>
    </>
  );
};

export default Marks;
