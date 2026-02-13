import React from "react";
import Spacing from "../Spacing";
import SectionHeadingStyle3 from "../SectionHeading/SectionHeadingStyle3";
import AboutStyle4 from "../About/AboutStyle4";
import FunFact from "../FunFact";
import AboutStyle5 from "../About/AboutStyle5";
import IconBoxStyle6 from "../IconBox/IconBoxStyle6";
import SectionHeadingStyle5 from "../SectionHeading/SectionHeadingStyle5";
import SectionHeading from "../SectionHeading";
import TeamSlider from "../Slider/TeamSlider";
import Marquee from "../Marquee";
import Brands from "../Brands";
import { pageTitle } from "../../helpers/PageTitle";
const funfactData = [
  { title: "Happy Customers", number: "22k" },
  { title: "Work’s Completed", number: "15k" },
  { title: "Skilled Team Members", number: "121" },
  { title: "Most Valuable Awards", number: "15" },
];
const teamData = [
  {
    memberImg:
      "https://scontent.fjed2-2.fna.fbcdn.net/v/t39.30808-6/480626474_654693476902292_3517430526691998195_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=2Hg21pzRjrEQ7kNvwG270sS&_nc_oc=Adka-LpCjCenuto-aXiQJi_zZQLp71WSHtdW1u_qpZMvU5W4HOajQDHwvAMmTmk3x64&_nc_zt=23&_nc_ht=scontent.fjed2-2.fna&_nc_gid=Y99dX0pXVm9wmDh1Pb2gmA&oh=00_AfJspjPdgBIdqXRr4Y0D5E6F9s4M6C_YqREg7nvkN4s-9w&oe=6838F9B2",
    memberName: "James Berline",
    memberDesignation: "React Developer",
    href: "/team/team-details",
  },
  {
    memberImg:
      "https://scontent.fjed2-2.fna.fbcdn.net/v/t39.30808-6/480664529_654693283568978_5249461074942162242_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=QDpjh3C8YygQ7kNvwHzFOoQ&_nc_oc=AdmlUzf78ng7Ox9CQfWqHVCQQi8sIJQI2S8G1qZnoW0TG24KYH7GF4XX1EongEParx4&_nc_zt=23&_nc_ht=scontent.fjed2-2.fna&_nc_gid=Bogpca9SKap1wWmhpbUa2Q&oh=00_AfJTTCFmsAMtI-cu9EUa5eQ-Ofa2Er2lj6aZV7MgxWrECQ&oe=6838EF06",
    memberName: "Bella Zubena",
    memberDesignation: "Graphic Designer",
    href: "/team/team-details",
  },
  {
    memberImg:
      "https://scontent.fjed2-1.fna.fbcdn.net/v/t39.30808-6/481151651_654693536902286_9011335697255814830_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=irBptomf3CUQ7kNvwG_Llk7&_nc_oc=AdkgQUPwJM5-38Wljeg24nkDYajhXkfcIJmFP_o2UsMcPWs9Xyi6Au1XMdbSjwRiPAw&_nc_zt=23&_nc_ht=scontent.fjed2-1.fna&_nc_gid=-3tyAdeCez8GJMlnz9pJCw&oh=00_AfKcC2qc0gPp9ns3pmaGvr0Fu0DsazjKhP2hq94f2lI-_w&oe=6838F0A7",
    memberName: "Kemnei Alekzend",
    memberDesignation: "Digital Marketer",
    href: "/team/team-details",
  },
  {
    memberImg:
      "https://scontent.fjed2-1.fna.fbcdn.net/v/t39.30808-6/480528180_654694626902177_719090075975311058_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=F09teEQsReEQ7kNvwEn9_7R&_nc_oc=Adm7nX0gKwrR-258k7XrcWEV_ZI5WN3bErHwiGmXM-P2OZ7AaZwVDUe3xaHJqyO23Rk&_nc_zt=23&_nc_ht=scontent.fjed2-1.fna&_nc_gid=6tMJY3R4CxnclqVCJadiqA&oh=00_AfKupb2SI5sUWWEvCqY93izyT8lAj1kaHL-9GfJWRdf7bQ&oe=6838FACA",
    memberName: "Juliya Jesmine",
    memberDesignation: "UX Researcher",
    href: "/team/team-details",
  },
  {
    memberImg:
      "https://scontent.fjed2-2.fna.fbcdn.net/v/t39.30808-6/480573521_654696156902024_1820520596482399134_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_9u-dEK2XZYQ7kNvwEOWp4Q&_nc_oc=Adk2MGGNsxo5cLZiYY4RRMlLC2Ib8gjTWYfvp3TI2jVeWwpbxeN_aqNbHifu1LBFiKY&_nc_zt=23&_nc_ht=scontent.fjed2-2.fna&_nc_gid=syetAHdahOl8idaDpRM5rg&oh=00_AfIgpHjnkWHGMZa_FMimGkFBnB0Om6dOuJDlaWU2HLbfxw&oe=6838EC62",
    memberName: "James Berline",
    memberDesignation: "React Developer",
    href: "/team/team-details",
  },
  {
    memberImg:
      "https://scontent.fjed2-2.fna.fbcdn.net/v/t39.30808-6/480571669_654698500235123_6521532820034992901_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=iXT3EQo97LEQ7kNvwGcS51X&_nc_oc=Adlsp8DVRCD3CAsSP5YC4tp94A95PKuUQS6RKbDgb4QWMFHN-sjbdikMg185QHIuE_A&_nc_zt=23&_nc_ht=scontent.fjed2-2.fna&_nc_gid=R-QCJ2nKtYigAp58ggOr2g&oh=00_AfK1m8Qgft8Z0AgN8RJqSTa5_c7PloMVWbPlaCrWpVA3MA&oe=683907A3",
    memberName: "Bella Zubena",
    memberDesignation: "Graphic Designer",
    href: "/team/team-details",
  },
  {
    memberImg:
      "https://scontent.fjed2-1.fna.fbcdn.net/v/t39.30808-6/480694409_654698373568469_5826587058602245936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uOMkjvV5a6IQ7kNvwF7vTTd&_nc_oc=AdmcjG6bynGcjF-EDEVj25smifvnM_b2VrSPaXYBnnvusaWj5Qbds-qCG6j3eXyNeQI&_nc_zt=23&_nc_ht=scontent.fjed2-1.fna&_nc_gid=91QbykxEKC65WRMNcAqJ3g&oh=00_AfKSGTkySX_6AcM0qQr67tffyf25AEmgptjyMfHweVj_Dg&oe=6838EF4B",
    memberName: "Kemnei Alekzend",
    memberDesignation: "Digital Marketer",
    href: "/team/team-details",
  },
  {
    memberImg:
      "https://scontent.fjed2-1.fna.fbcdn.net/v/t39.30808-6/480624375_654698496901790_2256145053479750422_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xpwheILO3cYQ7kNvwHu3lxS&_nc_oc=AdnxUOx2mXH6NJ7HaFmc39XPnrOhLhx3BhwFlDIYhEgafvjjGnIXdtB4HwqueMOgJt8&_nc_zt=23&_nc_ht=scontent.fjed2-1.fna&_nc_gid=Bk_l6AREbGHhxhzBUge9lg&oh=00_AfKhl3u7sgjFIihHoRLP4Y4tfgBwqMVkiJvVISeAAId0OA&oe=6838ED6B",
    memberName: "Juliya Jesmine",
    memberDesignation: "UX Researcher",
    href: "/team/team-details",
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

export default function AboutPage({ darkMode }) {
  pageTitle("About");
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="Adding value to your business, <br>making it worthy"
        subTitle="About Us"
        variant="text-center"
        shape="shape_1"
      />
      <Spacing lg="75" md="60" />
      <AboutStyle4
        thumbnailSrc="https://scontent.fjed2-1.fna.fbcdn.net/v/t39.30808-6/480722679_654445710260402_6228067067950908649_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=o8F2aO79wfEQ7kNvwHCI7Lx&_nc_oc=AdmM4cdYEXmPRqA2QffzBXoxQgFyknRlFsYrZpEdfRx0sBXlF-yBEG2IJ8PFTXejBuM&_nc_zt=23&_nc_ht=scontent.fjed2-1.fna&_nc_gid=RPHda5PcUGOxZUkWX-Mq3w&oh=00_AfLgBo4Aj-ccibzTmSOU5WGJ2ffbvjc9sV28kLP5gXs2zA&oe=68391211"
        miniTitle="Company Info"
        title="Marketing agency for your business"
        subTitle="Our team, specializing in strategic digital marketing, partners with aiming the world's leading brands. Breaking from the norm, we push boundaries and do merge imaginative thinking posible.
        dolores eos qui ratione voluptatem lipe sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam ever the world lorem ipsum."
        btnText="See Our Services"
        btnUrl="/service"
      />
      <Spacing lg="125" md="70" />
      <div className="container">
        <FunFact data={funfactData} />
      </div>
      <Spacing lg="125" md="70" />
      <AboutStyle5
        variant="cs_type_1"
        thumbnailSrc="https://scontent.fjed2-1.fna.fbcdn.net/v/t39.30808-6/480933495_654445750260398_8646758764624980625_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Wp-NFWYLWaYQ7kNvwEPJzmc&_nc_oc=AdmcvAeVFv2_WvAnkXyirLSCvo8WJsNyMfg_ka2MeCFcwmptX7lQxjdP6rk_YhMAScw&_nc_zt=23&_nc_ht=scontent.fjed2-1.fna&_nc_gid=wD_UwlN0Qzfu2sVerpMq-A&oh=00_AfJMv6wGAnlH1m4AbuhxDp6RGpX5Kx4GWyUC6xJnY8d4rw&oe=683920D3"
        miniTitle="What We Do"
        title="Best value service provider agency"
        subTitle="We make specializing in strategic digital marketing, partners with aiming the world's leading brands. Breaking from the norm, we push boundaries and do merge imaginative thinking posible dolores."
        progressBarList={[
          { title: "Digital Marketing", percentage: "75" },
          { title: "Brand Strategy", percentage: "85" },
          { title: "Competitor Analysis", percentage: "95" },
        ]}
        salesTitle="Sales Increase"
        groth="25"
      />
      <Spacing lg="150" md="80" />
      <section className="cs_primary_bg">
        <Spacing lg="140" md="70" />
        <div className="container">
          <SectionHeadingStyle5 title="How we work" />
          <Spacing lg="85" md="45" />
          <div className="cs_working_process_wrap cs_center">
            <div className="cs_working_process">
              <div className="cs_working_process_col">
                <IconBoxStyle6
                  bgSrc="/images/others/process_1.png"
                  iconSrc="/images/icons/search.svg"
                  title="Research"
                  subTitle="Sed ut perspiciatis unde omnis iste natus error sit voluptatem own disilope accusantium doloremque laudantium, totam remen."
                />
              </div>
              <div className="cs_working_process_col">
                <IconBoxStyle6
                  bgSrc="/images/others/process_2.png"
                  iconSrc="/images/icons/idea.svg"
                  title="Idea Generate"
                  subTitle="Sed ut perspiciatis unde omnis iste natus error sit voluptatem own disilope accusantium doloremque laudantium, totam remen."
                />
              </div>
              <div className="cs_working_process_col">
                <IconBoxStyle6
                  bgSrc="/images/others/process_3.png"
                  iconSrc="/images/icons/gear.svg"
                  title="Implement"
                  subTitle="Sed ut perspiciatis unde omnis iste natus error sit voluptatem own disilope accusantium doloremque laudantium, totam remen."
                />
              </div>
            </div>
          </div>
        </div>
        <Spacing lg="150" md="80" />
      </section>
      <section className="cs_p76_full_width">
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading
            title="Meet our experts team behind <br />the zivan agency"
            subTitle="Our Team"
          />
          <Spacing lg="85" md="45" />
        </div>
        <TeamSlider data={teamData} />
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
