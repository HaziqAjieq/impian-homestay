import wpApi from "./axios";

async function fetchImages(ids = []) {
  // remove null/undefined
  const validIds = ids.filter(Boolean);
  if (validIds.length === 0) return [];

  const query = validIds.map(id => `include[]=${id}`).join("&");

  const response = await wpApi.get(`/wp/v2/media?${query}`);
  const images = response.data;

  // return in the same order as input IDs
  return validIds.map(id => {
    const media = images.find(img => img.id === id);
    return media ? media.source_url : null;
  });
}

export async function fetchProperties() {
  const res = await wpApi.get("wp/v2/property");

  return Promise.all(res.data.map(async (item) => {
    const imageIds = [
      item.acf.images_1,
      item.acf.images_2,
      item.acf.images_3,
      item.acf.images_4,
      item.acf.images_5,
    ];

    const [featuredImage, ...gallery] = await fetchImages([
      item.acf.featured_image,
      ...imageIds,
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
      featuredImage,
      image: gallery.filter(Boolean),
    };
  }));
}
