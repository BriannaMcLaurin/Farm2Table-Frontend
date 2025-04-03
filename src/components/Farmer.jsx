import { useState } from "react";
import { auth, db } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Farmer.css";

const FarmerSignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("seller"); // Default role as "seller"
    const navigate = useNavigate();

    const handleFarmerSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user info in Firestore with role
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email,
                role,
            });

            alert("Farmer account created successfully!");
            navigate("/"); // Redirect to login page
        } catch (error) {
            console.error("Error signing up:", error.message);
        }
    };

    return (
        <div className="farmer-page">
            <div className="farmer-container">
                <h1 className="farmer-title">Create Seller Account</h1>
                <p>Connecting Farmers to Markets – Fair Prices, Zero Waste.</p>
                <div className="farmer-box">
                <form onSubmit={handleFarmerSignUp}>
                    <input type="text" className="input-field" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
                    <input type="text" className="input-field" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
                    <input type="email" className="input-field" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="input-field" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <input type="text" className="input-field" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} required />
                    <input type="text" className="input-field" placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} required />
                    <button type="submit"  className="farmer-button">Sign Up</button>
                </form>
                <p className="small">Already have an account? <a href="/">Sign In</a></p>
            </div>
        </div>
        </div>
    );
};

export default FarmerSignUp;
