import "dotenv";
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_WORDPRESS_API ||
    "http://impian-homestay.local/wp-json/wp/v2",
});

// for fetching images
async function fetchImage(id) {
  if(!id) return null;
  const response = await api.get(`/media/${id}`);
  return response.data.source_url;
}


export async function fetchProperties() {
  const res = await api.get("/property");

   return Promise.all(res.data.map(async (item) => {
    const images = await Promise.all([
      
      fetchImage(item.acf.images_2),
      fetchImage(item.acf.images_1),
      fetchImage(item.acf.images_3),
      fetchImage(item.acf.images_4),
      fetchImage(item.acf.images_5),
    ]);

    return {
      id: item.id,
      title: item.title.rendered,
      price: item.acf.price,
      location: item.acf.location,
      bedrooms: item.acf.bedrooms,
      bathrooms: item.acf.bathrooms,
      slug: item.slug,
      propertyType: item.acf.property_type,
      featuredImage: await fetchImage(item.acf.featured_image),
      image: images.filter(Boolean),
    };
  }));
}