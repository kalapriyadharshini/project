import React, { useState } from "react";
import "./navbar.css";
import { ChevronDown, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <div className="navbar">
      <div className="navbar-right">
        <div className="profile" onClick={handleToggle}>
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="profile-pic"
          />
          <div className="profile-info">
            <span className="profile-name">User Name</span>
            <span className="profile-role">Admin</span>
          </div>
          <ChevronDown size={18} />
        </div>

        {open && (
          <div className="dropdown">
            <ul>
              <li>
                <User size={16} /> Profile
              </li>
              <li>
                <LogOut size={16} /> Log out
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
