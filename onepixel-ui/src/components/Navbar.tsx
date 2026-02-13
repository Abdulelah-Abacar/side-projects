import { useState } from "react";
import Logo from "../assets/OnePixelLogo";
import { Link } from "react-router";

// Define types for props
interface NavItem {
  label: string;
  subItems?: string[];
}

interface NavbarProps {
  setLang: (lang: string) => void;
  navItems: (NavItem | string)[];
}

function Navbar({ setLang, navItems }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);
  const [isArabic, setIsArabic] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCaseStudies = () => setIsCaseStudiesOpen(!isCaseStudiesOpen);
  const toggleLanguage = () => {
    setIsArabic(!isArabic);
    setLang(isArabic ? "EN" : "AR");
  };

  // Render a single nav item
  const renderNavItem = (item: NavItem | string, index: number) => {
    if (typeof item === "string") {
      return (
        <li
          key={index}
          className="capitalize lg:text-sm xl:text-lg hover:text-Accent duration-700"
        >
          <a href={`/#${item.toLocaleLowerCase().replace(/ /g, "-")}`}>
            {item}
          </a>
        </li>
      );
    } else {
      return (
        <li key={index} className="relative group">
          <button
            onClick={toggleCaseStudies}
            className="flex items-center gap-1 focus:outline-none"
            aria-expanded={isCaseStudiesOpen}
          >
            {item.label}
            <span
              className={`transform transition-transform duration-300 ${
                isCaseStudiesOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>
          {item.subItems && (
            <ul className="absolute top-full left-0 border border-white shadow-lg backdrop-blur-sm rounded-md mt-2 w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
              {item.subItems.map((subItem, j) => (
                <li
                  key={j}
                  className="p-2 hover:text-secondary duration-700 text-sm"
                >
                  <a href="#" className="text-secondary hover:text-Accent">
                    {subItem}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }
  };

  // Language switcher component
  const LanguageSwitcher = () => (
    <button
      onClick={toggleLanguage}
      className="w-32 h-10 bg-black rounded-full p-1 px-2.5 relative focus:outline-none flex items-center justify-between"
      aria-label="Toggle language"
    >
      <span
        className={`text-sm transition-opacity duration-300 ${
          isArabic ? "opacity-30" : "opacity-100"
        }`}
      >
        English
      </span>
      <span
        className={`text-sm transition-opacity duration-300 ${
          isArabic ? "opacity-100" : "opacity-30"
        }`}
      >
        العربية
      </span>
      <div
        className={`w-14 h-8 bg-Accent rounded-full absolute top-1 transition-transform duration-300 ${
          isArabic ? "translate-x-14" : "translate-x-0"
        }`}
      >
        <span className="absolute inset-0 flex items-center justify-center font-bold text-black">
          {isArabic ? "العربية" : "English"}
        </span>
      </div>
    </button>
  );

  return (
    <nav className="w-full absolute z-50">
      <div className="w-[95%] xl:w-11/12 mx-auto py-1 px-2 lg:py-5 lg:pb-2.5 border-b border-white/20">
        <div className="flex gap-7 items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <Logo className="w-36 md:w-44 lg:w-52" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex list-none gap-5">
            {navItems.map((item, i) => renderNavItem(item, i))}
          </ul>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 bg-Accent rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Language Switcher */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 h-full w-64 bg-primary z-50 transform transition-transform duration-700 ease-in-out`}
        >
          <div className="p-5">
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="p-2 bg-Accent rounded-md focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Mobile Menu Items */}
            <ul className="mt-5 flex flex-col list-none gap-3">
              {navItems.map((item, i) => renderNavItem(item, i))}
            </ul>

            {/* Language Switcher for Mobile */}
            <div className="mt-5 flex items-center gap-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
