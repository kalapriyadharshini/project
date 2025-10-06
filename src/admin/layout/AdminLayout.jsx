// src/components/AdminLayout.jsx
import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaLayerGroup,
  FaUsers,
  FaShoppingCart,
  FaQuestionCircle,
  FaWarehouse,
  FaUserTie,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaUserCircle,
  FaBars,
  FaChevronRight,
} from "react-icons/fa";
import "./AdminLayout.css";
const AdminLayout = () => {
const location = useLocation();
const [openDropdown, setOpenDropdown] = useState(null);
// const adminUser = JSON.parse(localStorage.getItem("adminUser")); 
// const permissions = adminUser?.permissions || [];
const currentUser = JSON.parse(localStorage.getItem("currentDashboardUser")); 
const permissions = currentUser?.permissions || [];
console.log(currentUser);     
console.log(permissions);    
const toggleDropdown = (menu) => {
  setOpenDropdown(openDropdown === menu ? null : menu);
};
  const headerMap = {
  "/admin/dashboard": { module: "DASHBOARD", page: "Overview" },
  "/admin/users": { module: "USER MODULES", page: " Users" },
  "/admin/users/add": { module: "USER MODULES", page: " new Users" },
  "/admin/users/list": { module: "USER MODULES", page: " Manage user" },
  "/admin/category": { module: "CATEGORY MODULES", page: "Categories" },
  "/admin/category/add": { module: "CATEGORY MODULES", page: "Add Category" },
  "/admin/category/list": { module: "CATEGORY MODULES", page: "Category Table" },
  "/admin/products": { module: "PRODUCT MODULES", page: "Products" },
  "/admin/products/add": { module: "PRODUCT MODULES", page: "Add Product" },
  "/admin/products/list": { module: "PRODUCT MODULES", page: "Product Table" },
  "/admin/customer": { module: " CUSTOMER MODULES", page: "customer" },
  "/admin/customer/list": { module: "CUSTOMER MODULES", page: "customer Table" },
  "/admin/order": { module: "ORDER MODULES", page: "Orders" },
  "/admin/orders/list": { module: "ORDER MODULES", page: "Orders Table" },
  "/admin/inventory": { module: "INVENTORY MODULES", page: "Stock" },
  "/admin/inventory/list": { module: "INVENTORY MODULES", page: "inventory table" },
  "/admin/reports": { module: "REPORT MODULES", page: "Analytics" },
  "/admin/settings": { module: "SETTINGS", page: "Configuration" },
  };
  const current = headerMap[location.pathname] || {
    module: "DASHBOARD",
    page: "Overview",
  };
  const permissionMenus = [
  {
    label: "Categories",
    perm: "Categories",
    icon: <FaLayerGroup className="icon" />,
    submenus: [
      // { label: "new Category", path: "/admin/category/add" },
      { label: "Manage category", path: "/admin/category/list" },
    ],
  },
  {
    label: "Products",
    perm: "Products",
    icon: <FaBox className="icon" />,
    submenus: [
      { label: "new Product", path: "/admin/products/add" },
      { label: "Manage product", path: "/admin/products/list" },
    ],
  },
  {
    label: "Customers",
    perm: "Customers",
    icon: <FaUsers className="icon" />,
    submenus: [
      { label: "Manage customer", path: "/admin/customer/list" },
    ],
  },
  {
    label: "Orders",
    perm: "Orders",
    icon: <FaShoppingCart className="icon" />,
    submenus: [
      { label: "Manage orders", path: "/admin/orders/list" },
    ],
  },
  {
    label: "Inventory",
    perm: "Inventory",
    icon: <FaWarehouse className="icon" />,
    submenus: [
      { label: "Manage Inventory", path: "/admin/inventory/list" },
    ],
  },
];
  return (
<div className="admin-container">
  <aside className="admin-sidebar">
    <h2 className="admin-logo">BLUEVIN</h2>
    <nav>
      <ul>
        {/* Dashboard (always visible) */}
        <li>
          <NavLink to="/admin/dashboard">
            <FaTachometerAlt className="icon" /> Dashboard
          </NavLink>
        </li>

        {/* User Module (always visible) */}
        <li>
          <div
            className={`sidebar-dropdown ${openDropdown === "users" ? "open" : ""}`}
            onClick={() => toggleDropdown("users")}
          >
            <FaUserTie className="icon" />
            <span>User</span>
            <FaChevronRight className="arrow-icon" />
          </div>
          {openDropdown === "users" && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/users/add">New User</NavLink>
              </li>
              <li>
                <NavLink to="/admin/users/list">Manage User</NavLink>
              </li>
            </ul>
          )}
        </li>
        {/* categories */}
        <li>
          <div
            className={`sidebar-dropdown ${openDropdown === "category" ? "open" : ""}`}
            onClick={() => toggleDropdown("category")}
          >
            <FaLayerGroup className="icon" />
            <span>Categories</span>
            <FaChevronRight className="arrow-icon" />
          </div>
          {openDropdown === "category" && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/category/add">New category</NavLink>
              </li>
              <li>
                <NavLink to="/admin/category/list">Manage category</NavLink>
              </li>
            </ul>
          )}
        </li>
        {/* products */}
         <li>
          <div
            className={`sidebar-dropdown ${openDropdown === "products" ? "open" : ""}`}
            onClick={() => toggleDropdown("products")}
          >
            <FaBox className="icon" />
            <span>Products</span>
            <FaChevronRight className="arrow-icon" />
          </div>
          {openDropdown === "products" && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/products/add">New Products</NavLink>
              </li>
              <li>
                <NavLink to="/admin/products/list">Manage Products</NavLink>
              </li>
            </ul>
          )}
        </li>
        {/* customer */}
        <li>
          <div
            className={`sidebar-dropdown ${openDropdown === "customer" ? "open" : ""}`}
            onClick={() => toggleDropdown("customer")}
          >
            <FaUsers className="icon" /> 
            <span>Customer</span>
            <FaChevronRight className="arrow-icon" />
          </div>
          {openDropdown === "customer" && (
            <ul className="submenu">
              {/* <li>
                <NavLink to="/admin/customer/add">New Customer</NavLink>
              </li> */}
              <li>
                <NavLink to="/admin/customer/list">Manage Customer</NavLink>
              </li>
            </ul>
          )}
        </li>
        {/* orders */}
        <li>
          <div
            className={`sidebar-dropdown ${openDropdown === "orders" ? "open" : ""}`}
            onClick={() => toggleDropdown("orders")}
          >
            <FaShoppingCart className="icon" />
            <span>Orders</span>
            <FaChevronRight className="arrow-icon" />
          </div>
          {openDropdown === "orders" && (
            <ul className="submenu">
              
              <li>
                <NavLink to="/admin/orders/list">Manage Orders</NavLink>
              </li>
            </ul>
          )}
        </li>
    {/* Inventory */}
        <li>
          <div
            className={`sidebar-dropdown ${openDropdown === "inventory" ? "open" : ""}`}
            onClick={() => toggleDropdown("inventory")}
          >
             <FaWarehouse className="icon" /> 
            <span>Inventory</span>
            <FaChevronRight className="arrow-icon" />
          </div>
          {openDropdown === "inventory" && (
            <ul className="submenu">
              
              <li>
                <NavLink to="/admin/inventory/list">Inventory Orders</NavLink>
              </li>
            </ul>
          )}
        </li>
        {/* Reports (always visible) */}
        <li>
          <NavLink to="/admin/reports">
            <FaChartBar className="icon" /> Reports
          </NavLink>
        </li>

        {/* Settings (always visible) */}
        <li>
          <NavLink to="/admin/settings">
            <FaCog className="icon" /> Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>

  <main className="admin-main">
    <header className="admin-header">
      <FaBars className="menu-icon" />
   
<div className="admin-profile-card">
  <div className="profile-header">
    <FaUserCircle className="profile-icon" />
    <div className="profile-info">
      <span className="profile-name">User Admin</span>
      <span className="profile-role">Admin</span>
    </div>
  </div>

  <div className="profile-dropdown">
    <ul>
      <li
        onClick={() => {
          localStorage.removeItem("token"); // clear admin token
          localStorage.removeItem("currentDashboardUser"); // optional: clear user info
          window.location.href = "/adminlogin"; // redirect to login
        }}
      >
        <i className="fas fa-sign-out-alt"></i> Logout
      </li>
    </ul>
  </div>
</div>
    </header>
    <div className="admin-breadcrumb">
      <span className="breadcrumb-module">{current.module}</span>
      <span className="breadcrumb-separator"> . </span>
      <span className="breadcrumb-page">{current.page}</span>
    </div>
    <section className="admin-content">
      <Outlet />
    </section>
  </main>
</div>
  );
};
export default AdminLayout;

 
           