import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/landingpage/Navbar";
import Footer from "../component/landingpage/pages/Footer/Footer";


const LayoutHome = () => {
  return (
    <div>
      <Navbar />

      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutHome;