import React from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "../../components/layout/Header/CustomerHeader";
import CustomerFooter from "../../components/layout/Footer/CustomerFooter";

const CustomerExtend = () => {
  return (
    <div>
      <CustomerHeader />
      <Outlet />
      <CustomerFooter />
    </div>
  );
};

export default CustomerExtend;
