import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import PortfolioDetailsPage from "./components/Pages/PortfolioDetailsPage";
import ServiceDetailsPage from "./components/Pages/ServiceDetailsPage";
import TeamDetailsPage from "./components/Pages/TeamDetailsPage";
import ContactPage from "./components/Pages/ContactPage";
import PortfolioPage from "./components/Pages/PortfolioPage";
import ServicePage from "./components/Pages/ServicePage";
import AboutPage from "./components/Pages/AboutPage";
import TeamPage from "./components/Pages/TeamPage";
import ErrorPage from "./components/Pages/ErrorPage";
import Layout from "./components/Layout";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<Layout darkMode />}>
        {/* <Route path="test" element={<Test />} /> */}
        <Route path="/" element={<HomePage darkMode />} />
        <Route path="about" element={<AboutPage darkMode />} />
        <Route path="service" element={<ServicePage />} />
        <Route
          path="service/:serviceDetailsId"
          element={<ServiceDetailsPage />}
        />
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
        <Route path="" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="service" element={<ServicePage />} />
        <Route
          path="service/:serviceDetailsId"
          element={<ServiceDetailsPage />}
        />

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
