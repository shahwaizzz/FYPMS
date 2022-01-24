import React,{useState} from "react";
import "./index.css";
import logo from "./logo.png";
import axios from "axios";
import { SET_TOKON_SUPERVISOR } from "../../store/reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
                           
export default function Thr_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const supervisorLogin = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/v1/auth/supervisor/login",
        { email, password },
        config
      );
      const { supervisor, token } = response.data;
      localStorage.setItem("myToken", token);
      dispatch({ type: SET_TOKON_SUPERVISOR, paylood: token });
      // <Navigate to='/supervisor' />
      <Navigate to='supervisor' />
      // window.location.href = "/supervisor";
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='body-div'>
      <div class='form-container'>
        <img src={logo} className='logo1' alt='logo' width='60px' />
        <h1 className='heading1'>
          <b>PAS | Supervisor </b>Login
        </h1> 
        <form class='register-form' onSubmit={supervisorLogin}>
          {/* Uncomment the next line to show the success message */}
          {/* <div class="success-message">Success! Thank you for registering</div> */}

          <input
            id='email1'
            class='form-field input1'
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
            onChange={(e)=>setPassword(e.target.value)}
          />
          {/* Uncomment the next line to show the error message */}
          {/* <span id="last-name-error">Please enter a last name</span> */}
          <button class='form-field clr2 button1' type='submit'>
            Sign in as Supervisor
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
