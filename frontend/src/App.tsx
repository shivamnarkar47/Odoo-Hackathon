import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import SwapRequest from "./pages/SwapRequest";


function App() {

  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/profile" className="mr-4">User Profile</Link>
        <Link to="/swap-request">SwapRequest</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/swap-request" element={<SwapRequest />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
