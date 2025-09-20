// src/admin/pages/ProductList.jsx
import React, { useState } from "react";
import "./ProductList.css";
import { FaEdit, FaTrash, FaEye, FaFileExcel, FaFileCsv } from "react-icons/fa";

const ProductList = () => {
  // Empty for now – will fetch later
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  // Select row
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Select all
  const handleSelectAll = (e) => {
    setSelected(e.target.checked ? products.map((p) => p.id) : []);
  };

  // Bulk delete (placeholder for now)
  const handleBulkDelete = () => {
    setProducts(products.filter((p) => !selected.includes(p.id)));
    setSelected([]);
  };

  // Filtered products (empty until fetch)
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-table-container">
      {/* Header Section */}
      <div className="table-header">
        <h4>Product Table</h4>
        <div className="header-actions">
          <button className="download-btn excel">
            <FaFileExcel /> Excel
          </button>
          <button className="download-btn csv">
            <FaFileCsv /> CSV
          </button>
          {selected.length > 0 && (
            <button className="bulk-delete" onClick={handleBulkDelete}>
              Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === products.length && products.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th>S.no</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Product Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p, index) => (
              <tr key={p.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(p.id)}
                    onChange={() => handleSelect(p.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{p.category}</td>
                <td>{p.subcategory}</td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td
                  className={p.stock === "In Stock" ? "in-stock" : "out-stock"}
                >
                  {p.stock}
                </td>
                <td>
                  <img src={p.image} alt={p.name} className="product-img" />
                </td>
                <td>
                  <button className="action-btn edit">
                    <FaEdit />
                  </button>
                  <button className="action-btn view">
                    <FaEye />
                  </button>
                  <button className="action-btn delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
