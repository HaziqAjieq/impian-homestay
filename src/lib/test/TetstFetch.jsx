import React, { useEffect } from "react";
import { fetchProperties } from "../api/wp-property";

export default function TestFetch() {
  useEffect(() => {
    fetchProperties()
      .then(data => console.log("Fetched in React:", data))
      .catch(err => console.error(err));
  }, []);

  return <div>Check your console!</div>;
}