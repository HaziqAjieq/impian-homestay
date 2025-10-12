import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

export default function PropertyCardBook({
  properties = [],
  availableProperties = [],
  showOnlyAvailable = true,
}) {
  const [visibleCount, setVisibleCount] = useState(6); // load 6 cards first
  const loadMoreRef = useRef(null);

  // 🧭 Map of availability by property ID
  const availabilityMap = availableProperties.reduce((acc, prop) => {
    acc[String(prop.id)] = prop.available;
    return acc;
  }, {});

  // 🧩 Merge property list with availability
  const merged = properties.map((p) => ({
    ...p,
    available: availabilityMap[String(p.id)] ?? true,
  }));

  // 🧹 Show only available ones if filtered
  const finalList = showOnlyAvailable
    ? merged.filter((p) => p.available)
    : merged;

  const visibleProperties = finalList.slice(0, visibleCount);

  // 🧭 Intersection Observer to load more when scroll near bottom
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount((prev) => prev + 6); // load next 6
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  // 🛑 CASE 1: If no properties at all (API empty)
  if (!properties.length) {
    return (
      <div className="text-center text-gray-500 p-10">
        No properties found at the moment.
      </div>
    );
  }

  // 🛑 CASE 2: If properties exist but none matched filter
  if (!finalList.length) {
    return (
      <div className="text-center text-gray-500 p-10">
        No properties available for selected dates.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-10">
        {visibleProperties.map((p) => (
          <div
            key={p.id}
            className={`relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ${
              !p.available ? "opacity-60 grayscale" : ""
            }`}
          >
            {p.featuredImage && (
              <div className="relative w-full h-[220px] overflow-hidden">
                <img
                  src={p.featuredImage}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="p-5 flex flex-col gap-2 text-gray-800">
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

              {p.available ? (
                <Link to={`/property/${p.slug}`}>
                  <button className="mt-4 bg-custom-brown hover:bg-custom-brown2 cursor-pointer text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 w-full">
                    See Details
                  </button>
                </Link>
              ) : (
                <div className="mt-4 bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg text-center w-full cursor-not-allowed">
                  Not Available
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🔸 Trigger for IntersectionObserver */}
      {visibleCount < finalList.length && (
        <div ref={loadMoreRef} className="text-center py-8 text-gray-400">
          Loading more...
        </div>
      )}
    </div>
  );
}
