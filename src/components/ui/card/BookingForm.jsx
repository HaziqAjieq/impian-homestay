import React, { useEffect, useState } from "react";
import CalendarBooking from "../../calendar/CalendarBooking";
import wpApi from "../../../lib/api/axios";

// ✅ Helper: format date as dd/mm/yy without timezone shift
function formatDateMY(date) {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
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
  useEffect(()=>{
    const fetchProperty = async () =>{
      try{
        const response = await wpApi.get(`/wp/v2/property/${propertyId}`);
        const property = response.data;

        const perNight = 
        property.meta?.price || property.acf?.price || 0;

        setPricePerNight(Number(perNight) || 0);
      } catch (err){
        console.error('Error fetching property price:' , err);
      }
    };
    fetchProperty();
  },[propertyId])

  // Handle dates selected from calendar
  const handleDatesSelected = (dates) => {
    setSelectedDates(dates);
    setForm((prev) => ({
      ...prev,
      check_in: formatDateMY(new Date(dates.check_in)),
      check_out: formatDateMY(new Date(dates.check_out)),
    }));


  // calculate night between checkin and checkout
  const start = new Date(dates.check_in);
  const end = new Date(dates.check_out);

  if (start && end && start < end){
    const diffTime = end - start;
    const night = Math.ceil((diffTime / (1000 * 60 * 60 * 24)) + 1 );
    const total = night * pricePerNight ;
    setBookingPrice(total);
  }else{
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
      const res = await fetch(
        "https://impian-homestay.local/wp-json/homestay/v1/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        alert("Booking created! ID: " + data.id);
        setForm({
          name: "",
          email: "",
          phone_number: "",
          check_in: "",
          check_out: "",
          guests: 1,
          notes: "",
          property_id: propertyId,
        });
        setSelectedDates(null);
      } else {
        alert("Booking failed: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Network/CORS error:", err);
      alert("Network/CORS error: Check if WordPress is sending CORS headers.");
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
          <p className="text-sm text-gray-600">
            ({pricePerNight} per night)
          </p>
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
