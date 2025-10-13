// src/components/ui/review/ReviewCard.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ReviewCard({ name, description, platform, rating = 5 }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-custom-brown">{name}</h3>
        <span className="text-sm text-gray-500">{platform}</span>
      </div>

      <div className="flex mb-3">
        {[...Array(rating)].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className="text-yellow-400 text-lg"
          />
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
