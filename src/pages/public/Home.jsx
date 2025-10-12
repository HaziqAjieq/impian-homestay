import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faUtensils,
  faMagnifyingGlassLocation,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Destination from "../../components/ui/homepage/Destination";
import PropertyCard from "../../components/ui/card/PropertyCard";
import data from "../../locales/testimonials/testimonials.json";

export default function Home() {
  const { t } = useTranslation();
  const features = t("description-choose-us", { returnObjects: true });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(data); // Set the imported JSON data to state
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-b ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 px-8 mdw-6xl mx-auto lg:w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="features-card flex flex-col items-center justify-center text-center  bg-custom-brown text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-6 py-8 lg:col-span-3"
            >
              <FontAwesomeIcon
                icon={
                  [faHouse, faUtensils, faStar, faMagnifyingGlassLocation][
                    index
                  ]
                }
                className="text-5xl mb-4"
              />
              <h4 className="text-xl md:text-2xl font-bold mb-2">
                {feature[`title-${index + 1}`]}
              </h4>
              <p className="text-sm md:text-base opacity-90 leading-relaxed">
                {feature[`description-${index + 1}`]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Destination Section */}
      <section className="my-16 px-8">
        <h1 className="font-black text-2xl sm:text-3xl md:text-5xl text-custom-brown mb-8">
          {t("destination")}
        </h1>
        <Destination />
      </section>

      {/* Properties Section */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-custom-brown mb-8">
            {t("featured-properties")}
          </h2>
          <PropertyCard />
        </div>
      </section>

      {/* review section*/}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-custom-brown mb-8">
            Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.reviews?.map((review, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-custom-brown">
                    {review.name}
                  </h3>
                  <span className="text-sm bg-gray-300 text-white px-2 py-1 rounded-lg">
                    {review.platform}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStarSolid}
                      className={`${
                        i < Math.round(review.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } mr-1`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {review.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
