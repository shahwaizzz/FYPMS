import React, { useEffect, useState } from "react";
import "./login.css";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
export default function Adm_login() {

  
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem('supervisor')
    if(data){
      navigate('/supervisor/home')
    }else{
      navigate('/auth/supervisor')
    }
   },[])
 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const { supervisorLogin, error, setError } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("values are empty");
    }
    const data = await supervisorLogin({ email: email, password: password });
  };

  return (
    <div className='body-div'>
      <div class='form-container'>
        <img src={logo} className='logo1' alt='logo' width='60px' />
        <h1 className='heading1'>
          <b>PAS | Supervisor </b>Login
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
          <input className='form-field  hvr supervisor ' value="Sign in as Supervisor" type='submit' name='login' />
          <span className="error-cls"> <b> {error}</b></span>
          <p className='t-center'>-OR-</p>
          <a href='/login' className='form-link form-field admin' >
            Login in as Admin
          </a>
          <a href='/auth/student' className='form-link form-field student'>
            Login in as Student
          </a>
        </form>
      </div>
    </div>
  );
}
