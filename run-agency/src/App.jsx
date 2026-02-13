import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import MarketingAgencyPage from "./components/Pages/MarketingAgencyPage";
import ServicePage from "./components/Pages/ServicePage";
import AboutPage from "./components/Pages/AboutPage";
import BlogPage from "./components/Pages/BlogPage";
import BlogListPage from "./components/Pages/BlogListPage";
import BlogDetailsPage from "./components/Pages/BlogDetailsPage";
import PortfolioPage from "./components/Pages/PortfolioPage";
import PortfolioDetailsPage from "./components/Pages/PortfolioDetailsPage";
import TeamPage from "./components/Pages/TeamPage";
import TeamDetailsPage from "./components/Pages/TeamDetailsPage";
import ContactPage from "./components/Pages/ContactPage";
import ServiceDetailsPage from "./components/Pages/ServiceDetailsPage";
import ErrorPage from "./components/Pages/ErrorPage";
import Test from "./components/Pages/Test";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<Layout darkMode />}>
        {/* <Route path="test" element={<Test />} /> */}
        <Route path="/" element={<MarketingAgencyPage darkMode />} />
        <Route path="about" element={<AboutPage darkMode />} />
        <Route path="service" element={<ServicePage />} />
        <Route
          path="service/:serviceDetailsId"
          element={<ServiceDetailsPage />}
        />
        {/* <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:blogDetailsId" element={<BlogDetailsPage />} /> */}
        <Route path="case-study" element={<PortfolioPage />} />
        <Route
          path="case-study/case-study-details"
          element={<PortfolioDetailsPage />}
        />
        <Route path="team" element={<TeamPage />} />
        <Route path="team/:teamDetailsId" element={<TeamDetailsPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      {/* Start Light Mode */}
      <Route path="/light/" element={<Layout />}>
        <Route path="" element={<MarketingAgencyPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="service" element={<ServicePage />} />
        <Route
          path="service/:serviceDetailsId"
          element={<ServiceDetailsPage />}
        />
        {/* <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:blogDetailsId" element={<BlogDetailsPage />} /> */}

        <Route path="case-study" element={<PortfolioPage />} />
        <Route
          path="case-study/case-study-details"
          element={<PortfolioDetailsPage />}
        />
        <Route path="team" element={<TeamPage />} />
        <Route path="team/:teamDetailsId" element={<TeamDetailsPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      {/* End Light Mode */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
