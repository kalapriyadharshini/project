import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Row, Col, Pagination } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AddCategoryForm from "./Addcategoryform";
import { FaFileExcel, FaFilePdf, FaFileCsv } from "react-icons/fa";
const Addcategorytable = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  // Single delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
      setSelectedCategories(prev => prev.filter(cid => cid !== id));
    }
  };
  // Bulk delete
  const handleBulkDelete = async () => {
    if (!selectedCategories.length) return;
    if (window.confirm(`Delete ${selectedCategories.length} selected categories?`)) {
      await Promise.all(selectedCategories.map(id => axios.delete(`http://localhost:5000/api/categories/${id}`)));
      setSelectedCategories([]);
      fetchCategories();
    }
  };
  // Exports
  const getExportData = () => {
    return selectedCategories.length
      ? categories.filter(c => selectedCategories.includes(c._id))
      : categories;
  };
  const exportToExcel = (data, filename = "categories.xlsx") => {
    if (!data.length) return;
    const worksheet = XLSX.utils.json_to_sheet(data.map(c => ({
      Name: c.name,
      Status: c.status,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");
    XLSX.writeFile(workbook, filename);
  };
  const exportToCSV = (data, filename = "categories.csv") => {
    if (!data.length) return;
    const worksheet = XLSX.utils.json_to_sheet(data.map(c => ({
      Name: c.name,
      Status: c.status,
    })));
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  };
  const exportToPDF = (data, filename = "categories.pdf", title = "Category List") => {
    if (!data.length) return;
    const doc = new jsPDF();
    doc.text(title, 14, 10);
    autoTable(doc, {
      head: [["Name", "Status"]],
      body: data.map(c => [c.name, c.status]),
      startY: 20,
    });
    doc.save(filename);
  };
  // Filter & pagination
  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.status.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const currentItems = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  // Checkbox handlers
  const toggleSelectAll = e => {
    if (e.target.checked) setSelectedCategories(currentItems.map(c => c._id));
    else setSelectedCategories([]);
  };
  const toggleSelect = id => {
    setSelectedCategories(prev => prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]);
  };
  return (
    <div className="container mt-4">
      {/* Top controls */}
      <Row className="mb-3 align-items-center">
        <Col md={8} className="d-flex gap-3">
          {/* <Form.Control
            placeholder="Search by name or status"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: "300px" }}
          /> */}
          <Form.Control
      placeholder="Search by name or status"
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{
        maxWidth: "280px",
        height: "32px",          // smaller height
        padding: "18px 18px",      // reduced padding inside input
        fontSize: "0.9rem"       // slightly smaller font
      }}
    />
          <Form.Select
            value={perPage}
            onChange={e => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}
            style={{ maxWidth: "120px" }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
          </Form.Select>
        </Col>
        <Col md={4} className="text-end">
          {/* <Button variant="light" className="me-2" onClick={() => exportToCSV(getExportData())}>CSV</Button>
          <Button variant="light" className="me-2" onClick={() => exportToExcel(getExportData())}>Excel</Button>
          <Button variant="light" onClick={() => exportToPDF(getExportData())}>PDF</Button> */}
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
          {selectedCategories.length > 0 && (
            <Button variant="danger" className="ms-2" onClick={handleBulkDelete}>
              Delete Selected ({selectedCategories.length})
            </Button>
          )}
        </Col>
      </Row>
      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={toggleSelectAll}
                checked={currentItems.length && selectedCategories.length === currentItems.length}
              />
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(c => (
            <tr key={c._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedCategories.includes(c._id)}
                  onChange={() => toggleSelect(c._id)}
                />
              </td>
              <td>{c.name}</td>
              <td>{c.status}</td>
  
     {/* <Form.Check 
  type="switch"
  id={`status-switch-${c._id}`}
  checked={c.status === "Enable"}
  onChange={async (e) => {
    const newStatus = e.target.checked ? "Enable" : "Disable";
    await axios.post("http://localhost:5000/api/categories/save", { 
      _id: c._id,   
      name: c.name, 
      status: newStatus 
    });
    fetchCategories();
  }}
/> */}

              <td>
                <Button size="sm" variant="info" className="me-2" onClick={() => { setSelectedCategory(c); setShowViewModal(true); }}>View</Button>
                <Button size="sm" variant="warning" className="me-2" onClick={() => { setSelectedCategory(c); setShowEditModal(true); }}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(c._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}/>
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item key={i+1} active={i+1===currentPage} onClick={()=>setCurrentPage(i+1)}>{i+1}</Pagination.Item>
          ))}
          <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev+1,totalPages))}/>
        </Pagination>
      </div>
      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>View Category</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedCategory && (
            <div>
              <p><strong>Name:</strong> {selectedCategory.name}</p>
              <p><strong>Status:</strong> {selectedCategory.status}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      {/* Edit Modal */}
      {/* <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Edit Category</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedCategory && (
            <AddCategoryForm
              editData={selectedCategory}
              onSuccess={() => { fetchCategories(); setShowEditModal(false); }}
            />
          )}
        </Modal.Body>
      </Modal> */}
      {/* Edit Modal */}
<Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Edit Category</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedCategory && (
      <AddCategoryForm
        category={selectedCategory}              //  pass whole category object
        onClose={() => setShowEditModal(false)}  //  close modal on success/cancel
        onCategoryAdded={fetchCategories}        //  refresh table after add/edit
      />
    )}
  </Modal.Body>
</Modal>

    </div>
  );
};
export default Addcategorytable;
