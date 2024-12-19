import React from 'react';
import Link from 'next/link';
import '../../ui/sidebar.css';

export default function SideNav() {
  return (
    <div className="side-nav">
      <div className="side-nav-container">
        {/* Navigation Links */}
        <div className="nav-buttons">
        {/* <Link href="/" className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40">
                <div className="w-32 text-white md:w-40">Home
                </div>
            </Link> */}
            <Link href="/hospitalDashboard/" className="nav-link">Home</Link>
            <Link href="/hospitalDashboard/request" className="nav-link">Request Blood</Link>
            <Link href="/hospitalDashboard/update" className="nav-link">Update Blood</Link>
            <Link href="/hospitalDashboard/update" className="nav-link">Profile</Link>
            <Link href="/hospitalDashboard/update" className="nav-link">settings</Link>
            <Link href="/hospitalDashboard/update" className="nav-link">Actions</Link>
            <Link href="/hospitalDashboard/update" className="nav-link">Issues</Link>
        </div>

        {/* Sign Out Button */}
        <button className="sign-out-button">Sign Out</button>
      </div>

      {/* Message */}
      <div className="hospital-message">
        Hospital Dashboard
      </div>
    </div>
  );
}
