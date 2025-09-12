import { useTranslation } from "react-i18next";
import navLogo from "../../assets/logo/logo-impian.png";
import HamburgerMenu from "../ui/HamburgerMenu";

import ContactBtn from "../ui/button/ContactBtn";
import LoginBtn from "../ui/button/LoginBtn";
import ToggleLanBtn from "../ui/button/ToggleLanBtn";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled , setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if(!isHomePage){
      setIsScrolled(true);
      return
    }


    const handleScroll = () =>{
      if(window.scrollY > 150){
        setIsScrolled(true);
      }else{
        setIsScrolled(false)
      }
    };

    window.addEventListener('scroll' , handleScroll);
    return () => window.removeEventListener('scroll' , handleScroll);
  },[isHomePage])

  return (
    <nav className={`nav-logo grid grid-cols-12 grid-rows-1  py-3 rounded-b-3xl md:mx-3 md:mt-2 md:rounded-3xl  place-items-center transition-all duration-500 ease-in-out  sticky top-0  z-10 ${
      isScrolled
      ? 'bg-custom-brown top-0' : 'md:top-4'
    }`} >
      <div className="col-start-1 col-span-4 md:col-start-2 sm:col-span-2  lg:col-span-1 lg:col-start-2 ">
        {/* logo goes here */}
        <img src={navLogo} className="min-h-[30px] max-h-[50px] w-auto" />
      </div>
      <div className="nav-menu hidden md:col-start-5 md:col-span-4 md:flex  font-bold text-white  ">
        <ul className="flex flex-row gap-4 text-center items-center ">
          <li>
            <NavLink to='/' end>
               {t("nav.home")}
            </NavLink>
           
          </li>
          <li>
            <NavLink to='/about' end>
              {t("nav.about")}
            </NavLink>
           
          </li>
          <li>
            <NavLink to='/service' end>
              {t("nav.service")}
            </NavLink>
           
          </li>
        </ul>
      </div>

      {/* toggle language button */}
      <div className=" hidden col-span-1 col-start-9 md:col-start-10 md:flex flex-row gap-6 text-white">
        <ContactBtn />
        <LoginBtn />
        
      </div>

      <div className=" hidden col-span-2 col-start-11 md:flex flex-row gap-6 text-white">
        <ToggleLanBtn/>
      </div>

      <div className="nav-hamburger md:hidden col-span-2 col-start-11  ">
        {/* hamburger menu  and connect with the nav */}
        <HamburgerMenu />

      </div>
    </nav>
  );
}

// navbar
// with scroll animation
// have aa filter for searching for the guest
// option to change languages from eng to my
