"use client";
import { useState } from 'react';
import styles from './RegionalAddBlood.module.css'; // Ensure the module CSS is imported

export default function RegionalAddBlood() {
    const [bloodID, setserialID] = useState('');
    const [hospitalID, sethospitalID] = useState('');
    const [patientUserID, setpatientUserID] = useState('');
    const [patientNumber, setpatientNumber] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/hospitalDashboard/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bloodID,
                    hospitalID,
                    patientUserID,
                    patientNumber,
                    status,
                    sourceType: 'hospital', // Specify the source type
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
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem', fontSize: '2.0rem' }}>
    Update Blood Details
</h2>

                <div className={styles.formGroup}>
                    <label>Blood Serial ID</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter Blood Serial ID"
                        value={bloodID}
                        onChange={(e) => setserialID(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Hospital ID</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter Hospital ID"
                        value={hospitalID}
                        onChange={(e) => sethospitalID(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Patient User ID</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter Patient User ID"
                        value={patientUserID}
                        onChange={(e) => setpatientUserID(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Patient Number</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter Patient Number"
                        value={patientNumber}
                        onChange={(e) => setpatientNumber(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Status</label>
                    <select
                        className={styles.input}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Select Status
                        </option>
                        <option value="compatible">Compatible</option>
                        <option value="incompatible">Incompatible</option>
                    </select>
                </div>
                <button type="submit" className={styles.submitButton}>
                    Submit
                </button>
                {message && (
                    <p
                        className={`${styles.message} ${
                            message.type === "success"
                                ? styles.successMessage
                                : styles.errorMessage
                        }`}
                    >
                        {message.text}
                    </p>
                )}
            </form>
        </div>
    );
}
