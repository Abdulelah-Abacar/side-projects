import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThemeToggle = () => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const themeState = location.pathname.startsWith("/light");
    setIsLightTheme(themeState);
    document.body.classList.toggle("light-theme", themeState);
  }, [location.pathname]);

  const toggleTheme = () => {
    const newThemeState = !isLightTheme;
    setIsLightTheme(newThemeState);
    document.body.classList.toggle("light-theme", newThemeState);

    let newPath = location.pathname;
    if (newThemeState) {
      newPath = `/light${newPath === "/" ? "" : newPath}`;
    } else {
      newPath = newPath.replace(/^\/light/, "") || "/";
    }

    navigate(newPath);
  };

  return (
    <button
      className={`theme-toggle ${isLightTheme ? "light" : "dark"}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isLightTheme ? "dark" : "light"} theme`}
    >
      <div className="toggle-track">
        <span className="icon sun">☀️</span>
        <span className="icon moon">🌙</span>
      </div>
    </button>
  );
};

export default ThemeToggle;
