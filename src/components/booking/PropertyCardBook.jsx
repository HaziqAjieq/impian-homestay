import React, { useEffect, useState } from "react";
import { fetchProperties } from "../../lib/api/wp-property";
import { Link } from "react-router-dom";

export default function PropertyCardBook() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        console.log("🏡 Loaded properties:", data);
        setProperties(data);
      } catch (err) {
        console.error("❌ Failed to load properties:", err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">Loading properties...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">{error}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-6 md:px-10 py-10">
      {properties.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Thumbnail */}
          {p.featuredImage ? (
            <img
              src={p.featuredImage}
              alt={p.title}
              className="w-full h-56 object-cover"
            />
          ) : (
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          {/* Property Details */}
          <div className="p-4 flex flex-col gap-1 text-sm">
            <h2 className="font-semibold text-xl text-gray-800">{p.title}</h2>
            <p className="text-custom-brown font-medium">
              RM {p.price} / night
            </p>
            <p className="text-gray-600">{p.location}</p>
            <p>{p.bedrooms} Bed · {p.bathrooms} Bath</p>
            <p>Type: {p.propertyType}</p>

            {/* Availability Info (optional, if available) */}
            {p.available !== undefined && (
              <p
                className={`mt-2 font-semibold ${
                  p.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {p.available ? "✅ Available" : "❌ Unavailable"}
              </p>
            )}

            {/* Reason if exists */}
            {p.reason && (
              <p className="text-gray-500 text-xs mt-1 border-t pt-1">
                {p.reason}
              </p>
            )}

            {/* See More */}
            <Link to={`/property/${p.slug}`}>
              <button className="mt-3 bg-custom-brown text-white px-4 py-2 rounded-lg hover:bg-custom-brown2 transition">
                See More
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
