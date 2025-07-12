import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import MyProfile from "./pages/UserProfile";
import UserProfile from "./components/HomePage/UserProfile";
import SwapRequest from "./pages/SwapRequest";
import MyRequest from "./pages/MyRequest";
import Navbar from "@/components/Navbar";
import { AuthProvider, useAuth } from './context/AuthContext'
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      {/* <nav className="p-4 bg-gray-100">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/profile" className="mr-4">User Profile</Link>
        <Link to="/swap-request">SwapRequest</Link>
      </nav> */}


      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/swap-request" element={<SwapRequest />} />
        <Route path="/my-request" element={<MyRequest />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
      </Routes>

    </BrowserRouter>
  )
}

export default App;