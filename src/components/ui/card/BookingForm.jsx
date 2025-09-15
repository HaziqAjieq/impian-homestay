import React from 'react'

export default function BookingForm() {
  return (
    <form className="my-8 p-6 bg-gray-100 rounded-xl h-auto shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Book This Property</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full mb-3 p-2 border rounded"
        />
         <input
          type="number"
          placeholder="Phone Number"
          className="w-full mb-3 p-2 border rounded"
        />
        <h2>Check-in Date</h2>
        <input type="date" className="w-full mb-3 p-2 border rounded" />
        <h2>Check-out Date</h2>
        <input type="date" className="w-full mb-3 p-2 border rounded" />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Book Now
        </button>
      </form>
  )
}
