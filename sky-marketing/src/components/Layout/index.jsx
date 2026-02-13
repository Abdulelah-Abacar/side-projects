import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ThemeToggle from "../ThemeToggle";

export default function Layout({ darkMode }) {
  return (
    <div className={`${darkMode ? "cs_dark" : ""}`}>
      <Header
        logoUrl={
           "/images/sky_marketing_logo.png"
        }
        actionBtnText="Getting Started"
        actionBtnUrl="/contact"
      />
      <ThemeToggle />
      <Outlet />
      <Footer />
    </div>
  );
}
