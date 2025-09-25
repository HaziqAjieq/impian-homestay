import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import wpApi from "../../lib/api/axios";

export default function CalendarBooking({ propertyId, onDatesSelected }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [icalUrl, setIcalUrl] = useState(null);

  // 👉 Helper: build local date (Malaysia timezone safe)
  function makeLocalDate(year, month, day) {
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // 👉 Helper: format date in yyyy-mm-dd (Malaysia time)
  function formatDateLocal(date) {
    return date.toLocaleDateString("en-CA", {
      timeZone: "Asia/Kuala_Lumpur",
    });
  }

  // Fetch property data + calendar URL
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await wpApi.get(`/wp/v2/property/${propertyId}`);
        const property = response.data;

        const icalMergeUrl =
          property.meta?.imerge_ical_url ||
          property.acf?.imerge_ical_url ||
          property.imerge_ical_url;

        setIcalUrl(icalMergeUrl);

        if (icalMergeUrl) {
          await fetchCalendarData(propertyId);
        } else {
          setLoading(false);
        }

        console.log("Property JSON:", property);
        console.log("imerge_ical_url:", property.acf?.imerge_ical_url);
      } catch (err) {
        console.error("Error fetching property:", err);
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  // Fetch iCal data from WP proxy
  const fetchCalendarData = async (id) => {
    try {
      const response = await wpApi.get(`/homestay/v1/ical/${id}`);
      const icalData = response.data;
      const dates = parseICalData(icalData);
      setBlockedDates(dates);
    } catch (err) {
      console.error("Error fetching calendar:", err);
    } finally {
      setLoading(false);
    }
  };

  // Parse iCal into blocked date ranges
  const parseICalData = (icalData) => {
    const blockedDates = [];
    const lines = icalData.split("\n");

    let currentEvent = {};
    lines.forEach((line) => {
      const cleanLine = line.trim();

      if (cleanLine.startsWith("DTSTART")) {
        const dateStr = cleanLine.split(":")[1];
        if (dateStr) {
          if (/^\d{8}$/.test(dateStr)) {
            // YYYYMMDD all-day
            const year = dateStr.slice(0, 4);
            const month = dateStr.slice(4, 6);
            const day = dateStr.slice(6, 8);
            currentEvent.start = makeLocalDate(year, month, day);
          } else {
            currentEvent.start = new Date(dateStr);
          }
        }
      }

      if (cleanLine.startsWith("DTEND")) {
        const dateStr = cleanLine.split(":")[1];
        if (dateStr) {
          if (/^\d{8}$/.test(dateStr)) {
            const year = dateStr.slice(0, 4);
            const month = dateStr.slice(4, 6);
            const day = dateStr.slice(6, 8);
            let endDate = makeLocalDate(year, month, day);
            endDate.setDate(endDate.getDate() - 1); // inclusive
            currentEvent.end = endDate;
          } else {
            let endDate = new Date(dateStr);
            endDate.setDate(endDate.getDate() - 1);
            currentEvent.end = endDate;
          }
        }
      }

      if (cleanLine === "END:VEVENT" && currentEvent.start) {
        blockedDates.push({ ...currentEvent });
        currentEvent = {};
      }
    });

    return blockedDates;
  };

  // Check if a date is blocked
  const isDateBlocked = (date) => {
    return blockedDates.some(
      (blocked) => date >= blocked.start && date <= blocked.end
    );
  };

  const filterDate = (date) => !isDateBlocked(date);

  // Handle start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate) {
      onDatesSelected({
        check_in: formatDateLocal(date),
        check_out: formatDateLocal(endDate),
      });
    }
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date) {
      onDatesSelected({
        check_in: formatDateLocal(startDate),
        check_out: formatDateLocal(date),
      });
    }
  };

  if (loading) return <div>Loading availability calendar...</div>;
  if (!icalUrl) return <div>No calendar available for this property.</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Select Your Dates</h3>

      {blockedDates.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            📅 {blockedDates.length} date ranges blocked from calendar
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Check-in Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            filterDate={filterDate}
            placeholderText="Select check-in date"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Check-out Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            filterDate={filterDate}
            placeholderText="Select check-out date"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        <p>Blocked date ranges: {blockedDates.length}</p>
        <p>iCal URL: {icalUrl ? "Loaded" : "Not found"}</p>
      </div>
    </div>
  );
}
