import React from "react";
import Spacing from "../Spacing";
import HeroStyle2 from "../Hero/HeroStyle2";
import Brands from "../Brands";
import Marquee from "../Marquee";
import Cta from "../Cta";
import SectionHeading from "../SectionHeading";
import Accordion from "../Accordion";
import PostCarousel from "../Slider/PostCarousel";
import TestimonialSlider from "../Slider/TestimonialSlider";
import Award from "../Award";
import VideoModal from "../VideoModal";
import ServiceSlider from "../Slider/ServiceSlider";
import AboutStyle2 from "../About/AboutStyle2";
import FunFact from "../FunFact";
import Button from "../Button";
import CaseStudy from "../CaseStudy";
import { pageTitle } from "../../helpers/PageTitle";
const servideData = [
  {
    iconSrc: "/images/marketing-agency/service_icon_1.svg",
    title: "Growth Marketing",
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_2.svg",
    title: "Marketing Consulting",
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_3.svg",
    title: "Video Campaign",
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_4.svg",
    title: "Branding Design",
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_1.svg",
    title: "Growth Marketing",
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_2.svg",
    title: "Marketing Consulting",
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_3.svg",
    title: "Video Campaign",
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_4.svg",
    title: "Branding Design",
    subTitle:
      "A one provide moment. Interesting an a up se you side it all the and don't listen. Confident picture she one the what I nor least.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
];
const funfactData = [
  { title: "Happy Customers", number: "22k" },
  { title: "Work’s Completed", number: "15k" },
  { title: "Skilled Team Members", number: "121" },
  { title: "Most Valuable Awards", number: "15" },
];
const awardData = [
  {
    brand: "Behance",
    title: "UI/UX design of the month",
    subTitle:
      "Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores",
    date: "December 12, 2023",
    awardImgUrl: "/images/creative-agency/award_img_1.svg",
  },
  {
    brand: "Awwwards",
    title: "CSS awards design",
    subTitle:
      "Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores",
    date: "January 05, 2022",
    awardImgUrl: "/images/creative-agency/award_img_2.svg",
  },
  {
    brand: "Google",
    title: "Website of the day",
    subTitle:
      "Accusamus et iusto odio dignissimos ducimus qui blanditiis fedarals praesentium voluptatum deleniti atque corrupti quos dolores",
    date: "March 20, 2021",
    awardImgUrl: "/images/creative-agency/award_img_3.svg",
  },
];
const testimonialData = [
  {
    text: "Run agency Motion Graphics did an excellent job on my video related projects. The motion graphics added an extra layer of polish and really brought the video to life. I highly recommend their high quality services and work.",
    avatarName: "Ansari Patron",
    avatarDesignation: "CEO at Delta",
  },
  {
    text: "Run agency Motion Graphics did an excellent job on my video related projects. The motion graphics added an extra layer of polish and really brought the video to life. I highly recommend their high quality services and work.",
    avatarName: "Jhon Doe",
    avatarDesignation: "Manager at Delta",
  },
  {
    text: "Run agency Motion Graphics did an excellent job on my video related projects. The motion graphics added an extra layer of polish and really brought the video to life. I highly recommend their high quality services and work.",
    avatarName: "Ramatam Coo",
    avatarDesignation: "MD at Delta",
  },
];
const caseStudyData = [
  {
    thumbnailSrc: "/images/case_study_1.jpg",
    title: "Digital marketing management",
    category: "Social Media",
    number: "01",
    href: "/case-study-details",
  },
  {
    thumbnailSrc: "/images/case_study_2.jpg",
    title: "Digital marketing management",
    category: "Branding",
    number: "02",
    href: "/case-study-details",
  },
  {
    thumbnailSrc: "/images/case_study_3.jpg",
    title: "Digital marketing management",
    category: "Design",
    number: "03",
    href: "/case-study-details",
  },
  {
    thumbnailSrc: "/images/case_study_4.jpg",
    title: "Digital marketing management",
    category: "Marketing",
    number: "04",
    href: "/case-study-details",
  },
];
const postData = [
  {
    thumbnailSrc:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "How to keep fear from ruining your art business with confident",
    date: "07 Mar 2023",
    url: "/blog/blog-details",
  },
  {
    thumbnailSrc:
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "Artistic mind will be great for creation anything",
    date: "22 Apr 2023",
    url: "/blog/blog-details",
  },
  {
    thumbnailSrc:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "AI will take over all job for human within few years",
    date: "13 May 2023",
    url: "/blog/blog-details",
  },
  {
    thumbnailSrc:
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "Your agency need to replace some artistic mind people",
    date: "15 Mar 2023",
    url: "/blog/blog-details",
  },
  {
    thumbnailSrc:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "How to keep fear from ruining your art business with confident",
    date: "07 Mar 2023",
    url: "/blog/blog-details",
  },
  {
    thumbnailSrc:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "Artistic mind will be great for creation anything",
    date: "22 Apr 2023",
    url: "/blog/blog-details",
  },
  {
    thumbnailSrc:
      "https://images.unsplash.com/photo-1504610926078-a1611febcad3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "AI will take over all job for human within few years",
    date: "13 May 2023",
    url: "/blog/blog-details",
  },
  {
    thumbnailSrc:
      "https://images.unsplash.com/photo-1497033110244-bb22d252704e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "Your agency need to replace some artistic mind people",
    date: "15 Mar 2023",
    url: "/blog/blog-details",
  },
];
const faqData = [
  {
    title: "01. I need your services and how can i contact you throw email?",
    content:
      "Marketing eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.",
  },
  {
    title: "02. What are the different types of service we provide?",
    content:
      "Marketing eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.",
  },
  {
    title: "03. What are the different stages of the working process?",
    content:
      "Marketing eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.",
  },
  {
    title: "04. What is the difference between direct and digital marketing?",
    content:
      "Marketing eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.",
  },
  {
    title: "05. How can i payment proceed after complete project?",
    content:
      "Marketing eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.",
  },
];
const brandList = [
  {
    logoSrc: "/images/marketing-agency/brand_1.svg",
    logoAlt: "Brand",
  },
  {
    logoSrc: "/images/marketing-agency/brand_2.svg",
    logoAlt: "Brand",
  },
  {
    logoSrc: "/images/marketing-agency/brand_3.svg",
    logoAlt: "Brand",
  },
  {
    logoSrc: "/images/marketing-agency/brand_4.svg",
    logoAlt: "Brand",
  },
];
const brandListDark = [
  {
    logoSrc: "/images/marketing-agency/brand_1_dark.svg",
    logoAlt: "Brand",
  },
  {
    logoSrc: "/images/marketing-agency/brand_2_dark.svg",
    logoAlt: "Brand",
  },
  {
    logoSrc: "/images/marketing-agency/brand_3_dark.svg",
    logoAlt: "Brand",
  },
  {
    logoSrc: "/images/marketing-agency/brand_4_dark.svg",
    logoAlt: "Brand",
  },
];

export default function MarketingAgencyPage({ darkMode }) {
  pageTitle("Marketing Agency");
  return (
    <>
      <HeroStyle2
        miniTitle="Egypt Based Marketing Agency"
        title="Unlock Your Business's Potential with Expert Digital Marketing Solutions"
        subTitle="Our agency offers a comprehensive suite of lots services, including Branding, Advertising, Social marketing, Video making, and Marketing analysis."
        thumbnailSrc="/images/run_agency_hero.jpg"
        mikeIcon={
          darkMode ? "/images/icons/mike_dark.svg" : "/images/icons/mike.svg"
        }
      />
      <section className="cs_p76_full_width" id="service">
        <Spacing lg="143" md="75" />
        <SectionHeading title="Services we provide" subTitle="Our Services" />
        <Spacing lg="85" md="45" />
        <ServiceSlider data={servideData} />
      </section>
      <section>
        <div className="cs_height_150 cs_height_lg_75" />
        <AboutStyle2
          thumbnailSrc1="/images/run_agency_about_1.png"
          thumbnailSrc2="/images/run_agency_about_2.png"
          uperTitle="Who We Are"
          title="Markiting creatives and designing agency"
          subTitle="Our team, specializing in strategic digital marketing, partners with the world's leading brands. Breaking from the norm, we push boundaries and merge imaginative thinking, consumer behavior,
        and data-driven design with advanced technology to deliver unparalleled brand experiences."
          featureList={[
            "Designing content with AI power",
            "Trending marketing tools involve",
            "Powerful market strategy use",
          ]}
          btnText="Learn More"
          btnUrl="about"
        />
      </section>
      <div className="container">
        <Spacing lg="125" md="70" />
        <FunFact data={funfactData} />
      </div>
      <section>
        <Spacing lg="118" md="70" />
        <div className="container">
          <SectionHeading
            title="Real world solutions successful <br />case studies in Run Agency"
            subTitle="Case Study"
          />
          <Spacing lg="85" md="45" />
        </div>
        <CaseStudy data={caseStudyData} />
        <Spacing lg="100" md="60" />
        <div className="container">
          <div className="text-center">
            <Button btnText="More Case Study" btnUrl="case-study" />
          </div>
        </div>
      </section>
      <div className="container">
        <Spacing lg="126" md="70" />
        <VideoModal
          videoSrc="https://runagency-adv.com/wp-content/uploads/2025/04/Cbab5d8a4a986d16251c8a40b26bb8fbf57e854e.mp4#t=,46"
          bgUrl="/images/run_agency_hero.jpg"
          title="Our Design and Technology <br /> Studio is dedicated to making <br />your ideas a reality"
        />
      </div>
      <TestimonialSlider
        layeredImages={[
          "https://scontent.fjed2-1.fna.fbcdn.net/v/t39.30808-6/485393326_671676695203970_7699785271472433874_n.jpg?stp=c0.95.1152.1152a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=50ad20&_nc_ohc=QMx1VgPZAqwQ7kNvwHSAOQf&_nc_oc=Adm8_96zbhTgI-GzzaIhfMq9fhLagkcuKIU12H7DHLzCOikP20hMiCk_b1dx3F8lwV4&_nc_zt=23&_nc_ht=scontent.fjed2-1.fna&_nc_gid=vEYzvJnpsoN2RtqUoHTx6A&oh=00_AfJp6omWwRRvNbyiRkNu4MN3bfTc7NGOgbHThAOStdTV_g&oe=6838FE42",
          "https://scontent.fjed2-1.fna.fbcdn.net/v/t39.30808-6/484049678_671813955190244_6430425578746945096_n.jpg?stp=c0.95.1152.1152a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=50ad20&_nc_ohc=BTUrgdX1a4AQ7kNvwF2wmiq&_nc_oc=AdkfNO67m4HnoQycAyXBM02yS-2uAhY6QqqXFXUZoJBpp38Yu65MMD3zWHBuR9pM6Bs&_nc_zt=23&_nc_ht=scontent.fjed2-1.fna&_nc_gid=vEYzvJnpsoN2RtqUoHTx6A&oh=00_AfJTFPJadLBD3bqTRMvTmY7eNFIn68Zp2MnNw8iG1rG45w&oe=6838FD2F",
          "https://scontent.fjed2-1.fna.fbcdn.net/v/t51.75761-15/479911064_18259650859275681_994658149637248226_n.jpg?stp=c0.106.1280.1280a_dst-jpg_s206x206_tt6&_nc_cat=102&ccb=1-7&_nc_sid=714c7a&_nc_ohc=Mnymivjc5vkQ7kNvwF7jgmd&_nc_oc=AdkBAE3GHLfDYCRNGklXH2GhL7JTtmpKBxLWnHkM_5M3kLoflZxHQKU4wm67G9mu9B0&_nc_zt=23&_nc_ht=scontent.fjed2-1.fna&_nc_gid=8t511lVeD4tVjTVm-3kEzA&oh=00_AfJEUH15ELYC8frRl44GJ_uxT5ODCo1ZZwrRL6yn-CgyWw&oe=683900D9",
          "https://scontent.fjed2-2.fna.fbcdn.net/v/t51.75761-15/479556331_18259648885275681_5350255347420824518_n.jpg?stp=c0.106.1280.1280a_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_ohc=E6GbfpJYvGoQ7kNvwEnN1-O&_nc_oc=AdmzuGrUXiDQ0PHT085ikGbZBfwwXlfTzy7GsagzKyixANW0_3uSE6H1bxRE40U4_Iw&_nc_zt=23&_nc_ht=scontent.fjed2-2.fna&_nc_gid=fdLZH00fPKYHAbp829JXkA&oh=00_AfIzMt56esLPXHiPEqZP16s6nNR6Fz_-tICqVhVlh3mIiA&oe=6838E2CE",
          "https://scontent.fjed2-2.fna.fbcdn.net/v/t51.75761-15/479930176_18259652536275681_2353416525510732896_n.jpg?stp=c0.106.1280.1280a_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=714c7a&_nc_ohc=wa7MsA6ytYYQ7kNvwHFoBhW&_nc_oc=AdlGqDYtNK12fR_9GBdFCnokh-Q7hZF5Bf8zBTDvVQ5DJw55T9ZWJ5n6emQDwQtiEdQ&_nc_zt=23&_nc_ht=scontent.fjed2-2.fna&_nc_gid=8t511lVeD4tVjTVm-3kEzA&oh=00_AfKNRrWtsoTR871XPT1WWRDRF_mc2ngmAIn7ipwl8evHNw&oe=6838F2C5",
        ]}
        data={testimonialData}
      />
      <section className="cs_primary_bg cs_shape_animation_2">
        <Spacing lg="143" md="75" />
        <div className="cs_shape_1 position-absolute">
          <svg
            width={65}
            height={64}
            viewBox="0 0 65 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                d="M62.4554 25.9314C55.6838 19.6081 40.1618 12.4752 32.1637 20.1537C41.7609 21.9206 53.2379 29.2392 48.3751 39.1677C45.1712 45.7019 38.7353 45.7177 33.3337 41.995C27.338 37.8739 25.7108 31.2667 27.4596 24.5962C26.5312 24.5866 25.6039 24.6605 24.6889 24.8172C9.80991 27.7447 14.0713 47.6353 20.9187 55.948C22.4528 57.8045 19.7488 60.3159 18.1393 58.4837C7.86403 46.8126 6.49349 23.0691 25.5532 19.9295C26.8892 19.7254 28.2446 19.6801 29.5912 19.7945C36.9845 9.42053 56.5698 17.4866 64.055 24.4366C65.1096 25.4175 63.4831 26.8926 62.4554 25.9314ZM33.9938 39.0327C38.3927 42.4636 44.2429 40.8527 44.3919 34.8698C44.6036 28.2263 35.7464 25.0921 29.1457 24.655C27.1454 29.9313 29.4427 35.4836 33.9938 39.0327Z"
                fill="#4F4747"
              />
            </g>
          </svg>
        </div>
        <div className="container">
          <SectionHeading
            title="Our prize achievement"
            subTitle="Awards"
            variantColor="cs_white_color"
          />
          <Spacing lg="85" md="45" />
          <Award data={awardData} />
        </div>
        <Spacing lg="150" md="80" />
      </section>
      {/* <section className="cs_p76_full_width">
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading title="Some recent news" subTitle="Our Blog" />
          <Spacing lg="85" md="45" />
        </div>
        <PostCarousel data={postData} />
      </section> */}
      <section>
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading title="Frequently asked question" subTitle="FAQs" />
          <Spacing lg="55" md="30" />
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <Accordion variant="cs_type_1" data={faqData} />
            </div>
          </div>
        </div>
        <Spacing lg="120" md="60" />
      </section>
      <section>
        <div className="container">
          <Cta
            title="Is there a specific project or goal that you have in mind?"
            btnText="Contact Us"
            btnUrl="/contact"
            bgUrl="/images/creative-agency/cta_bg.jpeg"
          />
        </div>
      </section>
      <Spacing lg="135" md="70" />
      <Marquee text="We Create Design - Build App - Website - Branding - SEO" />
      <Spacing lg="84" md="50" />
      <div className="container">
        <Brands data={darkMode ? brandListDark : brandList} />
      </div>
      <Spacing lg="135" md="80" />
    </>
  );
}
