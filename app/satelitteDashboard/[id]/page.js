"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SideNav2 from '@/Components/SideNav2/page';


export default function SatelliteDashboard() {
  const { id } = useParams(); // Get the satellite ID from the URL
  const [satellite, setSatellite] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchSatelliteData = async () => {
      try {
        const response = await fetch(`/api/satelitteDashboard/${id}`);
        const data = await response.json();

        if (response.ok) {
          setSatellite(data.satellite);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('An error occurred while fetching satellite data.');
      }
    };

    fetchSatelliteData();
  }, [id]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!satellite) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <SideNav2 satelitteId={id} />
      <div className="dashboard-content">
        <h1>Satellite Dashboard</h1>
        <p><strong>Name:</strong> {satellite.satelliteName}</p>
        <p><strong>Location:</strong> {satellite.satelliteLocation}</p>
        {/* <p><strong>Contact Person:</strong> {satellite.contactPerson}</p>
        <p><strong>Contact Email:</strong> {satellite.contactEmail}</p> */}
        {/* Add more satellite details as needed */}

      </div>
    </div>
  );
}