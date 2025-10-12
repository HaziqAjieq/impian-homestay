import React from "react";

export default function PropertyCardSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-10">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="relative w-full h-[220px] bg-gray-300" />

          <div className="p-5 flex flex-col gap-3">
            {/* Title Placeholder */}
            <div className="h-5 w-3/4 bg-gray-300 rounded-md" />
            {/* Location Placeholder */}
            <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
            {/* Price Placeholder */}
            <div className="h-4 w-1/3 bg-gray-300 rounded-md" />

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex gap-4">
                <div className="h-4 w-12 bg-gray-300 rounded-md" />
                <div className="h-4 w-12 bg-gray-300 rounded-md" />
              </div>
              <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
            </div>

            <div className="mt-4 h-10 w-full bg-gray-300 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
