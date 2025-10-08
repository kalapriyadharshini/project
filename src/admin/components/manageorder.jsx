import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Modal, Pagination } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel, FaFileCsv, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // Fetch all orders
  useEffect(() => {
    fetchOrders();
  }, []);
  // const fetchOrders = async () => {
  //   try {
  //     // const res = await axios.get("http://localhost:5000/api/orders/myorders", {
  //     const res = await axios.get("http://localhost:5000/api/orders", {

  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     });
  //     const sorted = Array.isArray(res.data.orders)
  //       ? res.data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //       : [];
  //     setOrders(sorted);
  //   } catch (err) {
  //     console.error("Error fetching orders:", err);
  //   }
  // };
  // manageorder.jsx
// const fetchOrders = async () => {
//   try {
//     // Get token from localStorage
//     const token = localStorage.getItem("token"); 
//    console.log(localStorage.getItem("token"));
//     if (!token) {
//       console.error("No token found! User might not be logged in.");
//       return;
//     }
//     const { data } = await axios.get(
//       "http://localhost:5000/api/orders/myorders",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // send token to backend
//         },
//       }
//     );
//     console.log(data.orders);
//     setOrders(data.orders); // if you have a state to save orders
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//   }
// };
const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found! User might not be logged in.");
      return;
    }
    let data;
    try {
      // Try admin route first
      ({ data } = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      }));
    } catch (err) {
      if (err.response && err.response.status === 403) {
        // fallback to user route if forbidden
        ({ data } = await axios.get("http://localhost:5000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        }));
      } else {
        throw err;
      }
    }
    console.log("Fetched orders:", data.orders);
    setOrders(data.orders || []);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};
  // Pagination & Filtering
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const filtered = orders.filter(
    (o) =>
      o._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  // Select / Deselect
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(currentItems.map((o) => o._id));
    } else {
      setSelectedOrders([]);
    }
  };
  const handleSelectOne = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  // Delete orders
  const handleDeleteOne = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Token:", localStorage.getItem("token"));

      setOrders(orders.filter((o) => o._id !== id));
      setSelectedOrders((prev) => prev.filter((x) => x !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteSelected = async () => {
    if (selectedOrders.length === 0) return alert("No orders selected!");
    if (!window.confirm("Delete selected orders?")) return;

    try {
      await Promise.all(
        selectedOrders.map((id) =>
          axios.delete(`http://localhost:5000/api/orders/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
        )
      );
      setOrders(orders.filter((o) => !selectedOrders.includes(o._id)));
      setSelectedOrders([]);
    } catch (err) {
      console.error(err);
    }
  };
  // Update status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: res.data.status } : o))
      );
    } catch (err) {
      console.error("Status update error:", err);
    }
  };
  // Export functions
  const getExportData = () =>
    selectedOrders.length ? orders.filter((o) => selectedOrders.includes(o._id)) : orders;
  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(
      data.map((o) => ({
        "Order ID": o._id,
        "Customer Name": o.customerName,
        "Customer Email": o.customerEmail,
        "Products": o.products.map((p) => `${p.name} (${p.quantity})`).join(", "),
        "Total Price": o.totalAmount,
        "Status": o.status,
        "Date": new Date(o.createdAt).toLocaleDateString(),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    saveAs(new Blob([XLSX.write(wb, { bookType: "xlsx", type: "array" })]), "orders.xlsx");
  };
  const exportToCSV = (data) => {
    const ws = XLSX.utils.json_to_sheet(
      data.map((o) => ({
        "Order ID": o._id,
        "Customer Name": o.customerName,
        "Customer Email": o.customerEmail,
        "Products": o.products.map((p) => `${p.name} (${p.quantity})`).join(", "),
        "Total Price": o.totalAmount,
        "Status": o.status,
        "Date": new Date(o.createdAt).toLocaleDateString(),
      }))
    );
    saveAs(new Blob([XLSX.utils.sheet_to_csv(ws)], { type: "text/csv;charset=utf-8;" }), "orders.csv");
  };
  const exportToPDF = (data) => {
    const doc = new jsPDF();
    const tableColumn = ["Order ID", "Customer", "Email", "Products", "Total", "Status", "Date"];
    const tableRows = data.map((o) => [
      o._id,
      o.customerName,
      o.customerEmail,
      o.products.map((p) => `${p.name} (${p.quantity})`).join(", "),
      o.totalAmount,
      o.status,
      new Date(o.createdAt).toLocaleDateString(),
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.text("Orders List", 14, 15);
    doc.save("orders.pdf");
  };
  const handleView = async (orderId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCurrentOrder(res.data);
      setShowView(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="manage-orders-container">
      <Row className="mb-3 align-items-center">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search by Order ID, Name, Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
        </Col>
        <Col md={4} className="text-end">
          <Button className="me-2" onClick={() => exportToCSV(getExportData())}><FaFileCsv /></Button>
          <Button className="me-2" onClick={() => exportToExcel(getExportData())}><FaFileExcel /></Button>
          <Button className="me-2" onClick={() => exportToPDF(getExportData())}><FaFileExcel /></Button>
          {selectedOrders.length > 0 && (
            <Button variant="danger" onClick={handleDeleteSelected}>
              Delete Selected ({selectedOrders.length})
            </Button>
          )}
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                checked={selectedOrders.length === currentItems.length && currentItems.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((o) => (
            <tr key={o._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedOrders.includes(o._id)}
                  onChange={() => handleSelectOne(o._id)}
                />
              </td>
              <td>{o._id}</td>
              <td>{o.customerName}</td>
              <td>{o.customerEmail}</td>
              <td>{o.products.map((p) => `${p.name} (${p.quantity})`).join(", ")}</td>
              <td>{o.totalAmount}</td>
              <td>
                <Form.Select
                  value={o.status}
                  onChange={(e) => handleStatusChange(o._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
              </td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td>
                <Button size="sm" variant="info" className="me-2" onClick={() => handleView(o._id)}>
                  <FaEye />
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDeleteOne(o._id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination-container">
        <Pagination>
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentOrder && (
            <div>
              <p><b>Order ID:</b> {currentOrder._id}</p>
              <p><b>Customer:</b> {currentOrder.customerName} ({currentOrder.customerEmail})</p>
              <p><b>Products:</b> {currentOrder.products.map(p => `${p.name} (${p.quantity})`).join(", ")}</p>
              <p><b>Total Price:</b> {currentOrder.totalAmount}</p>
              <p><b>Status:</b> {currentOrder.status}</p>
              <p><b>Shipping:</b> {currentOrder.shippingAddress?.flat}, {currentOrder.shippingAddress?.area}, {currentOrder.shippingAddress?.city}, {currentOrder.shippingAddress?.state}, {currentOrder.shippingAddress?.country} - {currentOrder.shippingAddress?.pincode}</p>
              <p><b>Date:</b> {new Date(currentOrder.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ManageOrders;

