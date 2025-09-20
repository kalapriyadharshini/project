import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalSales: 0,
  });

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get("/dashboard");
        setStats(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h4>Customers</h4>
          <p>{stats.totalCustomers}</p>
        </div>
        <div className="dashboard-card">
          <h4>Products</h4>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="dashboard-card">
          <h4>Orders</h4>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="dashboard-card">
          <h4>Total Sales</h4>
          <p>{stats.totalSales}</p>
        </div>
        <div className="dashboard-card">
          <h4>Total Revenue</h4>
          <p>₹{stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
