import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Modal, Pagination } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel, FaFileCsv, FaEdit, FaTrash, FaEye, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const Manageorder = () => {
  return <h4>Addcategorytable page</h4>;
};
export default Manageorder;
