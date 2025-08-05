import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Table, Image } from "react-bootstrap";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";
import { setUser } from "../redux/userSlice";
import "./OrderSummaryPage.css";

const OrderSummaryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.user.userInfo);
console.log("UserInfo:", userInfo);

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const subtotal = safeCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const roundedSubtotal = Math.round(subtotal * 100) / 100;

  const address = userInfo?.address ?? {};

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !userInfo) {
        alert("User not logged in");
        return navigate("/login?mode=login");
      }

      const requiredFields = [
        "flat",
        "area",
        "city",
        "pincode",
        "country",
        "state",
      ];

      for (const field of requiredFields) {
        if (!address[field]) {
          alert(`Missing required field: ${field}`);
          return;
        }
      }

      const orderPayload = {
        userId: userInfo.id || userInfo._id,
        products: safeCartItems.map((item) => ({
          productId: item._id || item.id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          flat: address.flat,
          area: address.area,
          landmark: address.landmark,
          city: address.city,
          pincode: address.pincode,
          country: address.country,
          state: address.state,
        },
        paymentMethod: "cod",
        totalAmount: roundedSubtotal,
      };

      const res = await axios.post("/api/orders", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      dispatch(clearCart());
      navigate("/order-success");
    } catch (error) {
      console.error("Order Error:", error.response?.data || error.message);
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div className="order-summary-page container py-4">
      <h2 className="mb-4">Order Summary</h2>

      <div className="user-details mb-4">
        <h4>Shipping To:</h4>
        <p>
          <strong>{userInfo?.name ?? "Name not available"}</strong>
        </p>
        <p>
          {userInfo?.email ?? "Email missing"} | {userInfo?.phone ?? "Phone missing"}
        </p>
        <p>
          {address.flat ?? "Flat"}, {address.area ?? "Area"}
          {address.landmark ? `, ${address.landmark}` : ""}
        </p>
        <p>
          {address.city ?? "City"} - {address.pincode ?? "PIN"}, {address.state ?? "State"},{" "}
          {address.country ?? "Country"}
        </p>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price (₹)</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {safeCartItems.map((item, index) => (
            <tr key={index}>
              <td>
                <Image
                  src={item.image || "https://via.placeholder.com/50"}
                  alt={item.name}
                  width={50}
                  height={50}
                  rounded
                />
              </td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="text-end fw-bold">
              Subtotal
            </td>
            <td className="fw-bold">₹{roundedSubtotal}</td>
          </tr>
        </tbody>
      </Table>

      <div className="text-end mt-4">
        <Button variant="success" onClick={handlePlaceOrder}>
          Place Order (Cash on Delivery)
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
