import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import FarmerSignUp from "./components/Farmer";
import SignUp from "./components/Signup";

function App() {
    return (
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/farmer-signup" element={<FarmerSignUp />} />
                  <Route path="/dashboard/:id" element={<div>Dashboard Content</div>} />
                </Routes>
                </BrowserRouter>
    );
}

export default App;
