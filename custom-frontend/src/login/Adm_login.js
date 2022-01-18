import React, { useState } from "react";
import "./index.css";
import logo from "./logo.png";
export default function Adm_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function pmoLogin(event) {
    event.preventDefault();
    const response = await fetch("/api/v1/auth/pmo/login", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    // if(data.user){
    //   alert('login successflly')
    //   window.location.href='/dashboard'
    // }
    // else{
    //   alert('Invalid Username or Password !')
    // }
    console.log(data);
  }

  return (
    <div className='body-div'>
      <div class='form-container'>
        <img src={logo} className='logo1' width='60px' />
        <h1 className='heading1'>
          <b>PAS | Admin </b>Login
        </h1>
        <form class='register-form' onSubmit={pmoLogin}>
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
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Uncomment the next line to show the error message */}
          {/* <span id="last-name-error">Please enter a last name</span> */}
          <button className='form-field button1' type='submit'>
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
