import { useState } from "react";
import wpApi from "../lib/api/axios"; // should already point to your WP REST API base URL

export default function useAvailability() {
  const [loading, setLoading] = useState(false);
  const [availableProperties, setAvailableProperties] = useState([]);
  const [error, setError] = useState(null);

  const checkAvailability = async ({ checkIn, checkOut, guests }) => {
    setLoading(true);
    setError(null);

    try {
      // Combine guest counts if needed (not essential for backend right now)
      const totalGuests = (guests?.adults || 0) + (guests?.children || 0);

      console.log("🔍 Checking availability:", {
        checkIn,
        checkOut,
        totalGuests,
      });

      // ✅ Must use POST since backend expects POST + JSON body
      const res = await wpApi.post("/homestay/v1/availability", {
        startDate: checkIn,
        endDate: checkOut,
        guests: totalGuests,
      });

      console.log("✅ Raw API response:", res.data);

      // ✅ Match backend structure
      const list = res.data.available_properties || [];

      console.log("🏡 Available properties:", list);

      setAvailableProperties(list);
    } catch (err) {
      console.error("❌ Error fetching availability:", err);
      setError("Failed to fetch availability");
    } finally {
      setLoading(false);
    }
  };

  return { checkAvailability, availableProperties, loading, error };
}
