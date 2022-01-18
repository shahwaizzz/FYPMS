import React from "react";
import "./index.css";
import logo from "./logo.png";
export default function Thr_login() {
  return (
    <div className='body-div'>
      <div class='form-container'>
        <img src={logo} className='logo1' width='60px' />
        <h1 className='heading1'>
          <b>PAS | Teacher </b>Login
        </h1>
        <form class='register-form'>
          {/* Uncomment the next line to show the success message */}
          {/* <div class="success-message">Success! Thank you for registering</div> */}

          <input
            id='email1'
            class='form-field input1'
            type='text'
            placeholder='Email'
            name='email'
          />
          {/* Uncomment the next line to show the error message */}
          {/* <span id="email-error">Please enter an email address</span> */}
          <input
            id='last-name'
            class='form-field input1'
            type='password'
            placeholder='Password'
            name='password'
          />
          {/* Uncomment the next line to show the error message */}
          {/* <span id="last-name-error">Please enter a last name</span> */}
          <button class='form-field clr2 button1' type='submit'>
            Sign in as Teacher
          </button>
          <p className='t-center'>-OR-</p>
          <a href='/auth/student' className='form-link form-field clr'>
            Login in as Student
          </a>
          <a href='/auth/pmo' className='form-link form-field clr1'>
            Login in as Admin
          </a>
        </form>
      </div>
    </div>
  );
}
