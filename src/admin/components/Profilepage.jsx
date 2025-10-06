// src/pages/Profilepage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profilepage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    axios
      .get(`http://localhost:5000/api/admins/${currentUser.id}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Error fetching profile", err);
        setUser(currentUser); // fallback
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading profile...</p>;

  if (!user) return <p>No user data found.</p>;

  return (
    <div style={{ backgroundColor: "#b2ecf2", minHeight: "100vh", padding: "40px" }}>
      <div className="container d-flex justify-content-center">
        <div
          className="card shadow-lg"
          style={{ maxWidth: "600px", width: "100%", borderRadius: "12px", backgroundColor: "white" }}
        >
          <div className="card-body">
            <h3 className="card-title mb-4 text-left">Profile</h3>
            <table className="table">
             <tbody>
  <tr><th>Name</th><td>{user.name}</td></tr>
  <tr><th>Email</th><td>{user.email}</td></tr>
  {/* <tr><th>Password</th><td>{user.plainPassword}</td></tr> */}
  <tr><th>Password</th><td>********</td></tr>

  <tr><th>Role</th><td>{user.role}</td></tr>
  <tr><th>Status</th><td>{user.status || "Active"}</td></tr>
  <tr><th>Permissions</th><td>{user.permissions?.length > 0 ? user.permissions.join(", ") : "None"}</td></tr>
</tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
