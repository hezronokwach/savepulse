"use client";
import { useState } from 'react';
import styles from './SatelitteSignUp.module.css';

export default function SatelitteSignUp() {
    const [satelliteName, setsatelliteName] = useState('');
    const [satelliteLocation, setsatelliteLocation] = useState('');
    const [contactPerson, setcontactPerson] = useState('');
    const [contactEmail, setcontactEmail] = useState('');
    const [contactPassword, setcontactPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/satelitteSignup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ satelliteName, satelliteLocation, contactPerson, contactEmail, contactPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                setTimeout(() => {
                    window.location.href = '/satelitteLogin'; // Redirect after 1 second
                }, 1000);
            } else {
                setMessage({ type: "error", text: data.message });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred. Please try again." });
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Satellite Sign-Up</h2>
                <div className={styles.formGroup}>
                    <label>Satellite Name</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={satelliteName}
                        onChange={e => setsatelliteName(e.target.value)}
                        required
                        placeholder="Enter Satellite Name"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Satellite Location</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={satelliteLocation}
                        onChange={e => setsatelliteLocation(e.target.value)}
                        required
                        placeholder="Enter Satellite Location"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Contact Person</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={contactPerson}
                        onChange={e => setcontactPerson(e.target.value)}
                        placeholder="Enter Contact Person Name"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Contact Email</label>
                    <input
                        type="email"
                        className={styles.input}
                        value={contactEmail}
                        onChange={e => setcontactEmail(e.target.value)}
                        required
                        placeholder="Enter Contact Email"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Contact Password</label>
                    <input
                        type="password"
                        className={styles.input}
                        value={contactPassword}
                        onChange={e => setcontactPassword(e.target.value)}
                        required
                        placeholder="Enter Contact Password"
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
            {message && (
                <p className={`${styles.message} ${message.type === "success" ? styles.successMessage : styles.errorMessage}`}>
                    {message.text}
                </p>
            )}
        </div>
    );
}
