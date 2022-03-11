import React, {useEffect} from "react";

//react-router-dom
import {useLocation, useNavigate, Outlet} from "react-router-dom";

//component
import Navbar from "../Component/Navbar/Navbar";
import Sidebar from "../Component/Navbar/Sidebar";

import Toggle from "../assets/js/main.js";

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    Toggle();
    if (location.pathname === "/user") {
      navigate("/user/dashboard");
    } // eslint-disable-next-line
  }, []);

  return (
    <>
      <div id="layout-wrapper">
        <Navbar />
        <Sidebar />
        <div className="main-content">
          <div className="page-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
