import React, { useState, useRef, useEffect } from "react";
import useAvailability from "../../hooks/useAvailability";

export default function Filteration({ onResults }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const [openFilter, setOpenFilter] = useState(false);
  const [openGuestDropdown, setOpenGuestDropdown] = useState(false);

  const filterRef = useRef(null);
  const guestRef = useRef(null);

  const { checkAvailability, availableProperties, loading, error } =
    useAvailability();

  // close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setOpenGuestDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGuestChange = (type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value),
    }));
  };

  /**
   * ✅ Improved: ensures correct parameter format for backend
   * and logs useful info for debugging
   */
  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    console.log("🔎 Searching availability...", {
      checkIn,
      checkOut,
      guests,
    });

    await checkAvailability({
      checkIn,
      checkOut,
      guests,
    });

  

    // Pass results up to parent (if needed)
    if (onResults) onResults(availableProperties);

    setOpenFilter(false);
  };

  const totalGuests = guests.adults + guests.children + guests.infants;

  return (
    <div className="w-full flex justify-end mt-5 pr-5 md:justify-center">
      {/* MOBILE BUTTON */}
      <div className="md:hidden flex justify-center">
        <button
          className="bg-custom-brown text-white px-6 py-2 rounded-lg shadow-md"
          onClick={() => setOpenFilter(true)}
        >
          {totalGuests > 0 ? `${totalGuests} Guests` : "Open Filter"}
        </button>
      </div>

      {/* DESKTOP BAR */}
      <div className="hidden md:flex flex-row items-center gap-4 bg-white shadow-lg p-4 rounded-2xl relative">
        {/* Check-in */}
        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        {/* Check-out */}
        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        {/* Guests dropdown */}
        <div className="relative" ref={guestRef}>
          <button
            className="border rounded-lg px-4 py-2 w-40 text-left"
            onClick={() => setOpenGuestDropdown(!openGuestDropdown)}
          >
            {totalGuests > 0 ? `${totalGuests} Guest(s)` : "Add guests"}
          </button>

          {openGuestDropdown && (
            <div className="absolute top-12 left-0 bg-white shadow-xl rounded-xl w-64 p-4 z-50">
              {[
                { key: "adults", label: "Adults (13+)" },
                { key: "children", label: "Children (2–12)" },
                { key: "infants", label: "Infants (Under 2)" },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <span>{label}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-full"
                      onClick={() => handleGuestChange(key, -1)}
                    >
                      -
                    </button>
                    <span>{guests[key]}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-full"
                      onClick={() => handleGuestChange(key, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <button
          className="bg-custom-brown text-white px-6 py-2 rounded-lg hover:bg-custom-brown2"
          onClick={handleSearch}
        >
          {loading ? "Checking..." : "Search"}
        </button>
      </div>

      {/* MOBILE FILTER POPUP */}
      {openFilter && (
        <div
          ref={filterRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white w-11/12 max-w-md p-6 rounded-2xl shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Filter</h2>

            {/* Check-in */}
            <label className="block mb-2">Check-in</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 mb-4 w-full"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            {/* Check-out */}
            <label className="block mb-2">Check-out</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 mb-4 w-full"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            {/* Guests */}
            <div className="space-y-4 mb-6">
              {Object.entries({
                adults: "Adults (13+)",
                children: "Children (2–12)",
                infants: "Infants (Under 2)",
              }).map(([key, label]) => (
                <div
                  key={key}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>{label}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-full"
                      onClick={() => handleGuestChange(key, -1)}
                    >
                      -
                    </button>
                    <span>{guests[key]}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-full"
                      onClick={() => handleGuestChange(key, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() => setOpenFilter(false)}
              >
                Cancel
              </button>
              <button
                className="bg-custom-brown text-white px-6 py-2 rounded-lg"
                onClick={handleSearch}
              >
                {loading ? "Checking..." : "Search"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
