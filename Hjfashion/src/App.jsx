"use client";
import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import NewArrivalSection from "./components/NewArrivalSection";
import ShopByStyleSection from "./components/ShopByStyleSection";
import OffersSection from "./components/OffersSection";
import WhoWeAreSection from "./components/WhoWeAreSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import NarrativeSection from "./components/NarrativeSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="font-poppins px-5">
        <HeroSection />
        <NewArrivalSection />
        <ShopByStyleSection />
        <OffersSection />
        <WhoWeAreSection />
        <WhyChooseUsSection />
        <NarrativeSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
