import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
  AiFillLeftCircle,
  AiOutlineHome,
  AiOutlineBook,
  AiOutlineProfile,
  AiOutlineProject,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import {
  MdOutlineSupervisedUserCircle,
  MdLogout,
  MdOutlineEmojiEvents,
} from "react-icons/md";
// import Home from "./main-components/home";
// import Student from "./main-components/student";
// import Supervisor from "./main-components/supervisor";
// import UserProfile from "./main-components/user-profile";
// import Logout from "./main-components/logout";
// import Projects from "./main-components/projects";
// import Events from "./main-components/events";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  const [menuChange, setMenuChange] = useState("menu-hide");
  const [dataWidth, setDataWidth] = useState("data-width");
  const [menubarList, setMenubarList] = useState("menubar-list");

  function menuToggle(e) {
    if (menuChange === "menu-show" && dataWidth === null) {
      setMenuChange("menu-hide");
      setDataWidth("data-width");
      setMenubarList("menubar-list");
    } else if (e === "sidebar") {
      setMenuChange("menu-hide");
    } else {
      setMenuChange("menu-show");
      setDataWidth(null);
      setMenubarList(null);
    }
  }
  return (
    <div>
      <div className={"menubar " + menuChange}>
        <div className={menuChange}>
          <IconContext.Provider
            value={{ className: "icons menubar-icons", size: "1.5rem" }}
          >
            <h2 className='menubar-title'>
              <span className='menubar-title-icon' onClick={() => menuToggle()}>
                <AiFillLeftCircle size='2rem' />
              </span>
              <span className='menubar-title-test'>{props.name}</span>
            </h2>
            <ul className={menubarList}>
              <Link to='/pmo' className='links'>
                <li>
                  <AiOutlineHome />
                  <span>Home</span>
                </li>
              </Link>
              <Link to='/pmo/projects' className='links'>
                <li>
                  <AiOutlineProject />
                  <span>Manage Projects</span>
                </li>
              </Link>
              <Link to='/pmo/events' className='links'>
                <li>
                  <MdOutlineEmojiEvents />
                  <span>Events</span>
                </li>
              </Link>
              <Link to='/pmo/students' className='links'>
                <li>
                  <AiOutlineBook />
                  <span>Students</span>
                </li>
              </Link>
              <Link to='/pmo/supervisors' className='links'>
                <li>
                  <MdOutlineSupervisedUserCircle />
                  <span>Supervisors</span>
                </li>
              </Link>
              <Link to='/pmo/documents' className='links whiteicon'>
                <li className='whiteicon'>
                  {/* <GrDocument className="clr-white" /> */}
                  <CgFileDocument />
                  <span className='whiteicon'>Upload Templates</span>
                </li>
              </Link>
              <Link to='/pmo/change-password' className='links'>
                <li>
                  <AiOutlineProfile />
                  <span>User Profile</span>
                </li>
              </Link>
              <Link to='/pmo/logout' className='links'>
                <li>
                  <MdLogout />
                  <span>Logout</span>
                </li>
              </Link>
            </ul>
          </IconContext.Provider>
        </div>
      </div>

      <div className={"data " + dataWidth}>{props.abc}</div>
    </div>
  );
}
