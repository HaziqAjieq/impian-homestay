import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProperties } from "../../lib/api/wp-property.js";
import BookingForm from "../../components/ui/card/BookingForm.jsx";

function PropertyPage({properties}) {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    fetchProperties().then((all) => {
      const found = all.find((p) => p.slug === slug);
      setProperty(found);
        setMainImage(found.featuredImage );
    });
  }, [slug]);

  if (!property) {
    return <p className="p-6">Loading...</p>;
  }

  // change image when thumbnail is clicked

  return (
    <div className="grid grid-cols-6  md:grid-cols-12 mt-10  md:gap-4 rounded-2xl  mx-3">
      <div className="col-span-6   md:col-span-7 h-full rounded-2xl  w-full mb-10">
      {/* galerry image */}
        {/* ✅ Main Image */}
        <div className="main-image h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden w-full">
          <img
            src={mainImage}
            alt={property.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* ✅ Thumbnails */}
        <div className="thumbnail-grid grid grid-cols-3 md:grid-cols-4 gap-4 h-[100px] mt-4">
          {[property.featuredImage, ...property.image].map((src, index) => (
            <div
              key={index}
              className="thumbnail cursor-pointer rounded-lg overflow-hidden border  border-none hover:scale-105 transform transition duration-300 "
              onClick={() => setMainImage(src)} 
            >
              <img
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-full "
              />
            </div>
          ))}
        </div>
       
        <div className="row-start-2 col-span-4 col-start-2 mt-7">
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <p className="text-lg mt-2">{property.description}</p>
          <div className="mt-4 space-y-1">
            <p>💰 RM {property.price} / night</p>
            <p>📍 {property.location}</p>
            <p>🛏️ {property.bedrooms} Bed</p>
            <p>🛁 {property.bathrooms} Bath</p>
            <p>🏠 {property.propertyType}</p>
          </div>
        </div>
      </div>
      {/* <div className="row-start-2 px-5 col-span-6 md:row-auto  md:col-span-5 md:col-start-8">
        <BookingForm/>
      </div> */}
    </div>
  );
}

export default PropertyPage;
