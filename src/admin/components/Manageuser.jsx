import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Modal, Pagination } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFileExcel, FaFilePdf, FaFileCsv } from "react-icons/fa";
import Adduser from "./Adduser";
const Manageuser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // Bulk selection
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showBulkViewModal, setShowBulkViewModal] = useState(false);
  const fetchUsers = async () => {                                                                                  
    try {
      const res = await axios.get("http://localhost:5000/api/admins");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  // Single delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admins/${id}`);
        fetchUsers();
        setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };
  // Bulk delete
  const handleBulkDelete = async () => {
    if (!selectedUsers.length) return;
    if (window.confirm(`Delete ${selectedUsers.length} selected users?`)) {
      try {
        await Promise.all(
          selectedUsers.map((id) =>
            axios.delete(`http://localhost:5000/api/admins/${id}`)
          )
        );
        setSelectedUsers([]);
        fetchUsers();
      } catch (error) {
        console.error("Bulk delete error", error);
      }
    }
  };
const exportToExcel = (data, filename = "users.xlsx") => {
  if (!data.length) return;
  const exportData = data.map((u) => ({
    Name: u.name,
    Email: u.email,
     Password: "********",
    Role: u.role,
    Status: u.status,
    Permission: Array.isArray(u.permissions) ? u.permissions.join(", ") : u.permissions || "",
  }));
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  XLSX.writeFile(workbook, filename);
};
// Export to CSV (.csv)
const exportToCSV = (data, filename = "users.csv") => {
  if (!data.length) return;
  const exportData = data.map((u) => ({
    Name: u.name,
    Email: u.email,
     Password: "********",
    Role: u.role,
    Status: u.status,
    Permission: Array.isArray(u.permissions) ? u.permissions.join(", ") : u.permissions || "",
  }));
  // Convert JSON to CSV string
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  // Create Blob with text/plain MIME type for Notepad
  const blob = new Blob([csv], { type: "text/plain;charset=utf-8" });
  saveAs(blob, filename);
};
const exportToPDF = (data, filename = "users.pdf", title = "User List") => {
  if (!data.length) return;
  const doc = new jsPDF();
  doc.text(title, 14, 10);
  autoTable(doc, {
    head: [["Name", "Email", "Password", "Role", "Status", "Permission"]],
    body: data.map((u) => [
      u.name,
      u.email,
       "********",
      u.role,
      u.status,
      Array.isArray(u.permissions) ? u.permissions.join(", ") : u.permissions || "",
      //  Removed lastLogin
    ]),
    startY: 20,
  });
  doc.save(filename);
};
  // const exportToPDF = (data, filename = "users.pdf", title = "User List") => {
  //   if (!data.length) return;
  //   const doc = new jsPDF();
  //   doc.text(title, 14, 10);
  //   autoTable(doc, {
  //     head: [["Name", "Email", "Password", "Role", "Status", "Permission"]],
  //     body: data.map((u) => [
  //       u.name,
  //       u.email,
  //       u.plainPassword,
  //       u.role,
  //       u.status,
  //       u.permissions,
  //     ]),
  //     startY: 20,
  //   });
  //   doc.save(filename);
  // };
  // ===== Filter + Pagination =====
  const filteredUsers = users.filter((u) => {
    const lowerSearch = search.toLowerCase();
    const perms = u.permissions?.join(", ") || "";
    return (
      u.name.toLowerCase().includes(lowerSearch) ||
      u.email.toLowerCase().includes(lowerSearch) ||
      (u.plainPassword || "").toLowerCase().includes(lowerSearch) ||
      (u.role || "").toLowerCase().includes(lowerSearch) ||
      (u.status || "").toLowerCase().includes(lowerSearch)
      // perms.toLowerCase().includes(lowerSearch)
    );
  });
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  // ===== Checkbox handlers =====
  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(currentUsers.map((u) => u._id));
    } else {
      setSelectedUsers([]);
    }
  };
  const toggleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };
  // ===== Get data for export =====
  const getExportData = () => {
    return selectedUsers.length
      ? users.filter((u) => selectedUsers.includes(u._id))
      : users;
  };
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  return (
    <div className="container mt-4">
      {/* Top controls */}
      <Row className="mb-3 align-items-center">
        <Col md={8}>
          <div className="d-flex gap-3">
           <Form.Control
  type="text"
  placeholder="Search by name, email, password, role or status"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "4px 8px", // smaller vertical & horizontal padding
    height: "34px",      // reduced height
    borderRadius: "4px", // slightly smaller radius
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    // color: "#e3dcdcff",
  }}
  className="custom-placeholder"
/>
<style>
{`
  .custom-placeholder::placeholder {
    color: #b0b0b0 !important; /* light grey placeholder */
    opacity: 1; /* ensure it's visible */
  }
`}
</style>
            <Form.Select
              value={usersPerPage}
              onChange={(e) => {
                setUsersPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ maxWidth: "160px" }}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={15}>15 per page</option>
              <option value={20}>20 per page</option>
            </Form.Select>
          </div>
        </Col>
        {/* Top Export + Delete Selected */}
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
          {selectedUsers.length > 0 && (
            <Button
              variant="danger"
              className="ms-2"
              onClick={handleBulkDelete}
              title="Delete Selected"
            >
              Delete Selected ({selectedUsers.length})
            </Button>
          )}
          {selectedUsers.length > 0 && (
  <>
    {/* <Button
      variant="info"
      className="ms-2"
      onClick={() => setShowBulkViewModal(true)}
      title="View Selected"
    >
      View Selected ({selectedUsers.length})
    </Button> */}
    
  </>
)}
        </Col>
      </Row>
      {/* Users Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={toggleSelectAll}
                checked={
                  currentUsers.length > 0 &&
                  selectedUsers.length === currentUsers.length
                }
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Status</th>
            <th>Permission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((u) => (
            <tr key={u._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedUsers.includes(u._id)}
                  onChange={() => toggleSelectUser(u._id)}
                />
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              {/* <td>{u.plainPassword}</td> */}
              <td>********</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              {/* <td>{u.permissions}</td> */}
              <td>{Array.isArray(u.permissions) ? u.permissions.join(", ") : u.permissions}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-1"
                  onClick={() => {
                    setSelectedUser(u);
                    setShowViewModal(true);
                  }}
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => {
                    setSelectedUser(u);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(u._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Pagination Controls */}
<div className="d-flex justify-content-center mt-3">
  <Pagination>
    <Pagination.Prev
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    />
    {[...Array(totalPages)].map((_, index) => (
      <Pagination.Item
        key={index + 1}
        active={index + 1 === currentPage}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next
      disabled={currentPage === totalPages}
      onClick={() =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
      }
    />
  </Pagination>
</div>
       <Modal
  show={showBulkViewModal}
  onHide={() => setShowBulkViewModal(false)}
  centered
  size="lg"
>
  <Modal.Header closeButton>
    <Modal.Title>View Selected Users</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedUsers.length === 0 ? (
      <p>No users selected.</p>
    ) : (
      users
        .filter((u) => selectedUsers.includes(u._id))
        .map((u) => (
          <div key={u._id} style={{ marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #ccc" }}>
            <p><strong>Name:</strong> {u.name}</p>
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Role:</strong> {u.role}</p>
            <p><strong>Status:</strong> {u.status}</p>
            <p><strong>Permissions:</strong> {u.permissions.join(", ")}</p>
          </div>
        ))
    )}
  </Modal.Body>
</Modal>
      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>View User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <p><strong>Permissions:</strong> {selectedUser.permissions.join(", ")}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            // <Adduser
            //   editData={selectedUser}
            //   onSuccess={() => {
            //     fetchUsers();
            //     setShowEditModal(false);
            //   }}
            // />
            <Adduser
  editData={selectedUser}
  onSuccess={(updatedUser) => {
    fetchUsers();
    setShowEditModal(false);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && updatedUser._id === currentUser.id) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...currentUser, permissions: updatedUser.permissions })
      );
      window.dispatchEvent(new Event("storage"));
    }
  }}
/>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Manageuser;
