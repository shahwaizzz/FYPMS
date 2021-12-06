import React from 'react'
import { AiOutlineBook, AiOutlineProject } from 'react-icons/ai'
import { MdOutlineEmojiEvents, MdOutlineSupervisedUserCircle } from 'react-icons/md'

export default function Home() {
    return (
        <div className="home">
            <div className="home-box">
                <AiOutlineProject size="4rem"/>
                <h2>Manage Projects</h2>
                <p>Total Projects 0</p>
            </div>
            <div className="home-box">
                <AiOutlineBook size="4rem"/>
                <h2>Mange Student</h2>
                <p>Total Students 0</p>
            </div>
            <div className="home-box">
                <MdOutlineSupervisedUserCircle size="4rem"/>
                <h2>Manage Supervisors</h2>
                <p>Total Supervisors 0</p>
            </div>
            <div className="home-box">
                <MdOutlineEmojiEvents size="4rem"/>
                <h2>Create Event</h2>
                <p>Coming Events 0</p>
            </div>
        </div>
    )
}
