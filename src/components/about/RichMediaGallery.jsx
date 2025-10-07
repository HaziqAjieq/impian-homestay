import React from "react";

// import image
import GridImage from "../ui/imageGallery/GridImage";
import image1 from "../../assets/properties/airplane.jpg";
import image2 from "../../assets/properties/image2.jpg";
import image3 from "../../assets/properties/image3.jpg";
import image4 from "../../assets/properties/image4.jpg";
import image5 from "../../assets/properties/image5.jpg";
import image6 from "../../assets/properties/image6.jpg";
// language changes
import { useTranslation } from "react-i18next";

const images = [
  { src: image1, alt: "image1" },
  { src: image2, alt: "image2" },
  { src: image3, alt: "image3" },
  
  { src: image4, alt: "iamge 4" },
  { src: image6, alt: "iamge 6" },
  { src: image5, alt: "iamge 5" },
];

export default function RichMediaGallery() {
  const { t } = useTranslation();

  // randomize image
   
  return (
    <div className=" grid grid-rows-2 grid-cols-6 lg:grid-cols-12  mx-8 pt-5 md:pt-10  gap-2 ">
      {/* mapping the image an */}

      {images.map((image, index) => (
        <div
          key={index}
          className={`
      rounded-2xl overflow-hidden 
      transition-transform duration-300 
      col-span-3   
      ${index % 2 === 0 ? "row-span-2  flex items-center " : "row-span-1 items-stretch "}
    `}
        >
          <GridImage src={image.src} alt={image.alt} />
        </div>
      ))}
    </div>
  );
}

