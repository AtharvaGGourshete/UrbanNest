import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const AppLayout = () => {
  return (
    <div>
      
      <main className="min-h-screen ">
        <Navbar className="sticky"/>
        <Outlet />
      </main>  
      <Footer/>
    </div>
  );
};

export default AppLayout;
