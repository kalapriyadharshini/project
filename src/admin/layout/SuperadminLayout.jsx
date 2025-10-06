import React, { useEffect, useState, useRef } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaLayerGroup,
  FaUsers,
  FaShoppingCart,
  FaWarehouse,
  FaChartBar,
  FaCog,
  FaUserTie,
  FaUserCircle,   
  FaChevronRight,
} from "react-icons/fa";
import "./SuperadminLayout.css";
const SuperadminLayout = () => {
  const [permissions, setPermissions] = useState([]);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userRef = useRef(null);
  // Load user and permissions
  // useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   if (currentUser?.permissions) {
  //     setPermissions(currentUser.permissions);
  //     setUser(currentUser);
  //   } else {
  //     navigate("/superadminlogin");
  //   }
  // }, [navigate]);
  useEffect(() => {
  const loadUser = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.permissions) {
      setPermissions(currentUser.permissions);
      setUser(currentUser);
    } else {
      navigate("/superadminlogin");
    }
  };

  // Initial load
  loadUser();

  // Listen for storage changes (like when Manageuser updates permissions)
  window.addEventListener("storage", loadUser);

  return () => window.removeEventListener("storage", loadUser);
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

  // const menuItems = [
  //   { path: "/superadmin/dashboard", label: "Dashboard", key: "dashboard" },
  //   { path: "/superadmin/category", label: "Categories", key: "Categories" },
  //   { path: "/superadmin/products", label: "Products", key: "Products" },
  //   { path: "/superadmin/customers", label: "Customers", key: "Customers" },
  //   { path: "/superadmin/orders", label: "Orders", key: "Orders" },
  //   { path: "/superadmin/inventory", label: "Inventory", key: "Inventory" },
  //   { path: "/superadmin/reports", label: "Reports", key: "Reports" },
  //   { path: "/superadmin/settings", label: "Settings", key: "Settings" },
  //   { path: "/superadmin/users", label: "User", key: "User" },
  //    { path: "/superadmin/users/add", label: "Add User", key: "AddUser" },
  // { path: "/superadmin/users/manage", label: "Manage Users", key: "ManageUser" },
  // ];
  const headerMap = {
  "/superadmin/dashboard": { module: "DASHBOARD", page: "Overview" },
  "/superadmin/users/add": { module: "USER MODULES", page: "Add User" },
  "/superadmin/users/manage": { module: "USER MODULES", page: "Manage Users" },
  "/superadmin/category/add": { module: "CATEGORY MODULES", page: "Add Category" },
  "/superadmin/category/manage": { module: "CATEGORY MODULES", page: "Manage Categories" },
  "/superadmin/products/add": { module: "PRODUCT MODULES", page: "Add Product" },
  "/superadmin/products/manage": { module: "PRODUCT MODULES", page: "Manage Products" },
  "/superadmin/customers/manage": { module: "CUSTOMER MODULES", page: "Manage Customers" },
  "/superadmin/orders/manage": { module: "ORDER MODULES", page: "Manage Orders" },
  "/superadmin/inventory/manage": { module: "INVENTORY MODULES", page: "Manage Inventory" },
  "/superadmin/reports": { module: "REPORT MODULES", page: "Sales Report" },
  "/superadmin/settings": { module: "SETTINGS", page: "Profile Settings" },
  "/superadmin/profile": { module: "PROFILE", page: "Profile" },
};

const current = headerMap[location.pathname] || { module: "DASHBOARD", page: "Overview" };

  const menuItems = [
  {
   
    label: "Dashboard",
    key: "Dashboard",
    icon: <FaTachometerAlt className="icon" size={16}/>,
     children: [
      { path: "/superadmin/dashboard", label: "Dashboard" },
    ],
  },
  {
    label: "Users",
    key: "User",
    icon: <FaUserTie className="icon" size={16}/>,
    children: [
      { path: "/superadmin/users/add", label: "Add User" },
      { path: "/superadmin/users/manage", label: "Manage Users" },
    ],
  },
  {
    label: "Categories",
    key: "Categories",
    icon: <FaLayerGroup className="icon"  size={16}/>,
    children: [
      { path: "/superadmin/category/add", label: "Add Category" },
      { path: "/superadmin/category/manage", label: "Manage Categories" },
    ],
  },
  {
    label: "Products",
    key: "Products",
    icon: <FaBox className="icon" size={16} />,
    children: [
      { path: "/superadmin/products/add", label: "Add Product" },
      { path: "/superadmin/products/manage", label: "Manage Products" },
    ],
  },
  {
    label: "Customers",
    key: "Customers",
    icon: <FaUsers className="icon" size={16} />,
    children: [
      { path: "/superadmin/customers/manage", label: "Manage Customers" },
    ],
  },
  {
    label: "Orders",
    key: "Orders",
    icon: <FaShoppingCart className="icon" size={16} />,
    children: [
      { path: "/superadmin/orders/manage", label: "Manage Orders" },
    ],
  },
  {
    label: "Inventory",
    key: "Inventory",
    icon: <FaWarehouse className="icon" size={16} />,
    children: [
      { path: "/superadmin/inventory/manage", label: "Manage Inventory" },
    ],
  },
  {
    label: "Reports",
    key: "Reports",
    icon: <FaChartBar className="icon" size={16} />,
    children: [
      { path: "/superadmin/reports", label: "Sales Report" },
    
    ],
  },
  {
    label: "Settings",
    key: "Settings",
    icon: <FaCog className="icon"  size={16}/>,
    children: [
      { path: "/superadmin/settings", label: "Profile Settings" },
      
    ],
  },
];



  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="py-4">BLUEVIN</h2>
        </div>
        {/* <nav className="sidebar-nav">
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
        </nav> */}
       
{/* <nav className="sidebar-nav">
  {menuItems
    .filter((item) => permissions.includes(item.key))
    .map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      return (
        <div key={item.path || item.key} className="sidebar-item">
          {hasChildren ? (
            <>
              <div
                className={`sidebar-dropdown ${
                  openDropdown === item.key ? "open" : ""
                }`}
                onClick={() =>
                  setOpenDropdown(openDropdown === item.key ? null : item.key)
                }
              >
                <span>
  {item.icon} {item.label}
</span>

                <FaChevronRight className="arrow-icon" />
              </div>
              {openDropdown === item.key && (
                <ul className="submenu">
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <NavLink to={child.path}>{child.label}</NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active-link" : "inactive-link"
              }
            >
              {item.label}
            </NavLink>
          )}
        </div>
      );
    })}
</nav> */}
<nav className="sidebar-nav">
  {menuItems
    .filter((item) => permissions.includes(item.key))
    .map((item) => {
      const hasChildren = item.children && item.children.length > 1; // more than 1 → dropdown
      return (
        <div key={item.key} className="sidebar-item">
          {hasChildren ? (
            <>
              <div
                className={`sidebar-dropdown ${
                  openDropdown === item.key ? "open" : ""
                }`}
                onClick={() =>
                  setOpenDropdown(openDropdown === item.key ? null : item.key)
                }
              >
                <span>
                  {item.icon} {item.label}
                </span>
                <FaChevronRight className="arrow-icon" />
              </div>
              {openDropdown === item.key && (
                <ul className="submenu">
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <NavLink to={child.path}>{child.label}</NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            // Direct NavLink (Dashboard, Reports, Settings etc.)
            <NavLink
              to={item.children?.[0]?.path || "#"}
              className={({ isActive }) =>
                isActive ? "active-link" : "inactive-link"
              }
            >
              {item.icon} {item.label}
            </NavLink>
          )}
        </div>
      );
    })}
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
              {/* <div className="dropdown-header">
                <FaUserCircle className="dropdown-user-icon" />
                <div>
                  <p className="dropdown-name">
                    {user?.name || "Super Admin"}
                  </p>
                </div>
              </div> */}
              <div className="dropdown-header">
  <FaUserCircle className="dropdown-user-icon" />
  <span className="dropdown-name">{user?.name || "Super Admin"}</span>
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
    {/* Breadcrumb Card */}
    <div className="breadcrumb-card">
     <span className="breadcrumb-module">{current.module}</span>
  <span className="breadcrumb-separator"> . </span>
  <span className="breadcrumb-page">{current.page}</span>
    </div>

    {/* Main Content Card */}
    <div className="content-card">
      <Outlet />
    </div>
  </main>
      </div>
    </div>
  );
};

export default SuperadminLayout;
