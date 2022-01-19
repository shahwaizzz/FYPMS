import React,{useState} from 'react'
import '../../login/index.css';
export default function UserProfile() {
    const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

    return (
        <div className='maindiv1'>
            <div >
                <div class='form-container'>
                    <h3 className='padd'>
                    Update Password
                    </h3> 
                    <form class='register-form' >
                    {/* Uncomment the next line to show the success message */}
                    {/* <div class="success-message">Success! Thank you for registering</div> */}

                    <input
                        id='email1'
                        class='form-field input1'
                        type='password'
                        placeholder='password'
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
                    <button className='form-field button1 green' type='submit' name='login'>
                        Update
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
