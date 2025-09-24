import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import wpApi from "../../lib/api/axios";

export default function CalendarBooking({ propertyId, onDatesSelected }) {
  // defne useState
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [icalUrl, setIcalUrl] = useState(null);

  //fetch property data and ical url from wordpress
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await wpApi.get(`/wp/v2/property/${propertyId}`);
        const property = response.data;

        // get ical url from custom field
        const icalMergeUrl =
          property.meta?.imerge_ical_url ||
          property.acf?.imerge_ical_url ||
          property.imerge_ical_url;

        setIcalUrl(icalMergeUrl);

        // set if statement if found the data
      if (icalMergeUrl) {
        await fetchCalenderData(icalMergeUrl); // ← This line is missing
      } else {
        setLoading(false); // If no URL, stop loading
      }
      } catch (err) {
        console.error("Error fetching property:", err);
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  // fetch icalmerge data
  const fetchCalenderData = async (url) => {
    try {
       const path = url.replace('https://api.icalmerge.com', '');
      const response = await fetch(`/api/ical${path}`);
      const icalData = await response.text();
      const dates = parselICalData(icalData);
      setAvailableDates(dates);
    } catch (err) {
      console.error("Error fetching calendar:", err);
    } finally {
      setLoading(false);
    }
  };

  // Ical parser
  const parselICalData = (icalData) => {
    const availableDates = [];
    const lines = icalData.split("\n");

    let currentEvent = {};
    lines.forEach((line) => {
      // accepting start date
      if (line.startsWith("DTSTART:")) {
        const dateStr = line.replace("DTSTART:", "").trim();
        currentEvent.start = new Date(dateStr);
      }

      //accepting end date
      if (line.startsWith("DTEND:")) {
        const dateStr = line.replace("DTEND:", "").trim();
        currentEvent.end = new Date(dateStr);
      }

      if (line === "END:VEVENT" && currentEvent.start) {
        availableDates.push({ ...currentEvent });
        currentEvent = {};
      }
    });

    return availableDates;
  };

  //check if data is available
  const isDateAvailable = (date) => {
     // If no available dates data yet, allow selection
    if (availableDates.length === 0) {
      return true;
    }
    
    // Check if the date falls within any available range
    return availableDates.some(
      (avail) => date >= avail.start && date <= avail.end
    );
  };

  const filterDate = (date) => {
    return isDateAvailable(date);
  };

  

  //Handle date changes and pass to parent
  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate) {
      onDatesSelected({
        check_in: startDate.toISOString().split("T")[0],
        check_out: date.toISOString().split("T")[0],
      });
    }
  };

   // Handle end date change
  const handleEndDateChange = (date) => {
    setEndDate(date);
    // If we have both dates, send to parent
    if (startDate && date) {
      onDatesSelected({
        check_in: startDate.toISOString().split("T")[0],
        check_out: date.toISOString().split("T")[0],
      });
    }
  };

  if (loading) return <div>Loading availability calendar...</div>;

  if (!icalUrl) return <div>No calendar available for this property.</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Select Your Dates</h3>

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

      
    </div>
  );
}
