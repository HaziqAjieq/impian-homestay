import React from 'react'
import { useState, useEffect } from 'react';
import PageHeader from '../../components/header/PageHeader'
import { useTranslation } from 'react-i18next'
import Filteration from '../../components/booking/Filteration';
import useProperties from "../../hooks/useProperties";
import useAvailability from "../../hooks/useAvailability";
import PropertyList from '../../components/booking/PropertyList';

export default function Property() {
  const { t } = useTranslation();
 const [results, setResults] = useState([]);
  // Load properties
  const { properties, loading: loadingProperties } = useProperties();

  // Property IDs are always defined, even if empty
  const propertyIds = properties.map(p => p.id);

  // Load availability (even with empty IDs, hook stays consistent)
  const { availability, loading: loadingAvailability } = useAvailability(propertyIds);

  const [filters, setFilters] = useState(null);

  // Loading state
  if (loadingProperties || loadingAvailability) {
    return <p>Loading...</p>;
  }

  // Check availability
  const isAvailable = (propertyId, checkIn, checkOut) => {
    if (!availability[propertyId]) return true; // no bookings = available
    const bookings = availability[propertyId];
    return !bookings.some(booking => (
      checkIn <= booking.end && checkOut >= booking.start
    ));
  };

  // Apply filters
  const filteredProperties = filters
    ? properties.filter(p => {
        const okDates = isAvailable(p.id, filters.checkIn, filters.checkOut);
        const okGuests = !filters.guests
          || (p.acf?.max_guests
            ? filters.guests.adults + filters.guests.children <= p.acf.max_guests
            : true);
        return okDates && okGuests;
      })
    : properties;

  // Debug logging
 

  return (
    <>
      <PageHeader title={t("booking-page.0.title-header")}>
        <p>{t("booking-page.0.header-description")}</p>
      </PageHeader>

      {/* date filteration */}
      <Filteration onSearch={setResults} />

      {/* debug info */}
      <PropertyList properties={results} />
    </>
  );
}

