import React from "react";
import Spacing from "../Spacing";
import SectionHeadingStyle3 from "../SectionHeading/SectionHeadingStyle3";
import { pageTitle } from "../../helpers/PageTitle";
import { Icon } from "@iconify/react";

export default function ContactPage() {
  pageTitle("Contact Sky Marketing");
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      
      {/* Header Section */}
      <SectionHeadingStyle3
        title="Let's Build Your Next <br/>Marketing Success Together"
        subTitle="Contact Sky Marketing"
        shape="shape_6"
      />
      <Spacing lg="75" md="60" />
      
      {/* Contact Information & Form */}
      <section>
        <div className="container">
          <div className="row align-items-center cs_gap_y_45">
            {/* Contact Info Column */}
            <div className="col-lg-6">
              <h2 className="cs_fs_50">
                Reach Out to Our <br />
                Khartoum Office
              </h2>
              <div className="cs_height_55 cs_height_lg_30" />
              <ul className="cs_mp0 cs_contact_info">
                <li>
                  <h3 className="cs_fs_29 cs_semibold">Email:</h3>
                  <p className="mb-0">info@skymarketing.sd</p>
                </li>
                <li>
                  <h3 className="cs_fs_29 cs_semibold">Phone:</h3>
                  <p className="mb-0">+249 901 524 585</p>
                  <p className="mb-0">+249 123 506 612</p>
                </li>
                <li>
                  <h3 className="cs_fs_29 cs_semibold">Address:</h3>
                  <p className="mb-0">Khartoum, Sudan</p>
                </li>
                <li>
                  <h3 className="cs_fs_29 cs_semibold">Working Hours:</h3>
                  <p className="mb-0">Sunday - Thursday: 8AM - 4PM</p>
                  <p className="mb-0">Call Center: 24/7</p>
                </li>
              </ul>
            </div>
            
            {/* Contact Form Column */}
            <div className="col-lg-6">
              <div className="cs_contact_form_wrap">
                <div className="cs_gray_bg_3 cs_contact_form_bg" />
                <form className="cs_contact_form">
                  <label className="cs_fs_21 cs_semibold cs_primary_color">
                    Your Full Name
                  </label>
                  <input
                    placeholder="Type your name"
                    type="text"
                    className="cs_form_field"
                  />
                  <div className="cs_height_38 cs_height_lg_25" />
                  
                  <label className="cs_fs_21 cs_semibold cs_primary_color">
                    Email Address
                  </label>
                  <input
                    placeholder="Type your email"
                    type="email"
                    className="cs_form_field"
                  />
                  <div className="cs_height_38 cs_height_lg_25" />
                  
                  <label className="cs_fs_21 cs_semibold cs_primary_color">
                    Phone Number
                  </label>
                  <input
                    placeholder="Type your phone number"
                    type="tel"
                    className="cs_form_field"
                  />
                  <div className="cs_height_38 cs_height_lg_25" />
                  
                  <label className="cs_fs_21 cs_semibold cs_primary_color">
                    Service Needed
                  </label>
                  <select className="cs_form_field">
                    <option value="">Select a service</option>
                    <option value="website">Website Development</option>
                    <option value="mobile">Mobile Apps</option>
                    <option value="agriculture">Agricultural Marketing</option>
                    <option value="engineering">Engineering Solutions</option>
                    <option value="media">Media Production</option>
                  </select>
                  <div className="cs_height_38 cs_height_lg_25" />
                  
                  <label className="cs_fs_21 cs_semibold cs_primary_color">
                    Project Details
                  </label>
                  <textarea 
                    placeholder="Tell us about your project"
                    cols={30} 
                    rows={5} 
                    className="cs_form_field" 
                  />
                  <div className="cs_height_38 cs_height_lg_25" />
                  
                  <button className="cs_btn cs_style_1">
                    Submit Inquiry
                    <span>
                      <Icon icon="fa6-solid:arrow-right" />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_0 cs_height_lg_80" />
      </section>
      
      {/* Map Section */}
      <div className="cs_map">
        <iframe
          id="map"
          src="https://maps.google.com/maps?q=Khartoum+Sudan&t=m&z=12&output=embed&iwloc=near"
          allowFullScreen
          title="Sky Marketing Khartoum Office"
          style={{ border: 0 }}
        />
      </div>
    </>
  );
}