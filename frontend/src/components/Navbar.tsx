import React, { useState } from "react";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-blue-600">Upshare</div>

      <div className="flex space-x-4 items-center">
        {isLoggedIn && (
          <>
            <button className="text-gray-700 hover:text-blue-600">Home</button>
            <button className="text-gray-700 hover:text-blue-600">Swap Request</button>
          </>
        )}

        <Button variant="default" onClick={handleLoginLogout}>
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
