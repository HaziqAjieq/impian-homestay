import React from "react";

import Card from "../card/Card";
import image1 from "../../../assets/slider/visit/klia1.jpg";
import image2 from "../../../assets/slider/visit/erl.png";
import image3 from "../../../assets/slider/visit/gateway01.jpg";
import image4 from "../../../assets/slider/visit/mitsui.jpg";
import image5 from "../../../assets/slider/visit/putrajaya.jpg";
import image6 from "../../../assets/slider/visit/sepang-circuit.jpg";
import image7 from "../../../assets/slider/visit/splash-mania.png";
import image8 from "../../../assets/slider/visit/uitm.jpg";
import image9 from "../../../assets/slider/visit/xiamen.png";
import image10 from "../../../assets/slider/visit/aeon-nilai-2.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Parallax, Pagination, Navigation,Autoplay } from "swiper/modules";

export default function Destination() {
  const destinations = [
    {
      imageUrl: image1,
      title: "KLIA",
    },
    {
      imageUrl: image2,
      title: "ERL Kota Warisan",
    },
    {
      imageUrl: image3,
      title: "KLIA 2 Gateway",
    },
    {
      imageUrl: image4,
      title: "Mitsui Outlet",
    },
    {
      imageUrl: image5,
      title: "Putrajaya & Cyberjaya",
    },
    {
      imageUrl: image6,
      title: "Sepang Circuit",
    },
    {
      imageUrl: image7,
      title: "Splash Mania",
    },
    {
      imageUrl: image8,
      title: "UITM Dengkil",
    },
    {
      imageUrl: image9,
      title: "Xiamen University",
    },
    {
      imageUrl: image10,
      title: "Aeon Nilai",
    },
  ];

  return (
    <div className="">
      {/* <Slider autoSlide autoSlideInterval={3000}>
        <Card imageUrl={image1} title="Card Title One" />
        <Card imageUrl={image2} title="Card Title Two" />
        <Card imageUrl={image1} title="Card Title One" />
      </Slider> */}

      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{ clickable: true }}
        navigation={true}
         autoplay={{
          delay: 3000, // 3 seconds
          disableOnInteraction: false, 
        }}
        loop={true}
        modules={[Parallax, Pagination, Navigation ,Autoplay]}
        className="mySwiper"
      >
        {/* Map your cards inside SwiperSlide */}
        {destinations.map((item, index) => (
          <SwiperSlide key={index}>
            <Card imageUrl={item.imageUrl} title={item.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// will be in card and also list
