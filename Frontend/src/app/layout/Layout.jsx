import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';

import styles from '../../styles/layout.module.css';
import { Layout } from 'antd';
import SideBar from "../sidebar/SideBar";
import Navbar from "../sidebar/Navbar";

const LayoutComp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [authToken, setAuthToken] = useState(""); 
  const [loaded, setLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Cash Coach");

  useEffect(() => {
    const authState = localStorage.getItem("authState");
    const token = authState ? JSON.parse(authState).accessToken : null;

    if (token) {
      setAuthToken(token);
    }

    setLoaded(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {
        loaded ? (
          authToken ? (
            <div className={styles.wrapper}>
              <div className={styles.sider} >
                {isSidebarOpen && (
                  <SideBar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    onSelectItem={setSelectedItem} // Pass setter function
                  />
                )}
              </div>
              <Layout className={styles.cover}>
                <div>
                  <Navbar
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                    selectedItem={selectedItem} // Pass selected item name
                  />
                </div>
                <div className={styles.right}>
                  <Outlet />
                </div>
              </Layout>
            </div>
          ) : (
            <Navigate to={"/login"} />
          )
        ) : null
      }
    </>
  );
};

export default LayoutComp;
