import React from "react";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useAppContext } from "../context/appContext";
export default function Navbar() {
  const { logoutUser } = useAppContext();
  return (
    <div>
      <div className='title-bar'>
        <span></span>
        <div>
          <h2 style={{ textAlign: "center" }}>FYPMS</h2>
        </div>
        <div className='title-bar-icons'>
          <div>
            <p className='lead' onClick={logoutUser}>
              LOGOUT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
