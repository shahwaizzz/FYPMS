import React from 'react'
import { IconContext } from "react-icons";
import { IoNotificationsCircleSharp } from "react-icons/io5";

export default function Navbar() {
    return (
        <div>
            <div className="title-bar">
            <IconContext.Provider value={{ className:"icons title-bar-icons"}}>
                <span></span>
                <h2>FYPMS</h2>
                <div  className="notification-icon">
                <IoNotificationsCircleSharp size="2.5rem"/>
                </div>
            </IconContext.Provider>
            </div>
        </div>
    )
}
