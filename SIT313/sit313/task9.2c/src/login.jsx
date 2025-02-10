import React, { useState } from "react";
import './login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login (){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,pass);
            setMessage("User logged in successfully");
            setIsLoggedIn(true);
            navigate('/profile')
        }
        catch (error){
            setMessage(error.message);
        }
    };

    return(
        <div className="main-login">
             <div className="login-area">
                <h1>Log In</h1>
                <p className="user-area">
                    New User? <Link to="/signup">Sign Up here!</Link>
                </p>
                <form onSubmit={handleSubmit}>
                    
                    <label className="label-area">Your email</label>
                    <input
                        type="email"
                        className="input-area"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                
                    <label className="label-area">Your Password</label>
                    <input
                        type="password"
                        className="input-area"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                    
                    <button type="submit" className="button-area" >LogIn</button>

                    {message && <p>{message}</p>}
                    {isLoggedIn && (<p>Login successful!</p>)}
                </form>

            </div>
        </div>
    );
}

export default Login;