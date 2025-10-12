import wpApi from "./axios";

// 🕒 Cache expiry time (ms) — e.g. 5 minutes
const CACHE_DURATION = 5 * 60 * 1000; 

// 🧰 Helper to get and set cache
function getCache(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
}

function setCache(key, data) {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}

// 📸 Fetch multiple images in one call
async function fetchImagesBatch(ids = []) {
  const validIds = [...new Set(ids.filter(Boolean))]; // remove duplicates
  if (validIds.length === 0) return {};

  const query = validIds.map(id => `include[]=${id}`).join("&");
  const { data } = await wpApi.get(`/wp/v2/media?${query}`);

  // 🧭 Convert to object for fast lookup
  return data.reduce((acc, img) => {
    acc[img.id] = img.source_url;
    return acc;
  }, {});
}

// 🏡 Fetch properties with gallery & iCal URL
export async function fetchProperties() {
  const cacheKey = "properties_v1";
  const cached = getCache(cacheKey);
  if (cached) return cached;

  // 1️⃣ Fetch property list
  const { data: properties } = await wpApi.get("/wp/v2/property");

  // 2️⃣ Collect all image IDs
  const allImageIds = properties.flatMap(item => [
    item.acf.featured_image,
    item.acf.images_1,
    item.acf.images_2,
    item.acf.images_3,
    item.acf.images_4,
    item.acf.images_5,
  ]).filter(Boolean);

  // 3️⃣ Fetch all media in one go
  const mediaMap = await fetchImagesBatch(allImageIds);

  // 4️⃣ Map property data with image URLs
  const result = properties.map(item => {
    const imageIds = [
      item.acf.images_1,
      item.acf.images_2,
      item.acf.images_3,
      item.acf.images_4,
      item.acf.images_5,
    ].filter(Boolean);

    return {
      id: item.id,
      title: item.title.rendered,
      price: item.acf.price,
      location: item.acf.location,
      bedrooms: item.acf.bedrooms,
      bathrooms: item.acf.bathrooms,
      slug: item.slug,
      propertyType: item.acf.property_type,
      featuredImage: mediaMap[item.acf.featured_image] || null,
      image: imageIds.map(id => mediaMap[id]).filter(Boolean),
      icalUrl: item.acf.imerge_ical_url || null,
    };
  });

  // 5️⃣ Store in cache
  setCache(cacheKey, result);

  return result;
}

// 📅 Fetch availability for all properties between date range
export async function fetchAvailability(startDate, endDate) {
  const res = await wpApi.post(`/homestay/v1/availability`, {
    startDate,
    endDate,
  });
  return res.data;
}
