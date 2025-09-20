import React, { useEffect, useState, useRef } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./SuperadminLayout.css";

const SuperadminLayout = () => {
  const [permissions, setPermissions] = useState([]);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userRef = useRef(null);

  // Load user and permissions
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.permissions) {
      setPermissions(currentUser.permissions);
      setUser(currentUser);
    } else {
      navigate("/superadminlogin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/superadminlogin");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        userRef.current &&
        !userRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (callback) => {
    setDropdownOpen(false);
    if (callback) callback();
  };

  const menuItems = [
    { path: "/superadmin/dashboard", label: "Dashboard", key: "dashboard" },
    { path: "/superadmin/category", label: "Categories", key: "Categories" },
    { path: "/superadmin/products", label: "Products", key: "Products" },
    { path: "/superadmin/customers", label: "Customers", key: "Customers" },
    { path: "/superadmin/orders", label: "Orders", key: "Orders" },
    { path: "/superadmin/inventory", label: "Inventory", key: "Inventory" },
    { path: "/superadmin/reports", label: "Reports", key: "Reports" },
    { path: "/superadmin/settings", label: "Settings", key: "Settings" },
    { path: "/superadmin/users", label: "Users", key: "Users" },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>SuperAdmin</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems
            .filter((item) => permissions.includes(item.key))
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                }
              >
                {item.label}
              </NavLink>
            ))}
        </nav>
      </aside>

      {/* Main Section */}
      <div className="main-section">
        <header className="topbar">
          <div
            className="user-info"
            ref={userRef}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <FaUserCircle className="user-icon" />
            <span>{user?.name || "Super Admin"}</span>
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu show" ref={dropdownRef}>
              <div className="dropdown-header">
                <FaUserCircle className="dropdown-user-icon" />
                <div>
                  <p className="dropdown-name">
                    {user?.name || "Super Admin"}
                  </p>
                </div>
              </div>
              <hr />
              <div
                className="dropdown-item"
                onClick={() => handleMenuClick(() => navigate("/superadmin/profile"))}
              >
                Profile
              </div>
              <div
                className="dropdown-item"
                onClick={() => handleMenuClick(handleLogout)}
              >
                Logout
              </div>
            </div>
          )}
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperadminLayout;
