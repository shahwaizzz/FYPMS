import React from 'react'
import { IconContext } from "react-icons";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
    return (
        <div>
            <div className="title-bar">
                <span></span>
                <h2>FYPMS</h2>
                <div className="notification-icons-container">
                <IconContext.Provider value={{ className:"icons title-bar-icons"}}>
                    <div className="notification-icon">
                        <IoNotificationsCircleSharp size="2.5rem"/>
                    </div>
                    </IconContext.Provider> 
                    <IconContext.Provider value={{ className:"icons title-bar-icons"}}>
                    <div className="notification-icon">
                        <CgProfile size="2.5rem"/>
                    </div>
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    )
}
