// src/components/ui/review/ReviewSection.jsx
import React from "react";
import Review from './Reviews';

export default function ReviewSection({ reviews }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-custom-brown mb-10 text-center">
          Guest Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Review
              key={index}
              name={review.name}
              description={review.description}
              rating={review.rating || 5}
              platform={review.platform || "Airbnb"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
 