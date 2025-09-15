import React, { useEffect, useState } from "react";
import { fetchProperties } from "../../../lib/api/wp-property.js";
import { Link } from "react-router-dom";

function Properties({}) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties()
      .then(setProperties)
      .catch((err) => console.error("Failed to load properties:", err));
  }, []);

 
   return (
  <div className="grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-3 gap-6 w-full px-10 ">
    {properties.map((p) => (
      <div
        key={p.id}
        className="bg-custom-brown flex flex-col gap-2 text-white rounded-xl pb-5"
      >
        {p.featuredImage && (
          <img
            src={p.featuredImage}
            alt={p.title}
            className="rounded-t-xl w-autoi h-[220px] object-cover"
          />
        )}
        <div className="px-4 text-sm">
          <h2 className="font-semibold text-2xl md:text-4xl">{p.title}</h2>
          <p>RM {p.price} / per-night</p>
          <p>{p.location}</p>
          <p>{p.bedrooms} Bed</p>
          <p>{p.bathrooms} Bath</p>
          <p>Type: {p.propertyType}</p>
          {/* will take slug for each property */}
           <Link key={p.id} to={`/property/${p.slug}`}>
          <button>
            See More
          </button>
          </Link>
        </div>
      </div>
    ))}
  </div>
);

}

export default Properties;
// bellow for getting all images
// {p.image.map((img, i) => (
//         <img key={i} src={img} alt={p.title} />
//       ))}
