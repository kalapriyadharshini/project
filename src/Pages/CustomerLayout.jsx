import React from "react";
import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";
import Footer from "../components/Footer";

const CustomerLayout = () => {
  return (
    <>
      <CustomNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default CustomerLayout;
