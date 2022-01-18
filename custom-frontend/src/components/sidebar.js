import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
  AiFillLeftCircle,
  AiOutlineHome,
  AiOutlineBook,
  AiOutlineProfile,
  AiOutlineProject,
} from "react-icons/ai";
import {
  MdOutlineSupervisedUserCircle,
  MdLogout,
  MdOutlineEmojiEvents,
} from "react-icons/md";
import Home from "./main-components/home";
import Student from "./main-components/student";
import Supervisor from "./main-components/supervisor";
import UserProfile from "./main-components/user-profile";
import Logout from "./main-components/logout";
import Projects from "./main-components/projects";
import Events from "./main-components/events";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  const [changePages, setChangePages] = useState(props.abc);
  const [menuChange, setMenuChange] = useState("menu-hide");
  const [dataWidth, setDataWidth] = useState("data-width");
  const [menubarList, setMenubarList] = useState("menubar-list");
  const [pageName, setPageName] = useState(props.page);

  //   function changePage(e) {
  //     if (e === "Home") {
  //       setPageName("Home");
  //       setChangePages(<Home />);
  //     }
  //     if (e === "Projects") {
  //       setPageName("Projects");
  //       setChangePages(<Projects />);
  //     }
  //     if (e === "Events") {
  //       setPageName("Events");
  //       setChangePages(<Events />);
  //     }
  //     if (e === "Student") {
  //       setPageName("Students");
  //       setChangePages(<Student />);
  //     }
  //     if (e === "Supervisor") {
  //       setPageName("Supervisors");
  //       setChangePages(<Supervisor />);
  //     }
  //     if (e === "UserProfile") {
  //       setPageName("User Profile");
  //       setChangePages(<UserProfile />);
  //     }
  //     if (e === "Logout") {
  //       setPageName("Logout");
  //       setChangePages(<Logout />);
  //     }
  //     menuToggle("sidebar");
  //   }

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
              {/* <li onClick={() => changePage("Home")}> */}
              <Link to='/admin' className='links'>
                <li>
                  <AiOutlineHome />
                  <span>Home</span>
                </li>
              </Link>
              <Link to='/admin/projects' className='links'>
                <li>
                  <AiOutlineProject />
                  <span>Manage Projects</span>
                </li>
              </Link>
              <Link to='/admin/events' className='links'>
                <li>
                  <MdOutlineEmojiEvents />
                  <span>Events</span>
                </li>
              </Link>
              <Link to='/admin/students' className='links'>
                <li>
                  <AiOutlineBook />
                  <span>Students</span>
                </li>
              </Link>
              <Link to='/admin/supervisors' className='links'>
                <li>
                  <MdOutlineSupervisedUserCircle />
                  <span>Supervisors</span>
                </li>
              </Link>
              <Link to='/admin/profile' className='links'>
                <li>
                  <AiOutlineProfile />
                  <span>User Profile</span>
                </li>
              </Link>
              <Link to='/admin/logout' className='links'>
                <li>
                  <MdLogout />
                  <span>Logout</span>
                </li>
              </Link>

              {/* <li onClick={() => changePage("Projects")}>
                <AiOutlineProject />
                <span>Manage Projects</span>
              </li>
              <li onClick={() => changePage("Events")}>
                <MdOutlineEmojiEvents />
                <span>Mange Events</span>
              </li>
              <li onClick={() => changePage("Student")}>
                <AiOutlineBook />
                <span>Students</span>
              </li>
              <li onClick={() => changePage("Supervisor")}>
                <MdOutlineSupervisedUserCircle />
                <span>Supervisors</span>
              </li>
              <li onClick={() => changePage("UserProfile")}>
                <AiOutlineProfile />
                <span>User Profile</span>
              </li>
              <li onClick={() => changePage("Logout")}>
                <MdLogout />
                <span> Logout</span>
              </li> */}
            </ul>
          </IconContext.Provider>
        </div>
      </div>

      <div className={"data " + dataWidth}>{props.abc}</div>
    </div>
  );
}
