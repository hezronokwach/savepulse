import React from 'react'
import Link from "next/link"
import Image from 'next/image';
// import BookAppointment from './bookAppointment/page';

import './globals.css'
import BookAppointment from './bookAppointment/page';

export default function LandingPage() {
  return (
    <div className="mt-16"> {/* Added margin-top to push content down */}
      {/* Special Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-gray-900">Save Lives, One Drop at a Time</h2>
    <p className="mt-4 text-xl text-gray-600">Track your blood donation journey and see your impact</p>
  </div>
  
  {/* Centered Link Cards */}
  <div className="flex justify-center gap-8">
    <Link href="/signup" className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 text-center">
      <div className="mx-auto mb-2 text-red-600 text-4xl">🩸</div>
      <span className="font-semibold text-gray-800">Donor Sign Up</span>
    </Link>

    <Link href="/login" className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 text-center">
      <div className="mx-auto mb-2 text-red-600 text-4xl">🩺</div>
      <span className="font-semibold text-gray-800">Donor Login</span>
    </Link>
    <Link href="/" className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 text-center">
      <div className="mx-auto mb-2 text-red-600 text-4xl">🩸</div>
      <BookAppointment/>
    </Link>
  </div>
</div>

      {/* Card Grid */}
      <div className="card-grid">
        {/* Donation Center Card */}
        <div className="card">
          <img src="/images/img1.jpeg/" alt="Donation Center" className="card-image" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Find Donation Centers</h3>
            <p className="text-gray-600 mb-4">Locate nearby blood donation centers easily</p>
            <button className="btn-primary w-full py-2 rounded-md">Find Centers</button>
          </div>
        </div>

        {/* Donation Tracking Card */}
        <div className="card">
          <img src="/images/img2.jpeg/" alt="Donation Tracking" className="card-image" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Track Your Donation</h3>
            <p className="text-gray-600 mb-4">Follow your blood's journey from recipient</p>
            <button className="btn-primary w-full py-2 rounded-md">View Tracking</button>
          </div>
        </div>

        {/* Emergency Needs Card */}
        <div className="card">
          <img src="/images/img3.jpeg/" alt="Emergency Needs" className="card-image" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Emergency Blood Needs</h3>
            <p className="text-gray-600 mb-4">Urgent calls for blood donation in your area</p>
            <button className="btn-primary w-full py-2 rounded-md">View Alerts</button>
          </div>
        </div>

        {/* Donor Rewards Card */}
        <div className="card">
          <img src="/images/img4.jpeg/" alt="Donor Rewards" className="card-image" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Donor Rewards</h3>
            <p className="text-gray-600 mb-4">Earn badges and recognition for your donations</p>
            <button className="btn-primary w-full py-2 rounded-md">View Rewards</button>
          </div>
        </div>
      </div>
    </div>
  )
}

 
