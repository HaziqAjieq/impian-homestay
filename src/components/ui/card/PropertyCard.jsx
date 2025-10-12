import React, { useEffect, useState } from "react";
import { fetchProperties } from "../../../lib/api/wp-property.js";
import { Link, useLocation } from "react-router-dom";

function PropertyCard() {
  const [properties, setProperties] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchProperties()
      .then(setProperties)
      .catch((err) => console.error("Failed to load properties:", err));
  }, []);

  // Limit to 6 only on homepage
  const isHomePage = location.pathname === "/";
  const displayedProperties = isHomePage ? properties.slice(0, 6) : properties;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProperties.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
          >
            {p.featuredImage && (
              <div className="relative w-full h-[220px] overflow-hidden">
                <img
                  src={p.featuredImage}
                  alt={p.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              
              </div>
            )}
            <div className="px-5 py-4 flex flex-col gap-2">
              <h2 className="font-bold text-lg md:text-2xl text-custom-brown truncate">
                {p.title}
              </h2>
                <div className="text-gray-800 text-sm font-semibold md:text-base">
                  {p.location}
                </div>
              <p className="text-gray-600 text-sm md:text-base">
                RM {p.price} / night
              </p>
             
                <div className="flex flex-col gap-3 text-sm text-gray-500">
                <div className="flex flex-wrap gap-4">
                  <span>{p.bedrooms} Bed</span>
                  <span>{p.bathrooms} Bath</span>
                </div>

                <span>Type: {p.propertyType}</span>
              </div>
              
              <Link to={`/property/${p.slug}`}>
                <button className="mt-4 bg-custom-brown hover:bg-custom-brown2 cursor-pointer text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 w-full">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See More button (only on homepage) */}
      {isHomePage && properties.length > 6 && (
        <div className="flex justify-center mt-10">
          <Link to="/property">
            <button className="bg-custom-brown hover:bg-custom-brown2 cursor-pointer text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
              See More Properties
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default PropertyCard;
