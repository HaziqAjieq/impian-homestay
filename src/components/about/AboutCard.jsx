import React from 'react'
// purposse for this is to inlcude the style card with an image and detail the image

export default function AboutCard({ title, description, image, buttonText, reverse }) {
  return (
<div className="w-full mx-auto p-4">
      <div
        className={`flex flex-col-reverse md:h-[400px] ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } bg-white rounded-2xl shadow-lg overflow-hidden`}
      >
        {/* Text Section */}
        <div className="p-6 flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-3">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          {buttonText && (
            <button className="px-4 py-2 bg-custom-brown2 text-white rounded-lg hover:bg-yellow-600 w-fit">
              {buttonText}
            </button>
          )}
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}


