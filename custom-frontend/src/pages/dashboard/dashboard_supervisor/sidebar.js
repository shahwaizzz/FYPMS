import React, { useState } from "react";
import { IconContext } from "react-icons";
import { useAppContext } from "../../../context/appContext";
import {
  AiFillLeftCircle,
  AiOutlineHome,
  AiOutlineBook,
  AiOutlineProfile,
  AiOutlineProject,
  AiFillCaretRight,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import {
  MdOutlineSupervisedUserCircle,
  MdLogout,
  MdOutlineEmojiEvents,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function SSidebar(props) {
  const navigate = useNavigate();

  const { removeUserFromLocalStorage } = useAppContext();

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
              <Link to='/supervisor/home' className='links'>
                <li>
                  <AiOutlineHome />
                  <span>Home</span>
                </li>
              </Link>
              <Link to='/supervisor/createproject' className='links'>
                <li>
                  <AiOutlineProject />
                  <span>Create Projects</span>
                </li>
              </Link>
              <Link to='/supervisor/students' className='links'>
                <li>
                  <AiOutlineProject />
                  <span>Students</span>
                </li>
              </Link>
              <Link to='/supervisor/certificates' className="links">
                <li>
                    <AiOutlineProject />
                    <span>Certificates</span>
                </li>
              </Link>
              <Link to='/supervisor/events' className='links'>
                <li>
                  <MdOutlineEmojiEvents />
                  <span>Events</span>
                </li>
              </Link>
              <Link to='/supervisor/meetings' className='links'>
                <li>
                  <AiOutlineBook />
                  <span>Meeting</span>
                </li>
              </Link>

              <Link to='/supervisor/globaltemplates' className='links'>
                <li>
                  <AiOutlineBook />
                  <span>Global Templates</span>
                </li>
              </Link>

              <Link to='/supervisor/updatepassword' className='links'>
                <li>
                  <AiOutlineProfile />
                  <span>User Profile</span>
                </li>
              </Link>
              <Link
                to='/auth/supervisor'
                className='links'
                onClick={() =>
                  removeUserFromLocalStorage(
                    "supervisor",
                    "supervisortoken",
                    "/auth/supervisor",
                    navigate
                  )
                }
              >
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
