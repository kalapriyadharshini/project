import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddress as setAddressRedux } from "../redux/addressSlice";
import "./AddressPage.css";
const AddressPage = () => {
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    flat: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  //  Fetch profile and prefill address
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data) {
          setAddress({
            fullName: data.name || "",
            phone: data.phone || "",
            flat: data.address?.flat || "",
            area: data.address?.area || "",
            landmark: data.address?.landmark || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            pincode: data.address?.pincode || "",
            country: data.address?.country || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [token]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };
  const handleDeliver = () => {
    dispatch(setAddressRedux(address));
    navigate("/checkout/payment");
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/address",
        address,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.address) {
        setAddress({
          fullName: data.address.fullName || "",
          phone: data.address.phone || "",
          flat: data.address.flat || "",
          area: data.address.area || "",
          landmark: data.address.landmark || "",
          city: data.address.city || "",
          state: data.address.state || "",
          pincode: data.address.pincode || "",
          country: data.address.country || "",
        });
      }
      setEditing(false);
    } catch (err) {
      console.error("Error saving address:", err);
    }
  };
  return (
    <div className="address-page container mt-4">
      <h3>Delivery Address</h3>
      {/* 🔹 Show existing address */}
      {!editing ? (
        <div className="p-3 border rounded bg-light mb-3">
          <h5>{address.fullName || "No Name"}</h5>
          <p>
            {address.flat}, {address.area}, {address.landmark && `${address.landmark}, `}
            {address.city}, {address.state} - {address.pincode}, {address.country}
          </p>
          <p>Phone: {address.phone}</p>

          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button className="btn btn-primary" onClick={handleDeliver}>
              Deliver to this Address
            </button>
          </div>
        </div>
      ) : (
        // 🔹 Edit form
        <form onSubmit={handleSave} className="p-3 border rounded bg-white">
          <input
            className="form-control mb-2"
            type="text"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            className="form-control mb-2"
            type="text"
            name="flat"
            value={address.flat}
            onChange={handleChange}
            placeholder="Flat / House No."
            required
          />
          <input
            className="form-control mb-2"
            type="text"
            name="area"
            value={address.area}
            onChange={handleChange}
            placeholder="Area / Locality"
            required
          />
          <input
            className="form-control mb-2"
            type="text"
            name="landmark"
            value={address.landmark}
            onChange={handleChange}
            placeholder="Landmark"
          />
          <input
            className="form-control mb-2"
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            className="form-control mb-2"
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
          <input
            className="form-control mb-2"
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
          />
          <input
            className="form-control mb-2"
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />
          <input
            className="form-control mb-2"
            type="text"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <button type="submit" className="btn btn-success w-100">
            Save Address
          </button>
        </form>
      )}

      {!editing && (
        <button
          className="btn btn-link text-primary mt-3"
          onClick={() => {
            setAddress({
              fullName: "",
              phone: "",
              flat: "",
              area: "",
              landmark: "",
              city: "",
              state: "",
              pincode: "",
              country: "",
            });
            setEditing(true);
          }}
        >
          + Add New Address
        </button>
      )}
    </div>
  );
};

export default AddressPage;
