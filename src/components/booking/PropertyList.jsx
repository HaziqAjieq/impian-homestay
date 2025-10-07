import React from "react";
import PropertyCardBook from "./PropertyCardBook";

export default function PropertyList({ properties = [] }) {
  if (!properties.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No properties found for the selected dates.
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 px-4">
      {properties.map((property) => (
        <PropertyCardBook key={property.id} property={property} />
      ))}
    </div>
  );
}
