import React from 'react'
import Card from './card/Card'
import { useState, useEffect } from "react";

export default function Slider({
  children,
  autoSlide = true,
  autoSlideInterval = 3000
}){
  const [currentIndex , setCurrentIndex] = useState(0);

  // next and prev button showing on md device
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === children.length - 1 ? 0 : prev + 1));
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1));
  }

  // auto slide effect
  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(nextSlide , autoSlideInterval);
    return () => clearInterval(interval);
  },[autoSlide , autoSlideInterval, children?.length]);

  return (
    <div className='realtive w-full max-w-xl mx-auto overflow-hidden'>
      {/* slider track */}
      <div
      className='flex transition-transform duration-500'
      >
        {children.map((child,index) => (
          <div key={index}
          className='flex-shrink-0 w-full flex justify-center'
          >
            {child}
            </div>
        ))}
      </div>

      {/* controls */}
      <button
      onClick={prevSlide}
      >
        
      </button>
      <button
      onClick={nextSlide}
      >

      </button>
      {/* Dots */}
      <div
      className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {children.map((_,index) => (
          <button
          
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-black" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
      
    </div>
  )
}


// purpose for this is to create a reuseable slider for feed back and destination to visit