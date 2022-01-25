import React, { useState } from "react";
import "../login/index.css";
import axios from "axios";
export default function UserProfile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const updatePassword = async () => {
    const response = await axios.patch("/api/v1/pmo/change-password", {
      currentPassword,
      newPassword: password,
      confirmPassword,
    });
  };
  return (
    <div className='maindiv1'>
      <div>
        <div class='form-container'>
          <h3 className='padd'>Update Password</h3>
          <form class='register-form' onSubmit={updatePassword}>
            {/* Uncomment the next line to show the success message */}
            {/* <div class="success-message">Success! Thank you for registering</div> */}

            <input
              id='email1'
              class='form-field input1'
              type='password'
              placeholder='Current Password'
              name='currentpassword'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              class='form-field input1'
              type='password'
              placeholder='New Password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Uncomment the next line to show the error message */}
            {/* <span id="email-error">Please enter an email address</span> */}
            <input
              id='last-name'
              class='form-field input1'
              type='password'
              placeholder='Confirm Password'
              name='confirmpassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className='form-field button1 green'
              type='submit'
              name='login'
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
