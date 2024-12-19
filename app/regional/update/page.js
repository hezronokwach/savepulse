"use client";
import { useState } from 'react';
import styles from './RegionalUpdateBlood.module.css'; // Import the CSS module

export default function RegionalUpdateBlood() {
    const [bloodID, setserialID] = useState('');
    const [regionalID, setregionalID] = useState('');
    const [bloodType, setbloodType] = useState('');
    const [status, setStatus] = useState('healthy'); // Default to 'healthy'
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/regional/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bloodID,
                    regionalID,
                    bloodType,
                    status,
                    sourceType: 'regional'
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: "success", text: data.message });
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
                <h2>Regional Blood Update</h2>
                <div className={styles.formGroup}>
                    <label>Blood Serial ID</label>
                    <input
                        type="text"
                        value={bloodID}
                        onChange={e => setserialID(e.target.value)}
                        required
                        placeholder="Enter Blood Serial ID"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Regional ID</label>
                    <input
                        type="text"
                        value={regionalID}
                        onChange={e => setregionalID(e.target.value)}
                        required
                        placeholder="Enter Regional ID"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Blood Type</label>
                    <input
                        type="text"
                        value={bloodType}
                        onChange={e => setbloodType(e.target.value)}
                        required
                        placeholder="Enter Blood Type"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Status</label>
                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        required
                        className={styles.input}
                    >
                        <option value="healthy">Healthy</option>
                        <option value="discarded">Discarded</option>
                    </select>
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
                {message && (
                    <div className={`${styles.message} ${message.type === "success" ? styles.successMessage : styles.errorMessage}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
}
