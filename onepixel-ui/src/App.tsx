import Footer from "./components/sections/Footer";
import CaseStudioPage from "./pages/CaseStudio";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100); // Small delay to wait for the page to load
  }, [pathname, hash]);

  return null;
};

const loadData = async (lang: string) => {
  try {
    const data = await import(
      lang === "EN" ? "./data.json" : "./data-ar.json",
      {
        assert: { type: "json" },
      }
    );
    return data.default;
  } catch (error) {
    console.error("Error loading JSON file:", error);
    return null;
  }
};

function App() {
  const [lang, setLang] = useState("EN");
  const [data, setData] = useState<any | null>(null);

  const setFontFamily =
    lang === "EN"
      ? "font-lato [&_.headline]:font-archivoBlack"
      : "font-noto [&_.headline]:font-cairo";

  // Load JSON when the language changes
  useEffect(() => {
    loadData(lang).then((res) => {
      if (res) setData(res);
    });
  }, [lang]);

  // Prevent rendering until data is loaded
  if (!data) return <div>Loading...</div>;

  return (
    <div className={`${setFontFamily} bg-primary text-secondary`}>
      <Navbar setLang={setLang} navItems={data.navItems} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing data={data} />} />
        <Route
          path="/projects/:name"
          element={<CaseStudioPage data={data.projects} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
