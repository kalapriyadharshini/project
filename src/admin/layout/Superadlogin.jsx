import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import loginImg from "../../assets/adminpanel.jpg";
const Superadlogin = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!username) errors.username = "Invalid user name";
    if (!password) errors.password = "Invalid password";
    setError(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      const res = await fetch("http://localhost:5000/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password })
});
      const data = await res.json();

      if (res.ok) {
  console.log("Login successful:", data);

  // save token + user info
  localStorage.setItem("token", data.token);
  localStorage.setItem("currentUser", JSON.stringify(data.user));

  navigate("/superadmin");  // ✅ this matches your route
  //  redirect to welcome page
  alert("Login successful!");
} else {
  setError({ username: data.message });
}

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again later.");
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-left">
          <h2 className="logo-text">BLUEVIN</h2>
          <p className="tagline">Where aquatic data drives decision</p>
          <div className="login-illustration">
            <img src={loginImg} alt="Admin Secure Login" />
          </div>
        </div>

        <div className="login-right">
          <h3 className="login-title">Log in as a admin user</h3>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {error.username && <p className="error">{error.username}</p>}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && <p className="error">{error.password}</p>}
            </div>

            <button type="submit" className="btn-login">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Superadlogin;
