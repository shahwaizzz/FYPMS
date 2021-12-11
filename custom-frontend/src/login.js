import React, { useState } from 'react'

export default function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


function handleSubmit(e) {
    e.preventDefault();
    console.log(email," ",password);
}

    return (
        <div className="login">
            <div className="login-form">
            <form onSubmit={handleSubmit} className="data-form login-form-wrap">
                <h1>PMO LOGIN</h1>
                <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                <button type="submit">Login</button>
                </div>
            </form>
            </div>
        </div>
    )
}
