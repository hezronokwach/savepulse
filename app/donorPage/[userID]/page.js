"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './DonorTrackingPage.module.css';
import SideNav5 from '@/Components/SideNav5/page';

export default function DonorTrackingPage() {
    const [userData, setUserData] = useState(null);
    const [donationCount, setDonationCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userID } = useParams(); // Get the satellite ID from the URL
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/donorPage/${userID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setUserData(data.user);
                setDonationCount(data.donationCount);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userID]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <SideNav5 id={userID} />
        <div className={styles.pageContainer}>
           
            
            <div className={styles.mainContent}>
                <div className={styles.welcomeSection}>
                    <h1 className={styles.welcomeTitle}>
                        Welcome, {userData?.firstName} {userData?.lastName}
                    </h1>
                    <p className={styles.userId}>User ID: {userID}</p>
                </div>

                <div className={styles.statsContainer}>
                    <div className={styles.statsCard}>
                        <h3>Blood Type</h3>
                        <p className={styles.statsValue}>{userData?.bloodType || 'N/A'}</p>
                    </div>
                    
                    <div className={styles.statsCard}>
                        <h3>Total Donations</h3>
                        <p className={styles.statsValue}>{donationCount}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

// {emergencies.length > 0 && (
//     <div className={styles.emergencySection}>
//         <h2>Emergency Blood Requests</h2>
//         <div className={styles.emergencyCards}>
//             {emergencies.map((emergency, index) => (
//                 <div key={index} className={styles.emergencyCard}>
//                     <div className={styles.emergencyHeader}>
//                         <span className={styles.urgentBadge}>Urgent</span>
//                         <span className={styles.bloodType}>{emergency.BloodType}</span>
//                     </div>
//                     <p className={styles.location}>{emergency.RegionLocation}</p>
//                     <p className={styles.message}>{emergency.Message}</p>
//                 </div>
//             ))}
//         </div>
//     </div>
// )}