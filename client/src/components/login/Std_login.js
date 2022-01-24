import React from "react";
import "./index.css";
import logo from "./logo.png";
export default function Std_login() {
  return (
    <div className='body-div'>
      <div class='form-container'>
        <img src={logo} className='logo1' alt='logo' width='60px' />
        <h1 className='heading1'>
          <b>PAS | Student </b>Login
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
          <button class='form-field clr button1' type='submit'>
            Sign in as Student
          </button>
          <p className='t-center'>-OR-</p>
          <a href='/auth/supervisor' className='form-link form-field'>
            Login in as Teacher
          </a>
          <a href='/auth/pmo' className='form-link form-field clr1'>
            Login in as Admin
          </a>
        </form>
      </div>
    </div>
  );
}
