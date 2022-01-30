import React,{ useState, useEffect} from 'react'
import axios from 'axios'
import { AiOutlineBook, AiOutlineProject } from 'react-icons/ai'
import { MdOutlineEmojiEvents, MdOutlineSupervisedUserCircle } from 'react-icons/md'
import {FaHighlighter} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {students,supervisorsUrl,eventUrl,projectUrl} from '../../../../src/apis'

export default function Home({admin,supervisor,student}) {

    const [projectlength,setprojectlength] = useState(0)
    const [studentslength,setstudentlength] = useState(0)
    const [supervisorlength,setsupervisorlength] = useState(0)


    useEffect(() => {
      axios.get(students).then((res) => {
        console.log(res.data)
        setstudentlength(res.data.length)
      }).catch(err => {
          console.log(err)
      })
    },[])
    useEffect(() => {
        axios.get(supervisorsUrl).then((res) => {
            console.log(res.data)
            setsupervisorlength(res.data.supervisor.length)
          }).catch(err => {
              console.log(err)
          })
    },[])
    useEffect(() => {
        axios.get(projectUrl).then((res) => {
            console.log(res.data)
            setprojectlength(res.data.projects.length)
          }).catch(err => {
              console.log(err)
          })
    },[])

    return (
        <div className="home">
            {admin && (
                <>
                <div className="home-box">
            <Link to="/pmo/projects">
                <AiOutlineProject size="4rem" color="green"/>
            </Link>
                <h2>Manage Projects</h2>
                <p>Total Projects {projectlength}</p>
            </div>
            <div className="home-box">
            <Link to="/pmo/students">
                <AiOutlineBook size="4rem" color="green"/>
            </Link>
                <h2>Mange Student</h2>
                <p>Total Students {studentslength}</p>
            </div>
            <div className="home-box">
            <Link to="/pmo/supervisors">
                <MdOutlineSupervisedUserCircle size="4rem" color="green"/>
            </Link>
                <h2>Manage Supervisors</h2>
                <p>Total Supervisors {supervisorlength}</p>
            </div>
            <div className="home-box">
            <Link to="/pmo/events">
                <MdOutlineEmojiEvents size="4rem" color="green"/>
            </Link>
                <h2>Create Event</h2>
                <p>Coming Events 0</p>
            </div>
            </>
            )}
            {supervisor && (
                <>
                <div className="home-box">
            <Link to="/pmo/projects">
                <AiOutlineProject size="4rem" color="green"/>
            </Link>
                <h2>Manage Projects</h2>
                <p>Total Projects {projectlength}</p>
            </div>
            <div className="home-box">
            <Link to="/supervisor/students">
                <AiOutlineBook size="4rem" color="green"/>
            </Link>
                <h2>Mange Student</h2>
                <p>Total Students {studentslength}</p>
            </div>
            <div className="home-box">
            <Link to="/supervisor/total">
                <MdOutlineSupervisedUserCircle size="4rem" color="green"/>
            </Link>
                <h2>Show Supervisors</h2>
                <p>Total Supervisors {supervisorlength}</p>
            </div>
            <div className="home-box">
            <Link to="/supervisor/events">
                <MdOutlineEmojiEvents size="4rem" color="green"/>
            </Link>
                <h2>Show Event</h2>
                <p>Coming Events 0</p>
            </div>
                </>
            )}
            {student && (
                <>
                <div className="home-box">
            <Link to="/student/projects">
                <AiOutlineProject size="4rem" color="green"/>
            </Link>
                <h2>Manage Projects</h2>
                <p>Total Projects {projectlength}</p>
            </div>
            <div className="home-box">
            <Link to="/student/marks">
                <FaHighlighter size="4rem" color="green"/>
            </Link>
                <h2>Show Marks</h2>
            </div>
            <div className="home-box">
            <Link to="/student/meetings">
                <MdOutlineSupervisedUserCircle size="4rem" color="green"/>
            </Link>
                <h2>Show Meetings</h2>
                <p>Total Meetings {supervisorlength}</p>
            </div>
            <div className="home-box">
            <Link to="/student/events">
                <MdOutlineEmojiEvents size="4rem" color="green"/>
            </Link>
                <h2>Show Event</h2>
                <p>Coming Events 0</p>
            </div>
                </>
            )}
            
        </div>
    )
}
