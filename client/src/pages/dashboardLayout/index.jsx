import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gray-100 flex-grow p-3">{<Outlet />}</div>
    </div>
  );
};

export default DashboardLayout;
