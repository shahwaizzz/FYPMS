import React, { useEffect, useState } from "react";
import "./login.css";
import logo from "./logo.png";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import {Link} from 'react-router-dom'
export default function Adm_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pmoLogin, error, setError } = useAppContext();
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
          {/* <div class='success-message'>Success! Thank you for registering</div> */}

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
          {/* <button className='form-field button1 admin' type='submit' name='login'>
            Sign in as Admin
          </button> */}
          <input className='form-field button1 hvr admin' value="Sign in as Admin" type='submit' name='login' />
          <span className="error-cls"> <b> {error}</b></span>
          <p className='t-center'>-OR-</p>
          <Link to='/auth/supervisor' className='form-link form-field supervisor' >
            Login in as Supervisor
          </Link>
          <Link to='/auth/student' className='form-link form-field student'>
            Login in as Student
          </Link>
        </form>
      </div>
    </div>
  );
}
