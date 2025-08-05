// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const Profile = () => {
//   const navigate = useNavigate();
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   useEffect(() => {
//     if (!storedUser) {
//       navigate("/login");
//     }
//   }, [storedUser, navigate]);
//   if (!storedUser) return null;
//   return (
//     <div className="profile-container">
//       <h2 className="mb-4">Welcome, {storedUser.name || "User"}!</h2>
//       <div className="profile-info">
//         <p><strong>Email:</strong> {storedUser.email}</p>
//       </div>
//     </div>
//   );
// };
// export default Profile;




// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Profile() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/user/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data.user);
//       } catch (err) {
//         console.error("Error fetching profile", err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (!user) return <div>Loading profile...</div>;

//   return (
//     <div className="container my-4">
//       <h2 className="mb-3 text-primary">My Profile</h2>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Phone:</strong> {user.phone}</p>
//       <p><strong>Address:</strong> {user.flat}, {user.area}, {user.city}, {user.state}, {user.country} - {user.pincode}</p>
//     </div>
//   );
// }

// export default Profile;




// frontend/pages/Profile.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const res = await axios.get("http://localhost:5000/api/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Profile fetch error:", err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!profile) return <p>Loading profile...</p>;

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <p><strong>Name:</strong> {profile.name}</p>
//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>Phone:</strong> {profile.phone}</p>
//       <p><strong>Address:</strong></p>
//       <ul>
//         <li>Flat: {profile.flat}</li>
//         <li>Area: {profile.area}</li>
//         <li>Landmark: {profile.landmark}</li>
//         <li>City: {profile.city}</li>
//         <li>State: {profile.state}</li>
//         <li>Pincode: {profile.pincode}</li>
//         <li>Country: {profile.country}</li>
//       </ul>
//     </div>
//   );
// };

// export default Profile;



// Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="container mt-4">
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <h5 className="mt-3">Address:</h5>
      <p>{profile.address.flat}, {profile.address.area}, {profile.address.landmark}</p>
      <p>{profile.address.city} - {profile.address.pincode}, {profile.address.state}, {profile.address.country}</p>
    </div>
  );
};

export default Profile;
