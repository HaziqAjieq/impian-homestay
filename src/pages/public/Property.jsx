import React, { useEffect, useState } from "react";
import PropertyCardBook from "../../components/booking/PropertyCardBook";
import Filteration from "../../components/booking/Filteration";
import PageHeader from "../../components/header/PageHeader";
import PropertyCardSkeleton from "../../components/booking/PropertyCardSkeleton";
import { fetchProperties } from "../../lib/api/wp-property";
import { useTranslation } from "react-i18next";

export default function Property() {
  const { t } = useTranslation();
  const [availableProperties, setAvailableProperties] = useState([]); // from API (after search)
  const [allProperties, setAllProperties] = useState([]); // all properties (default)
  const [showFiltered, setShowFiltered] = useState(false); // determines view mode
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  // 🟢 Load all properties on first page load
  useEffect(() => {
    const loadAllProperties = async () => {
      try {
        const data = await fetchProperties();
        setAllProperties(data);
      } catch (error) {
        console.error("❌ Error fetching all properties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllProperties();
  }, []);

  // 🟡 When filter starts — show skeleton
const handleStartSearch = () => {
  setLoading(true); // 👈 this will make the skeleton show
};

  // 🟡 When filter finishes
  const handleResults = (results) => {
    setAvailableProperties(results);
  setShowFiltered(true);
  setLoading(false);        
  setFilterLoading(false);
  };

  // 🟤 Reset back to all properties
  const handleReset = () => {
    setShowFiltered(false);
    setAvailableProperties([]);
  };

  

  return (
    <div >
      {/* Filteration Component */}
       <PageHeader title={t("booking-page.0.title-header")}>
        <p>{t("booking-page.0.header-description")}</p>
      </PageHeader>


      <div className="w-full flex justify-center mb-6">
        <Filteration onResults={handleResults} onReset={handleReset}  onStart={handleStartSearch}  />
      </div>

      {/* Loading State */}
      {loading || filterLoading ? (
       <PropertyCardSkeleton count={6} />
      ) : (
       <PropertyCardBook
    properties={allProperties}
    availableProperties={availableProperties}
    showOnlyAvailable={showFiltered}
  />
      )}
    </div>
  );
}
