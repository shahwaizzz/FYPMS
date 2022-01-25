import React from "react";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  return (
    <div>
      <div className='title-bar'>
        <span></span>
        <h2>FYPMS</h2>
        <div className='title-bar-icons'>
          <div>
            <IoNotificationsCircleSharp size='2.5rem' />
          </div>
          <div>
            <CgProfile size='2.5rem' />
          </div>
          <div>
            <p className='lead' onClick={() => console.log("logout")}>
              LOGOUT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
