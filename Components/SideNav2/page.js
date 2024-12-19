import React from 'react';
import Link from 'next/link';
import '../../ui/sidebar.css';

export default function SideNav2({ satelitteId }) {
  return (
    <div className="side-nav">
      <div className="side-nav-container">
        {/* Navigation Links */}
        <div className="nav-buttons">
          <Link href={`/satelitteDashboard/${satelitteId}`} className="nav-link">Home</Link>
          <Link href={`/satelitteDashboard/${satelitteId}/donoradd`} className="nav-link">Add Blood</Link>
          <Link href={`/satelitteDashboard/${satelitteId}/update`} className="nav-link">Transfer Blood</Link>
          <Link href={`/hospitalDashboard/${satelitteId}/update`} className="nav-link">Settings</Link>
          <Link href={`/hospitalDashboard/${satelitteId}/update`} className="nav-link">Actions</Link>
          <Link href={`/hospitalDashboard/${satelitteId}/update`} className="nav-link">Issues</Link>
        </div>

        {/* Sign Out Button */}
        <button className="sign-out-button">Sign Out</button>
      </div>

      {/* Message */}
      <div className="hospital-message">
        Satelitte page
      </div>
    </div>
  );
}