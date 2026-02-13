import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const addressDataList = [
  "Khartoum, Sudan",
  "+249 901 524 585",
  "info@skymarketing.sd",
];

const serviceMenuList = [
  {
    title: "Website Development",
    href: "/service/website-development",
  },
  {
    title: "Mobile Apps",
    href: "/service/mobile-apps",
  },
  {
    title: "Agricultural Marketing",
    href: "/service/agricultural-marketing",
  },
  {
    title: "Engineering Solutions",
    href: "/service/engineering",
  },
  {
    title: "Media Production",
    href: "/service/media-production",
  },
];

const LinksMenuList = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Services",
    href: "/service",
  },
  {
    title: "Case Studies",
    href: "/case-study",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const policyMenuList = [
  {
    title: "Terms of Use",
    href: "/terms",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
];

const socialBtnList = [
  {
    icon: "fa6-brands:linkedin-in",
    href: "https://linkedin.com/company/sky-marketing-sd",
  },
  {
    icon: "fa6-brands:twitter",
    href: "https://twitter.com/skymarketing_sd",
  },
  {
    icon: "fa6-brands:facebook-f",
    href: "https://facebook.com/skymarketing.sd",
  },
  {
    icon: "fa6-brands:youtube",
    href: "https://youtube.com/skymarketing",
  },
];

export default function Footer() {
  return (
    <footer
      className="cs_fooer cs_bg_filed"
      style={{ backgroundImage: "url(/images/footer_bg.jpeg)" }}
    >
      <div className="cs_fooer_main">
        <div className="container">
          <div className="row">
            {/* Column 1: Logo & Address */}
            <div className="col-lg-3 col-sm-6">
              <div className="cs_footer_item">
                <div className="cs_text_widget">
                  <img
                    style={{ width: "100px" }}
                    src="/images/sky_marketing_logo.png"
                    alt="Sky Marketing Logo"
                  />
                  <p className="cs_m0 cs_pt_15">
                    Pioneering innovative marketing solutions in Sudan since 2015.
                  </p>
                </div>
                <ul className="cs_menu_widget cs_mp0">
                  {addressDataList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Services */}
            <div className="col-lg-3 col-sm-6">
              <div className="cs_footer_item">
                <h2 className="cs_widget_title">Our Services</h2>
                <ul className="cs_menu_widget cs_mp0">
                  {serviceMenuList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.href}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Quick Links */}
            <div className="col-lg-3 col-sm-6">
              <div className="cs_footer_item">
                <h2 className="cs_widget_title">Quick Links</h2>
                <ul className="cs_menu_widget cs_mp0">
                  {LinksMenuList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.href}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="col-lg-3 col-sm-6">
              <div className="cs_footer_item">
                <h2 className="cs_widget_title">Stay Updated</h2>
                <div className="cs_newsletter cs_style_1">
                  <div className="cs_newsletter_text">
                    Subscribe for insights on agricultural tech, engineering trends, and digital marketing strategies.
                  </div>
                  <form action="#" className="cs_newsletter_form">
                    <input
                      type="email"
                      className="cs_newsletter_input"
                      placeholder="Your email address"
                    />
                    <button className="cs_btn cs_style_1">
                      Subscribe
                      <span>
                        <Icon icon="fa6-solid:arrow-right" />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container">
        <div className="cs_bottom_footer">
          <div className="cs_bottom_footer_left">
            <div className="cs_social_btns cs_style_1">
              {socialBtnList.map((item, index) => (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs_center"
                  key={index}
                >
                  <Icon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>
          <div className="cs_copyright">
            © {new Date().getFullYear()} Sky Marketing. All Rights Reserved.
          </div>
          <div className="cs_bottom_footer_right">
            <ul className="cs_footer_links cs_mp0">
              {policyMenuList.map((item, index) => (
                <li key={index}>
                  <Link to={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}