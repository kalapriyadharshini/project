// import React, { useEffect, useState } from "react";
// import { Table, Button, Form, Row, Col, Pagination, Modal } from "react-bootstrap";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { FaFileExcel, FaFileCsv, FaFilePdf, FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import axios from "axios";
// import AddProduct from "./AddProduct"; // keep for edit
// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage, setProductsPerPage] = useState(10);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [modalShow, setModalShow] = useState(false);
//   const [modalMode, setModalMode] = useState("view"); // view / edit
//   const [currentProduct, setCurrentProduct] = useState(null);
//   useEffect(() => {
//     fetchProducts();
//   }, []);
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/adminproducts");
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };
//   // ----- Select / Bulk -----
//   const toggleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedProducts(currentProducts.map((p) => p._id));
//     } else {
//       setSelectedProducts([]);
//     }
//   };
//   const toggleSelectProduct = (id) => {
//     setSelectedProducts((prev) =>
//       prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
//     );
//   };
//   // ----- Delete -----
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/adminproducts/${id}`);
//       fetchProducts();
//       setSelectedProducts((prev) => prev.filter((pid) => pid !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting product.");
//     }
//   };
//   const handleBulkDelete = async () => {
//     if (!selectedProducts.length) return;
//     if (!window.confirm(`Delete ${selectedProducts.length} selected products?`)) return;
//     try {
//       await Promise.all(
//         selectedProducts.map((id) => axios.delete(`http://localhost:5000/api/adminproducts/${id}`))
//       );
//       fetchProducts();
//       setSelectedProducts([]);
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting selected products.");
//     }
//   };
//   // ----- Modal -----
//   const handleModalOpen = (mode, product = null) => {
//     setModalMode(mode);
//     setCurrentProduct(product);
//     setModalShow(true);
//   };
//   const handleModalClose = () => {
//     setModalShow(false);
//     setCurrentProduct(null);
//   };

//   // ----- Pagination & Filter -----
//   // const filteredProducts = products.filter(
//   //   (p) =>
//   //     p.name?.toLowerCase().includes(search.toLowerCase()) ||
//   //     p.status?.toLowerCase().includes(search.toLowerCase())
//   // );
//   const filteredProducts = products.filter((p) => {
//   const searchTerm = search.toLowerCase();
//   return (
//     p.category?.toLowerCase().includes(searchTerm) ||
//     p.name?.toLowerCase().includes(searchTerm) ||
//     p.price?.toString().toLowerCase().includes(searchTerm) ||
//     p.stock?.toString().toLowerCase().includes(searchTerm) ||
//     p.status?.toLowerCase().includes(searchTerm)
//   );
// });
//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   // ----- Export -----
//   const getExportData = () =>
//     selectedProducts.length
//       ? products.filter((p) => selectedProducts.includes(p._id))
//       : products;
//   const exportToExcel = (data) => {
//     if (!data.length) return;
//     const worksheet = XLSX.utils.json_to_sheet(
//       data.map((p) => ({
//         Category: p.category,
//         Name: p.name,
//         Price: p.price,
//         Stock: p.stock,
//         Status: p.status,
//         Image: p.image,
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
//     XLSX.writeFile(workbook, "products.xlsx");
//   };

//   const exportToCSV = (data) => {
//     if (!data.length) return;
//     const worksheet = XLSX.utils.json_to_sheet(
//       data.map((p) => ({
//         Category: p.category,
//         Name: p.name,
//         Price: p.price,
//         Stock: p.stock,
//         Status: p.status,
//         Image: p.image,
//       }))
//     );
//     const csv = XLSX.utils.sheet_to_csv(worksheet);
//     saveAs(new Blob([csv], { type: "text/plain;charset=utf-8" }), "products.csv");
//   };

//   const exportToPDF = (data) => {
//     if (!data.length) return;
//     const doc = new jsPDF();
//     doc.text("Product List", 14, 10);
//     autoTable(doc, {
//       head: [["Category", "Name", "Price", "Stock", "Status", "Image"]],
//       body: data.map((p) => [p.category, p.name, p.price, p.stock, p.status, p.image]),
//       startY: 20,
//     });
//     doc.save("products.pdf");
//   };

//   return (
//     <div className="container mt-4">
//       <Row className="mb-3 align-items-center">
//         <Col md={8}>
//           <div className="d-flex gap-3">
//             <Form.Control
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               style={{ maxWidth: "280px", height: "32px", padding: "18px", fontSize: "0.9rem" }}
//             />
//             <Form.Select
//               value={productsPerPage}
//               onChange={(e) => {
//                 setProductsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//               style={{ maxWidth: "140px" }}
//             >
//               <option value={5}>5 per page</option>
//               <option value={10}>10 per page</option>
//               <option value={15}>15 per page</option>
//               <option value={20}>20 per page</option>
//             </Form.Select>
//           </div>
//         </Col>
//         <Col md={4} className="text-end">
//           <Button variant="light" className="me-2" onClick={() => exportToCSV(getExportData())}>
//             <FaFileCsv size={22} color="orange" />
//           </Button>
//           <Button variant="light" className="me-2" onClick={() => exportToExcel(getExportData())}>
//             <FaFileExcel size={22} color="green" />
//           </Button>
//           <Button variant="light" onClick={() => exportToPDF(getExportData())}>
//             <FaFilePdf size={22} color="red" />
//           </Button>
//           {selectedProducts.length > 0 && (
//             <Button variant="danger" className="ms-2" onClick={handleBulkDelete}>
//               Delete Selected ({selectedProducts.length})
//             </Button>
//           )}
//         </Col>
//       </Row>

//       {/* Products Table */}
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>
//               <Form.Check
//                 type="checkbox"
//                 onChange={toggleSelectAll}
//                 checked={currentProducts.length > 0 && selectedProducts.length === currentProducts.length}
//               />
//             </th>
//             <th>S.no</th>
//             <th>Category</th>
//             <th>Product Name</th>
//             <th>Price (₹)</th>
//             <th>Stock</th>
//             <th>Status</th>
//             <th>Image</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentProducts.length > 0 ? (
//             currentProducts.map((p, index) => (
//               <tr key={p._id}>
//                 <td>
//                   <Form.Check
//                     type="checkbox"
//                     checked={selectedProducts.includes(p._id)}
//                     onChange={() => toggleSelectProduct(p._id)}
//                   />
//                 </td>
//                 <td>{indexOfFirst + index + 1}</td>
//                 <td>{p.category}</td>
//                 <td>{p.name}</td>
//                 <td>₹{p.price}</td>
//                 <td>{p.stock}</td>
//                 {/* <td>{p.status}</td> */}
//                 <td>
//   <Form.Check
//     type="switch"
//     id={`status-switch-${p._id}`}
//     checked={p.status === "Available"}
//     onChange={async (e) => {
//       const newStatus = e.target.checked ? "Available" : "Out of Stock";
//       await axios.put(`http://localhost:5000/api/adminproducts/${p._id}/status`, {
//         status: newStatus,
//       });
//       fetchProducts(); // refresh list
//     }}
//   />
// </td>
//                 <td>
//                   <img
//                     src={`http://localhost:5000/${p.image}`}
//                     alt={p.name}
//                     style={{ width: "80px", height: "80px", objectFit: "cover" }}
//                   />
//                 </td>
//                 <td>
//                   <Button variant="info" size="sm" className="me-1" onClick={() => handleModalOpen("view", p)}>
//                     <FaEye />
//                   </Button>
//                   <Button variant="warning" size="sm" className="me-1" onClick={() => handleModalOpen("edit", p)}>
//                     <FaEdit />
//                   </Button>
//                   <Button variant="danger" size="sm" onClick={() => handleDelete(p._id)}>
//                     <FaTrash />
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9" className="text-center">
//                 No products found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Pagination */}
//       <div className="d-flex justify-content-center mt-3">
//         <Pagination>
//           <Pagination.Prev
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           />
//           {[...Array(totalPages)].map((_, idx) => (
//             <Pagination.Item
//               key={idx + 1}
//               active={currentPage === idx + 1}
//               onClick={() => setCurrentPage(idx + 1)}
//             >
//               {idx + 1}
//             </Pagination.Item>
//           ))}
//           <Pagination.Next
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           />
//         </Pagination>
//       </div>

//       {/* Modal for View/Edit */}
//       <Modal show={modalShow} onHide={handleModalClose} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {modalMode === "edit" && "Edit Product"}
//             {modalMode === "view" && "View Product"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {modalMode === "view" && currentProduct ? (
//             <div className="p-3">
//               <p><strong>Category:</strong> {currentProduct.category}</p>
//               <p><strong>Product Name:</strong> {currentProduct.name}</p>
//               <p><strong>Price:</strong> ₹{currentProduct.price}</p>
//               <p><strong>Size:</strong> {currentProduct.size}</p>
//               <p><strong>Stock:</strong> {currentProduct.stock}</p>
//               <p><strong>Status:</strong> {currentProduct.status}</p>
//               <p><strong>Description:</strong></p>
//               <p>{currentProduct.description}</p>
//               <div className="text-center mt-3">
//                 <img
//                   src={`http://localhost:5000/${currentProduct.image}`}
//                   alt={currentProduct.name}
//                   style={{ width: "200px", height: "200px", objectFit: "cover" }}
//                 />
//               </div>
//             </div>
//           ) : (
//             <AddProduct
//               mode={modalMode}
//               product={currentProduct}
//               onClose={handleModalClose}
//               refreshList={fetchProducts}
//             />
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };
// export default ProductList;



import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Pagination, Modal } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFileExcel, FaFileCsv, FaFilePdf, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import AddProduct from "./AddProduct";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // view / edit
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/adminproducts");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // ----- Select / Bulk -----
  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(currentProducts.map((p) => p._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // ----- Delete -----
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/adminproducts/${id}`);
      fetchProducts();
      setSelectedProducts((prev) => prev.filter((pid) => pid !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedProducts.length) return;
    if (!window.confirm(`Delete ${selectedProducts.length} selected products?`)) return;
    try {
      await Promise.all(
        selectedProducts.map((id) => axios.delete(`http://localhost:5000/api/adminproducts/${id}`))
      );
      fetchProducts();
      setSelectedProducts([]);
    } catch (err) {
      console.error(err);
      alert("Error deleting selected products.");
    }
  };

  // ----- Modal -----
  const handleModalOpen = (mode, product = null) => {
    setModalMode(mode);
    setCurrentProduct(product);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setCurrentProduct(null);
  };

  // ----- Filter products: only enabled categories -----
  const filteredProducts = products.filter((p) => {
    const categoryObj = categories.find((c) => c.name === p.category);
    const isCategoryEnabled = categoryObj?.status === "Enable";

    const searchTerm = search.toLowerCase();

    return (
      isCategoryEnabled &&
      (p.category?.toLowerCase().includes(searchTerm) ||
        p.name?.toLowerCase().includes(searchTerm) ||
        p.price?.toString().toLowerCase().includes(searchTerm) ||
        p.stock?.toString().toLowerCase().includes(searchTerm) ||
        p.status?.toLowerCase().includes(searchTerm))
    );
  });

  // ----- Pagination -----
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // ----- Export -----
  const getExportData = () =>
    selectedProducts.length
      ? products.filter((p) => selectedProducts.includes(p._id))
      : products.filter((p) => categories.find((c) => c.name === p.category)?.status === "Enable");

  const exportToExcel = (data) => {
    if (!data.length) return;
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((p) => ({
        Category: p.category,
        Name: p.name,
        Price: p.price,
        Stock: p.stock,
        Status: p.status,
        Image: p.image,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };

  const exportToCSV = (data) => {
    if (!data.length) return;
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((p) => ({
        Category: p.category,
        Name: p.name,
        Price: p.price,
        Stock: p.stock,
        Status: p.status,
        Image: p.image,
      }))
    );
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    saveAs(new Blob([csv], { type: "text/plain;charset=utf-8" }), "products.csv");
  };

  const exportToPDF = (data) => {
    if (!data.length) return;
    const doc = new jsPDF();
    doc.text("Product List", 14, 10);
    autoTable(doc, {
      head: [["Category", "Name", "Price", "Stock", "Status", "Image"]],
      body: data.map((p) => [p.category, p.name, p.price, p.stock, p.status, p.image]),
      startY: 20,
    });
    doc.save("products.pdf");
  };

  return (
    <div className="container mt-4">
      <Row className="mb-3 align-items-center">
        <Col md={8}>
          <div className="d-flex gap-3">
            <Form.Control
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "280px", height: "32px", padding: "18px", fontSize: "0.9rem" }}
            />
            <Form.Select
              value={productsPerPage}
              onChange={(e) => {
                setProductsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ maxWidth: "140px" }}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={15}>15 per page</option>
              <option value={20}>20 per page</option>
            </Form.Select>
          </div>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="light" className="me-2" onClick={() => exportToCSV(getExportData())}>
            <FaFileCsv size={22} color="orange" />
          </Button>
          <Button variant="light" className="me-2" onClick={() => exportToExcel(getExportData())}>
            <FaFileExcel size={22} color="green" />
          </Button>
          <Button variant="light" onClick={() => exportToPDF(getExportData())}>
            <FaFilePdf size={22} color="red" />
          </Button>
          {selectedProducts.length > 0 && (
            <Button variant="danger" className="ms-2" onClick={handleBulkDelete}>
              Delete Selected ({selectedProducts.length})
            </Button>
          )}
        </Col>
      </Row>

      {/* Products Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={toggleSelectAll}
                checked={currentProducts.length > 0 && selectedProducts.length === currentProducts.length}
              />
            </th>
            <th>S.no</th>
            <th>Category</th>
            <th>Product Name</th>
            <th>Price (₹)</th>
            <th>offer</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((p, index) => (
              <tr key={p._id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedProducts.includes(p._id)}
                    onChange={() => toggleSelectProduct(p._id)}
                  />
                </td>
                <td>{indexOfFirst + index + 1}</td>
                <td>{p.category}</td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.offer}</td>
                <td>{p.stock}</td>
                <td>
                  {/* <Form.Check
                    type="switch"
                    id={`status-switch-${p._id}`}
                    checked={p.status === "Available"}
                    onChange={async (e) => {
                      const newStatus = e.target.checked ? "Available" : "Out of Stock";
                      await axios.put(`http://localhost:5000/api/adminproducts/${p._id}/status`, {
  status: newStatus,
});
console.log("PUT URL:", `http://localhost:5000/api/adminproducts/${p._id}/status`);
fetchProducts();
                      fetchProducts();
                    }}
                  /> */}
                  {/* <Form.Check
  type="switch"
  id={`status-switch-${p._id}`}
  checked={p.status === "Available"}
  disabled={p.status === "Available"} 
  onChange={async () => {
    try {
      await axios.put(`http://localhost:5000/api/adminproducts/${p._id}/status`, {
        status: "Available", 
      });
      fetchProducts();
    } catch (err) {
      console.error("Status update error:", err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  }}
/> */}
<Form.Check
  type="switch"
  id={`status-switch-${p._id}`}
  checked={p.status === "Available"}
  onChange={async () => {
    try {
      const newStatus = p.status === "Available" ? "Unavailable" : "Available";
      await axios.put(`http://localhost:5000/api/adminproducts/${p._id}/status`, {
        status: newStatus,
      });
      fetchProducts();
    } catch (err) {
      console.error("Status update error:", err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  }}
/>
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/${p.image}`}
                    alt={p.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <Button variant="info" size="sm" className="me-1" onClick={() => handleModalOpen("view", p)}>
                    <FaEye />
                  </Button>
                  <Button variant="warning" size="sm" className="me-1" onClick={() => handleModalOpen("edit", p)}>
                    <FaEdit />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(p._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item key={idx + 1} active={currentPage === idx + 1} onClick={() => setCurrentPage(idx + 1)}>
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          />
        </Pagination>
      </div>

      {/* Modal for View/Edit */}
      <Modal show={modalShow} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "edit" ? "Edit Product" : "View Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMode === "view" && currentProduct ? (
            <div className="p-3">
              <p><strong>Category:</strong> {currentProduct.category}</p>
              <p><strong>Product Name:</strong> {currentProduct.name}</p>
              <p><strong>Price:</strong> ₹{currentProduct.price}</p>
              <p><strong>Offer:</strong> ₹{currentProduct.offer}</p>
              <p><strong>Size:</strong> {currentProduct.size}</p>

              <p><strong>Stock:</strong> {currentProduct.stock}</p>
              <p><strong>Status:</strong> {currentProduct.status}</p>
              <p><strong>Description:</strong></p>
              <p>{currentProduct.description}</p>
              <div className="text-center mt-3">
                <img
                  src={`http://localhost:5000/${currentProduct.image}`}
                  alt={currentProduct.name}
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />
              </div>
            </div>
          ) : (
            <AddProduct mode={modalMode} product={currentProduct} onClose={handleModalClose} refreshList={fetchProducts} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;
