import React from "react";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faStar } from "@fortawesome/free-regular-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const features = t("description-choose-us", { returnObjects: true });

  return (
    <div className="">
      <div>
        <Header />
      </div>
      <div className=" flex  justify-center">
        {/* why choose us section with 4 grid box */}
        <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 place-items-center  sm:gap-5 gap-y-[20px] mt-8 px-8 md:px-0 md:max-w-[1400px] ">
          {features.map((feature, index) => (
             <div className="features-card col-span-6 sm:col-span-4 lg:col-span-3 flex flex-col items-center text-center max-w-[400px] pt-4 h-full   ">
            {index === 0 && <FontAwesomeIcon icon={faHouse} className="font-bold text-5xl " />}
            {index === 1 && <FontAwesomeIcon icon={faUtensils} className="font-bold text-5xl" />}
            {index === 2 &&  <FontAwesomeIcon icon={faStar} className="font-bold text-5xl" />}
            {index === 3 && <FontAwesomeIcon icon={faMagnifyingGlassLocation} className="font-bold text-5xl"/> }
            
            
            <div className="features-text flex flex-col py-5 px-5">
              <h4 className="feature-title text-2xl font-bold">{feature[`title-${index + 1}`]}</h4>
              <p className="text-sm">{feature[`description-${index+1}`]}</p>
            </div>
             </div>
          ))}
         
         
        
        </div>
      </div>
      {/* style-card */}
         <style>{`
      .features-card{
         background-color:#B38600;
         border-radius:20px;
          color:white;

      }
      .features-text{
      }
    `}</style>
    </div>
  );
}

// Content:

// Hero section with search bar (location, dates, guests)

// Featured properties carousel

// Benefits/features section

// Testimonials

// Call-to-action to browse properties
