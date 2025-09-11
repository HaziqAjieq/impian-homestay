import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import navLogo from "../../assets/logo/logo-impian.png";
import { useNavigate } from "react-router-dom";
import LoginBtn from "./button/LoginBtn";
import ContactBtn from "./button/ContactBtn";
import ToggleLanBtn from "./button/ToggleLanBtn";

export default function HamburgerMenu() {
  const { t } = useTranslation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close menu function
  const closeMenu = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <section className="MOBILE-MENU flex lg:hidden right-0">
        <div
          className="HAMBURGER-ICON space-y-2 cursor-pointer transition-all duration-300 p-2"
          onClick={toggleMenu}
        >
          <span className={`block h-0.5 sm:h-1 w-8 rounded-xs bg-white transition-all duration-300 transform ${isNavOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
          <span className={`block h-0.5 sm:h-1 w-8 rounded-xs bg-white transition-all duration-300 ${isNavOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block h-0.5 sm:h-1 w-8 rounded-xs bg-white transition-all duration-300 transform ${isNavOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
        </div>

        {/* Mobile menu overlay */}
        <div 
          className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ${isNavOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
          onClick={closeMenu}
        ></div>

        {/* Mobile menu content */}
        <div className={`fixed top-0 right-0 h-full w-80 max-w-full bg-[#614900] z-50 transform transition-transform duration-500 ease-in-out ${isNavOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}>
          {/* Close button */}
          <div className="absolute top-5 right-5 p-2" onClick={closeMenu}>
            <svg
              className="h-8 w-8 text-white transition-transform duration-300 hover:rotate-90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          
          {/* Menu content */}
          <div className="flex flex-col h-full pt-20 pb-10 px-8 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center justify-center mb-10 transition-opacity duration-700 delay-100" style={{ opacity: isNavOpen ? 1 : 0 }}>
              <img src={navLogo} className="min-h-[30px] max-h-[50px] w-auto" alt="Logo" />
            </div>

            {/* Navigation links */}
            <ul className="flex flex-col gap-6 mb-8 justify-end items-end tracking-widest">
              {[
                { key: "nav.home", href: "/" },
                { key: "nav.about", href: "/about" },
                { key: "nav.service", href: "/service" }
              ].map((item, index) => (
                <li 
                  key={item.key}
                  className="transition-all duration-700 transform"
                  style={{ 
                    opacity: isNavOpen ? 1 : 0,
                    transform: isNavOpen ? 'translateX(0)' : 'translateX(2rem)',
                    transitionDelay: isNavOpen ? `${100 + index * 100}ms` : '0ms'
                  }}
                >
                  <a 
                    href={item.href} 
                    className="text-white text-lg font-medium py-2 transition-colors duration-300 hover:text-amber-200"
                    onClick={closeMenu}
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex flex-row justify-center gap-4 text-white transition-opacity duration-700 delay-500" style={{ opacity: isNavOpen ? 1 : 0 }}>
                <ContactBtn />
                <LoginBtn />
              </div>
              <div className="flex justify-center mt-4 transition-opacity duration-700 delay-600" style={{ opacity: isNavOpen ? 1 : 0 }}>
                <ToggleLanBtn />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}