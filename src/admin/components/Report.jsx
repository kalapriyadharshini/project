import React, { useState } from "react";
import axios from "axios";
import "./ReportGenerator.css";

const Report = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    menu: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [reportData, setReportData] = useState([]);

  // Field validation
  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return "This field is required";
    }
    return "";
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  //  Handle blur (field touched)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  // Class for valid/invalid states
  const getValidationClass = (field) => {
    if (!touched[field]) return "";
    return errors[field] ? "is-invalid" : "is-valid";
  };

  // Validate all before submit
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({
      startDate: true,
      endDate: true,
      menu: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { data } = await axios.get("http://localhost:5000/api/report", {
        params: formData,
      });
      setReportData(data);
    } catch (error) {
      console.error("Report fetch error:", error);
      setReportData([]);
    }
  };

  return (
    <div className="report-container">
      <h2>Generate Reports</h2>

      {/* <form className="report-form" onSubmit={handleSubmit}>
       
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getValidationClass("startDate")}
          />
          {touched.startDate && errors.startDate && (
            <div className="invalid-feedback">{errors.startDate}</div>
          )}
        </div>

       
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getValidationClass("endDate")}
          />
          {touched.endDate && errors.endDate && (
            <div className="invalid-feedback">{errors.endDate}</div>
          )}
        </div>

        
        <div className="form-group">
          <label>Select Menu:</label>
          <select
            name="menu"
            value={formData.menu}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getValidationClass("menu")}
          >
            <option value="">-- Select --</option>
            <option value="users">Users</option>
            <option value="categories">Categories</option>
            <option value="products">Products</option>
            <option value="customers">Customers</option>
            <option value="orders">Orders</option>
          </select>
          {touched.menu && errors.menu && (
            <div className="invalid-feedback">{errors.menu}</div>
          )}
        </div>
        <button type="submit" className="generate-btn">
          Generate Report
        </button>
      </form> */}


      <form className="report-form" onSubmit={handleSubmit}>
  
  <div className="date-group">
    <div className="form-group">
      <label>Start Date:</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        onBlur={handleBlur}
        className={getValidationClass("startDate")}
      />
      {touched.startDate && errors.startDate && (
        <div className="invalid-feedback">{errors.startDate}</div>
      )}
    </div>

    <div className="form-group">
      <label>End Date:</label>
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        onBlur={handleBlur}
        className={getValidationClass("endDate")}
      />
      {touched.endDate && errors.endDate && (
        <div className="invalid-feedback">{errors.endDate}</div>
      )}
    </div>
  </div>

  
  <div className="form-group" style={{ width: "90%" }}>
    <label>Select Menu:</label>
    <select
      name="menu"
      value={formData.menu}
      onChange={handleChange}
      onBlur={handleBlur}
      className={getValidationClass("menu")}
    >
      <option value="">-- Select --</option>
      <option value="users">Users</option>
      <option value="categories">Categories</option>
      <option value="products">Products</option>
      <option value="customers">Customers</option>
      <option value="orders">Orders</option>
    </select>
    {touched.menu && errors.menu && (
      <div className="invalid-feedback">{errors.menu}</div>
    )}
  </div>

  
  <button type="submit" className="generate-btn">
    Generate Report
  </button>
</form>


      {/* Report Result */}
      <div className="report-result">
        {reportData.length > 0 ? (
          <table>
            <thead>
              <tr>
                {Object.keys(reportData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val?.toString()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data found for selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Report;
