import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import './navbar.css';

const NavBAR = ({ user }) => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("You're signed out");
            navigate('/');
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };
    return(
        <nav className="navbar">
            <div className="navbar-top">DEV@Deakin</div>
            <input 
                type="text"
                className="navbar-input"
                placeholder="Search"
            />
            <div className="link">
                <Link to='find'>
                    <button className="post">Find</button>
                </Link>
                <Link to='radio'>
                    <button className="post">Post</button>
                </Link>
                <Link to="/plans"> 
                    <button className="post">Plans</button>
                </Link>
                {!user ? (
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <button className="post">Log In</button>
                    </Link>
                ) : (
                    <button className="post" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
}

export default NavBAR;