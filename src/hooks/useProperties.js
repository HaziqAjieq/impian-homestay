// hooks/useProperties.js
import { useEffect, useState } from "react";
import { fetchProperties } from "../lib/api/wp-property";

export default function useProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { properties, loading };
}
