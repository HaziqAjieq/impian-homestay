import { useState } from "react";
import wpApi from "../lib/api/axios";

export default function useAvailability() {
  const [loading, setLoading] = useState(false);
  const [availableProperties, setAvailableProperties] = useState([]);
  const [error, setError] = useState(null);

  const checkAvailability = async ({ checkIn, checkOut, guests }) => {
    setLoading(true);
    setError(null);

    try {
      const totalGuests = (guests?.adults || 0) + (guests?.children || 0);

      const res = await wpApi.post("/homestay/v1/availability", {
        startDate: checkIn,
        endDate: checkOut,
        guests: totalGuests,
      });

      const list = res.data.available_properties || [];
      setAvailableProperties(list);

      // return so Property.jsx can use it
      return list;
    } catch (err) {
      console.error("❌ Error fetching availability:", err);
      setError("Failed to fetch availability");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { checkAvailability, availableProperties, loading, error };
}
