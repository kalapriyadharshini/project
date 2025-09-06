import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Address.css"; 

const Address = () => {
  const [address, setAddress] = useState({
    flat: "",
    area: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Fetch Address
  const fetchAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddress(res.data); 
      setLoading(false);
    } catch (err) {
      console.error("Error fetching address:", err);
      setLoading(false);
    }
  };

  // Update Address
  const updateAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/address", address, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Address updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Error updating address:", err);
      alert("Failed to update address");
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  if (loading) return <p className="address-loading">Loading address...</p>;

  return (
    <div className="address-container mt-4">
      <h3 className="address-title text-success fw-bold">My Address</h3>

      {!editMode ? (
        <div>
          <p className="address-text">
            {address.flat}, {address.area}, {address.landmark}
          </p>
          <p className="address-text">
            {address.city} - {address.pincode}, {address.state}, {address.country}
          </p>

          <button
            className="btn btn-primary mt-3"
            onClick={() => setEditMode(true)}
          >
            Edit Address
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateAddress();
          }}
        >
          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Flat / Door No."
                value={address.flat}
                onChange={(e) => setAddress({ ...address, flat: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Area"
                value={address.area}
                onChange={(e) => setAddress({ ...address, area: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Landmark"
                value={address.landmark}
                onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-3">
            Save Address
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-3 ms-2"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Address;
