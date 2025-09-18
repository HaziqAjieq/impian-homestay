import React, { useState } from "react";

export default function BookingForm({ propertyId }) {
  // set default date to avoid wrong select date booking
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const handleChangeDate = (e) => {
    setSelectedDate(e.target.value);
  };
  // form setup to wordpress
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     try {
    const res = await fetch('https://impian-homestay.local/wp-json/homestay/v1/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      // Server responded but with error (e.g. PHP fatal error, 500, 404, etc.)
      const errorText = await res.text();
      console.error("Server responded with error:", res.status, errorText);
      alert(`Booking failed: ${res.status}`);
      return;
    }

    const data = await res.json();
    console.log("Booking Response:", data);

    if (data.success) {
      alert("Booking created! ID: " + data.id);
    } else {
      alert("Booking failed: " + JSON.stringify(data));
    }
  } catch (err) {
    // If you see this, the request never reached WP (likely CORS)
    console.error("Network/CORS error:", err);
    alert("Network/CORS error: Check if WordPress is sending CORS headers.");
  }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-6 bg-gray-100 rounded-xl h-auto shadow-2xl md:sticky md:top-30 z-10 text-gray-600 "
    >
      {/* text basd on translation */}
      <h2 className="text-xl font-semibold mb-4">Book This Property</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        className="w-full mb-3 p-2 border border-gray-400 active:border-0 rounded "
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        onChange={handleChange}
        className="w-full mb-3 p-2 border border-gray-400 active:border-0  rounded"
      />
      <input
        type="number"
        name="phone_number"
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full mb-3 p-2 border border-gray-400 active:border-0  rounded"
      />

      <input
        type="number"
        name="guests"
        onChange={handleChange}
        placeholder="Guests"
        className="w-full border border-gray-400 h-[40px] rounded mb-4 p-2"
      />

      <h2>Check-in Date</h2>
      <input
        type="date"
        name="check_in"
        value={form.check_in} 
        min={today}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded border-gray-400 active:border-0"
      />

      <h2>Check-out Date</h2>
      <input
        type="date"
        name="check_out"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded border-gray-400 active:border-0"
      />

      <textarea
        name="notes"
        onChange={handleChange}
        placeholder="Notes"
        className="w-full border border-gray-400 p-2"
      ></textarea>

      <button
        type="submit"
        className="bg-custom-brown text-white px-6 py-2 rounded-lg hover:bg-custom-brown2 transition cursor-pointer"
      >
        Book Now
      </button>
    </form>
  );
}
