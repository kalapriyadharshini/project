import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Pagination } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
// import "jspdf-autotable";
import autoTable from "jspdf-autotable";

import { Document, Packer, Paragraph, TextRun } from "docx";
import { FaFileExcel, FaFileWord, FaFilePdf, FaFileCsv } from "react-icons/fa";

const Manageuser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // 

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admins/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  //  Export Excel
  // const exportExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(users);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  //   XLSX.writeFile(workbook, "users.xlsx");
  // };

  //  Export CSV
  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "users.csv");
  };

  // Export PDF (fixed)
  // const exportPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("User List", 14, 10);

  //   const tableColumn = ["Name", "Email", "Role", "Last Login", "Status"];
  //   const tableRows = users.map((u) => [
  //     u.name,
  //     u.email,
  //     u.role,
  //     u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "—",
  //     u.status,
  //   ]);
  
  const exportPDF = () => {
  const doc = new jsPDF();
  doc.text("User List", 14, 10);

  const tableColumn = ["Name", "Email", "Role", "Last Login", "Status"];
  const tableRows = users.map((u) => [
    u.name,
    u.email,
    u.role,
    u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "—",
    u.status,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save("users.pdf");
};


    // doc.autoTable({
    //   head: [tableColumn],
    //   body: tableRows,
    //   startY: 20,
    // });
//     autoTable(doc, {
//   head: [tableColumn],
//   body: tableRows,
//   startY: 20,
// });
// doc.save("users.pdf"); 
// };

  // Export Word
  const exportWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: "User List", bold: true, size: 28 })],
            }),
            ...users.map(
              (u) =>
                new Paragraph(
                  `${u.name} | ${u.email} | ${u.role} | ${
                    u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "—"
                  } | ${u.status}`
                )
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "users.docx");
  };

  //  Filter + Pagination
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        {/*  Export icons aligned to right */}
        <Col md={6} className="text-end">
          {/* <Button variant="light" className="me-2" onClick={exportExcel} title="Export Excel">
            <FaFileExcel size={24} color="green" />
          </Button> */}
          <Button variant="light" className="me-2" onClick={exportCSV} title="Export CSV">
            <FaFileCsv size={24} color="orange" />
          </Button>
          <Button variant="light" className="me-2" onClick={exportWord} title="Export Word">
            <FaFileWord size={24} color="blue" />
          </Button>
          <Button variant="light" onClick={exportPDF} title="Export PDF">
            <FaFilePdf size={24} color="red" />
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {/* <th>Last Login</th> */}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((u) => (
            <tr key={u._id}>
              <td>
                <Form.Check type="checkbox" />
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              {/* <td>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "—"}</td> */}
              <td>{u.status}</td>
              <td>
                {/* <Button variant="info" size="sm" className="me-1">
                  View
                </Button>
                <Button variant="warning" size="sm" className="me-1">
                  Edit
                </Button> */}
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

      {/*  Pagination */}
      <div className="d-flex justify-content-center">
        <Pagination>
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default Manageuser;
