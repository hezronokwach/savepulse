import React from 'react';
import Link from 'next/link';
import '../../ui/sidebar.css';


export default function SideNav5({id}) {
    return (
        <div className="side-nav">
           <div className="side-nav-title">
            <h2 className="text-center">Donor Page</h2>
          </div>
          <div className="side-nav-container">
            {/* Navigation Links */}
            <div className="nav-buttons">
            {/* <Link href="/" className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40">
                    <div className="w-32 text-white md:w-40">Home
                    </div>
                </Link> */}
              <Link href={`/donorPage/${id}`} className="nav-link">Home</Link>
          <Link href={`/donorPage/${id}/donationHistory`} className="nav-link">Donation History</Link>
          <Link href={`/donorPage/${id}/viewappointments`} className="nav-link">Appointments</Link>
          
            </div>
    
            {/* Sign Out Button */}
            <button className="sign-out-button">Sign Out</button>
          </div>   

        </div>
      );
        
}
