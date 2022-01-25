import React, { useState } from "react";
import "./login.css";
import logo from "./logo.png";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
export default function Adm_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pmoLogin } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("values are empty");
    }
    pmoLogin({ email: email, password: password });
  };

  return (
    <div className='body-div'>
      <div class='form-container'>
        <img src={logo} className='logo1' alt='logo' width='60px' />
        <h1 className='heading1'>
          <b>PAS | Admin </b>Login
        </h1>
        <form class='register-form' onSubmit={handleSubmit}>
          {/* Uncomment the next line to show the success message */}
          {/* <div class="success-message">Success! Thank you for registering</div> */}

          <input
            id='email1'
            class='form-field input1'
            type='text'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Uncomment the next line to show the error message */}
          {/* <span id="email-error">Please enter an email address</span> */}
          <input
            id='last-name'
            class='form-field input1'
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Uncomment the next line to show the error message */}
          {/* <span id="last-name-error">Please enter a last name</span> */}
          <button className='form-field button1' type='submit' name='login'>
            Sign in as Admin
          </button>
          <p className='t-center'>-OR-</p>
          <a href='/auth/supervisor' className='form-link form-field'>
            Login in as Supervisor
          </a>
          <a href='/auth/student' className='form-link form-field clr'>
            Login in as Student
          </a>
        </form>
      </div>
    </div>
  );
}
