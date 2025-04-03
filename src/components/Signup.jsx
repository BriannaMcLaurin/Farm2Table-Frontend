import { useState } from "react";
import { auth, db } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user info in Firestore with role
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email,
                createdAt: new Date().toISOString()
            });

            alert(`account created successfully!`);
            navigate("/"); // Redirect to login page
        } catch (error) {
            console.error("Error signing up:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h1 className="signup-title">Welcome, Create an Account!</h1>
                <p>Connecting Farmers to Markets – Fair Prices, Zero Waste.</p>
                <div className="signup-box">
                    <form onSubmit={handleSignUp}>
                        <input type="text" className="input-field" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
                        <input type="text" className="input-field" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
                        <input type="email" className="input-field" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" className="input-field" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                    <p className="small">Already have an account? <a href="/">Sign In</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
