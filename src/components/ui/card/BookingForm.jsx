import React, { useEffect, useState } from "react";
import CalendarBooking from "../../calendar/CalendarBooking";
import wpApi from "../../../lib/api/axios";
// import { createBill } from "../../../lib/api/toyyibpay";

// ✅ Helper: format date as dd/mm/yy without timezone shift
// For backend API (YYYY-MM-DD)
function formatDateISO(date) {
  if (!date) return "";
  if (typeof date === "string") date = new Date(date);

  if (!(date instanceof Date) || isNaN(date)) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function BookingForm({ propertyId }) {
  const [selectedDates, setSelectedDates] = useState(null);
  const [pricePerNight, setPricePerNight] = useState(0);
  const [bookingPrice, setBookingPrice] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    check_in: "",
    check_out: "",
    guests: 1,
    notes: "",
    property_id: propertyId,
  });

  // fetch pernight price from wp
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await wpApi.get(`/wp/v2/property/${propertyId}`);
        const property = response.data;

        const perNight = property.meta?.price || property.acf?.price || 0;

        setPricePerNight(Number(perNight) || 0);
      } catch (err) {
        console.error("Error fetching property price:", err);
      }
    };
    fetchProperty();
  }, [propertyId]);

  // Handle dates selected from calendar
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

const handleDatesSelected = (dates) => {
  setSelectedDates(dates);

  const start = new Date(dates.check_in);
  const end = new Date(dates.check_out);

  // keep the form check_in/check_out as ISO YYYY-MM-DD strings
  setForm((prev) => ({
    ...prev,
    check_in: formatDateISO(start),
    check_out: formatDateISO(end),
  }));

  if (start && end && start < end) {
    const diffTime = end - start;
    const nights = Math.floor(diffTime / MS_PER_DAY); // exclusive checkout
    const total = nights * pricePerNight;

    // push nights and total_amount into the form object that will be POSTed
    setForm((prev) => ({
      ...prev,
      nights,
      total_amount: total,
    }));

    setBookingPrice(total);
  } else {
    setForm((prev) => ({
      ...prev,
      nights: 0,
      total_amount: 0,
    }));
    setBookingPrice(0);
  }

  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.check_in || !form.check_out) {
    alert("Please select check-in and check-out dates from the calendar");
    return;
  }

  try {
    // Step 1: Save booking in WordPress
    const res = await fetch(
      "https://impian-homestay.local/wp-json/homestay/v1/booking",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server responded with error:", res.status, errorText);
      alert(`Booking failed: ${res.status}`);
      return;
    }

    const data = await res.json();
    console.log("Booking Response:", data);

    if (data.success) {
     window.location.href = data.redirect;
    } else {
      alert("Booking failed: " + JSON.stringify(data));
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong, please try again.");
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-100 rounded-xl h-auto shadow-2xl md:sticky md:top-30 z-10 text-gray-600"
    >
      <h2 className="text-xl font-semibold mb-4">Book This Property</h2>

      {/* Calendar inside the booking form */}
      <div className="mb-6">
        <CalendarBooking
          propertyId={propertyId}
          onDatesSelected={handleDatesSelected}
        />
      </div>

      {/* Selected dates display */}
      {form.check_in && form.check_out && (
        <div className="mb-4 p-3 bg-green-50 rounded-md">
          <p className="font-medium text-green-700">Selected Dates:</p>
          <p>Check-in: {form.check_in}</p>
          <p>Check-out: {form.check_out}</p>
        </div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border border-gray-400 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border border-gray-400 rounded"
      />
      <input
        type="number"
        name="phone_number"
        onChange={handleChange}
        placeholder="Phone Number"
        value={form.phone_number}
        required
        className="w-full mb-3 p-2 border border-gray-400 rounded"
      />

      <input
        type="number"
        name="guests"
        onChange={handleChange}
        placeholder="Guests"
        value={form.guests}
        required
        className="w-full border border-gray-400 h-[40px] rounded mb-4 p-2"
      />

      {/* Hidden inputs for dates (auto-filled by calendar) */}
      <input type="hidden" name="check_in" value={form.check_in} />
      <input type="hidden" name="check_out" value={form.check_out} />

      <textarea
        name="notes"
        onChange={handleChange}
        placeholder="Notes"
        value={form.notes}
        className="w-full border border-gray-400 p-2 mb-4 rounded"
      ></textarea>

      {/* Price display */}
      {bookingPrice > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-md">
          <p className="text-lg font-semibold text-yellow-700">
            💰 Total Price: RM {bookingPrice.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">({pricePerNight} per night)</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!form.check_in || !form.check_out}
        className="bg-custom-brown text-white px-6 py-2 rounded-lg hover:bg-custom-brown2 transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed w-full"
      >
        Book Now
      </button>
    </form>
  );
}
