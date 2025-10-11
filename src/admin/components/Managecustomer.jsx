import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Modal, Pagination } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel, FaFileCsv, FaEdit, FaTrash, FaEye, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const Managecustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: { city: "", country: "", pincode: "" },
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all customers
  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user");
      const sorted = Array.isArray(res.data)
        ? res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
      setCustomers(sorted);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };
  // Pagination & Filtering
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const filtered = customers.filter(
  (c) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.address?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.address?.country?.toLowerCase().includes(searchTerm.toLowerCase())
);
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  // Select / Deselect
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCustomers(currentItems.map((c) => c._id));
    } else {
      setSelectedCustomers([]);
    }
  };
  const handleSelectOne = (id) => {
    setSelectedCustomers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  // Bulk delete
  const handleDeleteSelected = async () => {
    if (selectedCustomers.length === 0) {
      alert("No customers selected!");
      return;
    }
    if (!window.confirm("Are you sure you want to delete selected customers?")) return;
    try {
      await Promise.all(
        selectedCustomers.map((id) =>
          axios.delete(`http://localhost:5000/api/user/${id}`)
        )
      );
      setCustomers(customers.filter((c) => !selectedCustomers.includes(c._id)));
      setSelectedCustomers([]);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  // Single delete
  const handleDeleteOne = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setCustomers(customers.filter((c) => c._id !== id));
      setSelectedCustomers((prev) => prev.filter((x) => x !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
const getExportData = () => {
  if (selectedCustomers.length > 0) {
    return customers.filter(c => selectedCustomers.includes(c._id));
  }
  return customers; // if none selected, export all
};
const exportToExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(
    data.map(c => ({
      Name: c.name || "-",
      Email: c.email || "-",
      Phone: c.phone || "-",
      City: c.address?.city || "-",
      Country: c.address?.country || "-",
    }))
  );
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Customers");
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([buf]), "customers.xlsx");
};
const exportToCSV = (data) => {
  const ws = XLSX.utils.json_to_sheet(
    data.map(c => ({
      Name: c.name || "-",
      Email: c.email || "-",
      Phone: c.phone || "-",
      City: c.address?.city || "-",
      Country: c.address?.country || "-",
    }))
  );
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "customers.csv");
};
const exportToPDF = (data) => {
  const doc = new jsPDF();
  const tableColumn = ["Name", "Email", "Phone", "City", "Country"];
  const tableRows = [];
  data.forEach((c) => {
    const customerData = [
      c.name || "-",
      c.email || "-",
      c.phone || "-",
      c.address?.city || "-",
      c.address?.country || "-",
    ];
    tableRows.push(customerData);
  });
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });
  doc.text("Customer List", 14, 15);
  doc.save("customers.pdf");
};
  // Edit modal
  const handleEdit = (customer) => {
    setCurrentCustomer(customer || {});
    setShowEdit(true);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "city" || name === "country" || name === "pincode") {
      setCurrentCustomer((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setCurrentCustomer((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/user/${currentCustomer._id}`,
        currentCustomer
      );
      setShowEdit(false);
      fetchCustomers();
    } catch (err) {
      console.error("Update error:", err);
    }
  }
 
// Add this function here
const handleView = (customer) => {
  setCurrentCustomer(customer);
  setShowView(true);
};

  return (
    <div className="manage-customer-container">
      <Row className="mb-3 align-items-center">
  <Col md={8} className="d-flex gap-3">
    <Form.Control
      type="text"
      placeholder="Search by name or email"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
       style={{
        maxWidth: "280px",
        height: "32px",          
        padding: "18px 18px",      
        fontSize: "0.9rem"       
      }}
    />
    <Form.Select
      value={itemsPerPage}
      style={{ maxWidth: "120px" }}
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
      }}
    >
      <option value={5}>5 per page</option>
      <option value={10}>10 per page</option>
      <option value={15}>15 per page</option>
      <option value={20}>20 per page</option>
    </Form.Select>
  </Col>
 <Col md={4} className="text-end">
  <Button
  variant="light"
  className="me-2"
  onClick={() => exportToCSV(getExportData())}
  title="Export CSV"
>
  <FaFileCsv size={24} color="orange" />
</Button>
<Button
  variant="light"
  className="me-2"
  onClick={() => exportToExcel(getExportData())}
  title="Export Excel"
>
  <FaFileExcel size={24} color="green" />
</Button>
<Button
  variant="light"
  onClick={() => exportToPDF(getExportData())}
  title="Export PDF"
>
  <FaFilePdf size={24} color="red" />
</Button>
          {selectedCustomers.length > 0 && (
            <Button variant="danger" className="ms-2" onClick={handleDeleteSelected}>
              Delete Selected ({selectedCustomers.length})
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
                checked={
                  selectedCustomers.length === currentItems.length &&
                  currentItems.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((c) => (
            <tr key={c._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedCustomers.includes(c._id)}
                  onChange={() => handleSelectOne(c._id)}
                />
              </td>
              <td>{c.name || "-"}</td>
              <td>{c.email || "-"}</td>
              <td>{c.phone || "-"}</td>
              <td>{c.address?.city || "-"}</td>
              <td>{c.address?.country || "-"}</td>
              <td>
                <Button size="sm" variant="primary" className="me-2" onClick={() => handleEdit(c)}>
                  <FaEdit />
                </Button>
                <Button size="sm" variant="info" className="me-2" onClick={() => handleView(c)}>
                  <FaEye />
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDeleteOne(c._id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Pagination */}
      <div className="pagination-container">
        <Pagination>
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCustomer && (
            <div>
              <p><b>Name:</b> {currentCustomer?.name || "-"}</p>
              <p><b>Email:</b> {currentCustomer?.email || "-"}</p>
              <p><b>Phone:</b> {currentCustomer?.phone || "-"}</p>
              <p><b>City:</b> {currentCustomer?.address?.city || "-"}</p>
              <p><b>Country:</b> {currentCustomer?.address?.country || "-"}</p>
              <p><b>Pincode:</b> {currentCustomer?.address?.pincode || "-"}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCustomer && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={currentCustomer?.name || ""}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={currentCustomer?.email || ""}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={currentCustomer?.phone || ""}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
  <Form.Label>City</Form.Label>
  <Form.Control
    name="city"
    value={currentCustomer?.address?.city || ""}
    onChange={handleEditChange}
  />
</Form.Group>
<Form.Group className="mb-2">
  <Form.Label>Country</Form.Label>
  <Form.Control
    name="country"
    value={currentCustomer?.address?.country || ""}
    onChange={handleEditChange}
  />
</Form.Group>
<Form.Group className="mb-2">
  <Form.Label>Pincode</Form.Label>
  <Form.Control
    name="pincode"
    value={currentCustomer?.address?.pincode || ""}
    onChange={handleEditChange}
  />
</Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Managecustomer;
