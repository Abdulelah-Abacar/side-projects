import React from "react";
import Spacing from "../Spacing";
import SectionHeadingStyle3 from "../SectionHeading/SectionHeadingStyle3";
import Portfolio from "../Portfolio";
import CtaStyle2 from "../Cta/CtaStyle2";
import { pageTitle } from "../../helpers/PageTitle";

const portfolioData = [
  {
    href: "/case-study/case-study-details",
    imgUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=900&q=80",
    title: "Awesome colorful artwork",
    btnText: "See Project",
  },
  {
    href: "/case-study/case-study-details",
    imgUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    title: "Admin dashboard UI design",
    btnText: "See Project",
  },
  {
    href: "/case-study/case-study-details",
    imgUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80",
    title: "Product designing with brand",
    btnText: "See Project",
  },
  {
    href: "/case-study/case-study-details",
    imgUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
    title: "Kids education website design",
    btnText: "See Project",
  },
  {
    href: "/case-study/case-study-details",
    imgUrl:
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "Portable device UI/UX design",
    btnText: "See Project",
  },
  {
    href: "/case-study/case-study-details",
    imgUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&h=900&q=80",
    title: "Social app design for IOS device",
    btnText: "See Project",
  },
  {
    href: "/case-study/case-study-details",
    imgUrl:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000&q=80",
    title: "3d table light lamp rendering",
    btnText: "See Project",
  },
  {
    href: "/case-study/case-study-details",
    imgUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "Old telephone 3d new model",
    btnText: "See Project",
  },
];

export default function Test() {
  pageTitle("Portfolio");
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="We have completed a series of noteworthy projects"
        subTitle="Our Portfolio"
        shape="shape_3"
      />
      <Spacing lg="75" md="60" />
      <div className="container">
        <Portfolio data={portfolioData} />
        <div className="cs_height_75 cs_height_lg_40" />
        <CtaStyle2
          title="Is there a specific project or goal <br />that you have in mind?"
          btnText="Send Message"
          btnUrl="/contact"
        />
        <div className="cs_height_150 cs_height_lg_80" />
      </div>
    </>
  );
}
