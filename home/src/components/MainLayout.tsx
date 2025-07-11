import React from "react";
import { Outlet } from "react-router-dom";

import "../index.scss";

import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gray-100 overflow-y-scroll p-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
