import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Get user role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                alert(`Login Successful!`);
                navigate(`/dashboard/${user.uid}`)
            } else {
                console.log("No such user found in Firestore");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="login-page">
        <div className="login-container">
        <h1 className="login-title">Welcome! Sign In</h1>
        <p>Connecting Farmers to Markets – Fair Prices, Zero Waste.</p>
        <div className="login-box">
            <form onSubmit={handleLogin}>
                <input type="email" className="input-field" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="input-field" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="login-button">Login</button>
            </form>
            <a href="#" className="forgot-password">Forgot Password?</a>
            <div className="button-container">
            <button className="link-button" onClick={() => navigate("/signup")}>Create Account</button>
            <button className="farmer-button" onClick={() => navigate("/farmer-signup")}>Join as a Farmer</button>
            </div>
        </div>
    </div>
    </div>
    );
};

export default Login;
