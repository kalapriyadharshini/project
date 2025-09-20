import React from "react";

const WelcomePage = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user?.name || "Admin"} 👋</h1>
      <p>You are logged in as <strong>{user?.email}</strong></p>
      <p>Role: <strong>{user?.role}</strong></p>
    </div>
  );
};

export default WelcomePage;
