"use client";

import { useState } from 'react';
import styles from './DonorForm.module.css';
import { useParams } from 'next/navigation';

export default function DonorForm({ satelliteId }) {
    const [userID, setUserID] = useState('');
    const [status, setStatus] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const { id } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/donoradd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID,
                    status,
                    satelliteID: id, // Use the satelliteId prop
                    sourceType: 'satellite' // Specify the source type
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setResponseMessage({ type: "success", text: "Donation recorded successfully!" });
                setTimeout(() => {
                    window.location.href = `/donorPage/${userID}`;
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Blood Donation Form</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="userID">User ID:</label>
                    <input 
                        id="userID" 
                        type="text" 
                        className={styles.input} 
                        value={userID} 
                        onChange={(e) => setUserID(e.target.value)} 
                        required 
                        placeholder="Enter your User ID" 
                    />
                </div>                        
                <div className={styles.formGroup}>
                    <label htmlFor="status">Status:</label>
                    <input 
                        id="status" 
                        type="text" 
                        className={styles.input} 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        placeholder="Enter your status" 
                    />
                </div>
               
                <button type="submit" className={styles.submitButton}>Submit Donation</button>
                {responseMessage && 
                    <div className={`${styles.message} ${responseMessage.type === "success" ? styles.successMessage : styles.errorMessage}`}>
                        {responseMessage.text}
                    </div>
                }
            </form>
        </div>
    );
};