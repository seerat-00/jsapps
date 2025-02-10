import React, { useState } from "react";
import './signup.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "./firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import bcrypt from 'bcryptjs'
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [conf, setConf] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

    const handleClick = async (e)=>{
        e.preventDefault();

        if(pass !== conf){
            setMessage('Passwords do not match');
            return;
        }

        console.log("Email being passed:", email);
        try{
            await createUserWithEmailAndPassword(auth, email, pass);
            const user = auth.currentUser;
            console.log(user);
            if(user){
                const salt = await bcrypt.genSalt(10);
                const hashpass = await bcrypt.hash(pass,salt);
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    pass: hashpass,
                    name: name
                });
            }
            setMessage("User registered successfully");
            setIsRegistered(true);
            navigate('/profile')
        }
        catch(error) {
            setMessage(error.message);
        }
    };
    
    return(
        <div className="main_signup">
            <div className="signup-area">
                <h3>Create a DEV@Deakin Account</h3>
                <form onSubmit={handleClick}>
                    <label >Name*</label>
                    <input
                        type="text"
                        className="area_input"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label >Email*</label>
                    <input
                        type="email"
                        className="area_input"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label >Password*</label>
                    <input
                        type="password"
                        className="area_input"
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                    <label >Confirm Password*</label>
                    <input
                        type="password"
                        className="area_input"
                        onChange={(e) => setConf(e.target.value)}
                        required
                    />
                    
                    <button className="area_button" >Sign Up</button>

                    {message && <p>{message}</p>}
                    {isRegistered && ( <p>Registration successfull.</p>)}

                    <p className="area_user">
                        Already a User? <Link to="/login">Log In here!</Link>
                    </p> 
                </form>
                
            </div>
        </div>
    );
}

export default SignUp;