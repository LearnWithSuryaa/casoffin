import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaImage, FaSearch, FaLock } from "react-icons/fa";

const menuItems = [
  { name: "Galeri", path: "/gallery", icon: <FaImage />, requiresLogin: true },
  {
    name: "Cek Khodam",
    path: "/cek-khodam",
    icon: <FaSearch />,
    requiresLogin: true,
  },
  {
    name: "Wall of Secrets",
    path: "/wall-of-secrets",
    icon: <FaLock />,
    requiresLogin: true,
  },
];

const NavBar = () => {
  const { isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToHero = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      const targetPosition = heroSection.offsetTop;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 800;
      let startTime = null;

      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-black bg-opacity-30 backdrop-blur-md z-50 shadow-lg border-b border-orange-500 transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => {
            if (location.pathname === "/") {
              scrollToHero();
            } else {
              window.location.href = "/#hero";
            }
          }}
        >
          <h1 className="text-3xl text-orange-400 font-extrabold tracking-wide glow-text hover:scale-105 transition-transform duration-300 ease-out">
            Casofin 🚀
          </h1>
        </div>

        <ul className="hidden md:flex space-x-8 text-white font-semibold">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link
                to={isLoggedIn || !item.requiresLogin ? item.path : "/login"}
                className={`flex items-center space-x-2 px-3 py-1 transition-all duration-300 ease-in-out ${
                  location.pathname === item.path
                    ? "text-orange-400 scale-110"
                    : "hover:text-orange-400"
                }`}
              >
                <span className="text-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="text-base">{item.name}</span>
              </Link>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-400 transition-all duration-500 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-orange-400 hover:text-orange-300 focus:outline-none"
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <svg
            className={`w-8 h-8 transform transition-transform duration-500 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {!isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M6 18L18 6"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-gray-900 text-white shadow-lg transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } overflow-hidden md:hidden`}
      >
        <div className="px-6 py-4 space-y-4">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              <Link
                to={isLoggedIn || !item.requiresLogin ? item.path : "/login"}
                className="flex items-center py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out transform hover:translate-x-2"
                onClick={toggleMenu}
              >
                <span className="text-lg mr-2">{item.icon}</span>
                <span className="text-base">{item.name}</span>
              </Link>
              {index < menuItems.length - 1 && (
                <hr className="border-gray-700 my-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
