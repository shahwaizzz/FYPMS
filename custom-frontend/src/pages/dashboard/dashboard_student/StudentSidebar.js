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
import { Link,useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/appContext";


export default function Studentsidebar(props) {
  const [menuChange, setMenuChange] = useState("menu-hide");
  const [dataWidth, setDataWidth] = useState("data-width");
  const [menubarList, setMenubarList] = useState("menubar-list");
  const { removeUserFromLocalStorage } = useAppContext();

  const navigate = useNavigate()

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

  const {logout} = useAppContext();
//   function logout(){ 
//     removeUserFromLocalStorage();
//     window.location.href='/login';
//   }
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
              <Link to='/student/home' className='links'>
                <li>
                  <AiOutlineHome />
                  <span>Home</span>
                </li>
              </Link>
              <Link to='/student/events' className='links'>
                <li>
                  <AiOutlineProject />
                  <span>Manage Projects</span>
                </li>
              </Link>
              <Link to='/student/events' className='links'>
                <li>
                  <MdOutlineEmojiEvents />
                  <span>Events</span>
                </li>
              </Link>
              <Link to='/student/meetings' className='links'>
                <li>
                  <AiOutlineBook />
                  <span>Meetings</span>
                </li>
              </Link>
              <Link to='/student/marks' className='links'>
                <li>
                  <AiOutlineBook />
                  <span>Marks</span>
                </li>
              </Link>
              <Link to='/auth/student' className='links' onClick={() => removeUserFromLocalStorage("student","stdtoken","/auth/student",navigate)}>
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
