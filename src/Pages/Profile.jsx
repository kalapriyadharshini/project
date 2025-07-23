import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    }
  }, [storedUser, navigate]);

  if (!storedUser) return null;

  return (
    <div className="profile-container">
      <h2 className="mb-4">Welcome, {storedUser.name || "User"}!</h2>
      <div className="profile-info">
        <p><strong>Email:</strong> {storedUser.email}</p>
        {/* Add more profile details here */}
      </div>
    </div>
  );
};

export default Profile;

