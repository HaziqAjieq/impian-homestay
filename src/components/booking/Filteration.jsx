import React, { useState, useEffect, useRef } from "react";
import useAvailability from "../../hooks/useAvailability";

export default function Filteration({ onResults, onReset ,onStart}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [openModal, setOpenModal] = useState(false);

  const { checkAvailability, loading } = useAvailability();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

      if (onStart) onStart();
    const result = await checkAvailability({ checkIn, checkOut, guests });
    if (onResults) onResults(result);
    setOpenModal(false);
  };

  const handleReset = () => {
    setCheckIn("");
    setCheckOut("");
    setGuests({ adults: 1, children: 0, infants: 0 });
    if (onReset) onReset();
    setOpenModal(false);
  };

  return (
    <>
      {/* 🖥️ DESKTOP FILTER */}
      <div className="hidden md:flex flex-row justify-center gap-4 my-6 items-center">
        <input
          type="date"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-custom-brown"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <input
          type="date"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-custom-brown"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <button
          className="bg-custom-brown text-white px-6 py-2 rounded-lg hover:bg-custom-brown2 transition-all"
          onClick={handleSearch}
        >
          {loading ? "Checking..." : "Search"}
        </button>
        <button
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {/* 📱 MOBILE BUTTON */}
      <div className="flex md:hidden justify-center my-4">
        <button
          className="bg-custom-brown text-white px-6 py-2 rounded-lg shadow-md hover:bg-custom-brown2 transition-all"
          onClick={() => setOpenModal(true)}
        >
          Open Filter
        </button>
      </div>

      {/* 📱 MOBILE MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm transition-all">
          <div
            ref={modalRef}
            className="bg-white w-11/12 max-w-md p-6 rounded-2xl shadow-2xl relative animate-fadeIn"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-6 text-center text-custom-brown">
              Filter Options
            </h2>

            {/* DATE INPUTS */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Check-in</label>
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-custom-brown"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Check-out</label>
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-custom-brown"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>

            {/* 🧍 Removed Total Guests section */}

            {/* ACTION BUTTONS */}
            <div className="flex justify-between gap-3 mt-8">
              <button
                className="bg-gray-300 w-1/2 px-5 py-2 rounded-lg font-medium hover:bg-gray-400 transition-all"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="bg-custom-brown w-1/2 text-white px-6 py-2 rounded-lg font-medium hover:bg-custom-brown2 transition-all"
                onClick={handleSearch}
              >
                {loading ? "Checking..." : "Search"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
