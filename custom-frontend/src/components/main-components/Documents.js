import React,{useState} from 'react'
import '../../login/index.css';
import { AiFillDelete } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";


const Document = () =>{
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <div className='maindiv1'>
            <div className='margin-top'>
                <div class='form-container1'>
                    <h3 className='padd12'>
                    Upload Template
                    </h3> 
                    <form class='register-form' >
                    {/* Uncomment the next line to show the success message */}
                    {/* <div class="success-message">Success! Thank you for registering</div> */}

                    <input
                        id='email1'
                        class='form-field widt input1'
                        type='file'
                        placeholder='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Uncomment the next line to show the error message */}
                    {/* <span id="email-error">Please enter an email address</span> */}
                    
                    <button className='form-field button1 docu green' type='submit' name='login'>
                        Upload
                    </button>
                    <ul className='lists'>
                        <li><h3>Supervisor midterm Certifcate <button className='btnn'><AiFillDelete className='iconic' /></button> <button className='btnn'><HiDownload className='iconic' /></button></h3></li>
                    </ul>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Document;


