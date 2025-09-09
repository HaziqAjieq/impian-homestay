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

  // useState/ useEvent
  const [isNavOpen, setIsNavOpen] = useState(false);

  // use navigate

  return (
    <>
      {/* when closed */}
      <section className="MOBILE-MENU flex lg:hidden right-0 ">
        <div
          className="HAMBURGER-ICON space-y-2  "
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span className="block h-0.5 sm:h-1 w-8 rounded-xs bg-white"></span>
          <span className="block h-0.5 sm:h-1 w-8 rounded-xs bg-white"></span>
          <span className="block h-0.5 sm:h-1 w-8 rounded-xs bg-white"></span>
        </div>

        {/* onclick */}
        <div className={` ${isNavOpen ? "showMenuNav " : "hideMenuNav"}`}>
          <div
            className="absolute top-0 right-0 px-8 py-8 items-center"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-8 w-8 text-white"
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
          <div className="nav-menu  font-bold text-white h-[400px] pt-[60px] flex flex-col justify-center gap-3 top-0 right-0 w-[180px]  ">
            <div className="flex items-center justify-center">
              <img src={navLogo} className="min-h-[30px] max-h-[50px] w-auto" />
            </div>

            <ul className="flex flex-col gap-4 mt-5 justify-end items-end tracking-widest">
              <li>
                <a href="/" className="">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="/about">{t("nav.about")}</a>
              </li>
              <li>
                <a href="/service">{t("nav.service")}</a>
              </li>
            </ul>
            <div>{/* button for login and contact here */}</div>

            <div className="flex flex-row mt-4 justify-evenly gap-4 text-white">
              <ContactBtn />
              <LoginBtn />
            </div>
            <div className="flex items-end justify-end">
              <ToggleLanBtn />
            </div>
          </div>
        </div>

        <style>{`
      .hideMenuNav {
        display: none;
        
        transition-delay: 0.5s; 
          opacity: 0;
          visibility: hidden;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        background: #bb4d00;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
          border-bottom-left-radius: 50px 40px; 
           border-bottom-right-radius: 50px 40px;
            
            transition-delay: 0.5s; 
            animation: ease-out;
            
      }
    `}</style>
      </section>
    </>
  );
}
