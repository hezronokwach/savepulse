// RegionalAddBlood.tsx
"use client";
import { useState } from 'react';
import styles from './RegionalAddBlood.module.css';

export default function RegionalAddBlood() {
    const [bloodID, setserialID] = useState('');
    const [regionalID, setregionalID] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/regional/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bloodID,
                    regionalID,
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
                <h2 className={styles.formTitle}>Regional Blood Registration</h2>
                
                <div className={styles.formGroup}>
                    <label>Blood Serial ID</label>
                    <input 
                        type="text" 
                        value={bloodID} 
                        onChange={e => setserialID(e.target.value)} 
                        className={styles.input}
                        placeholder="Enter Blood Serial ID"
                        required 
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label>Regional ID</label>
                    <input 
                        type="text" 
                        value={regionalID} 
                        onChange={e => setregionalID(e.target.value)} 
                        className={styles.input}
                        placeholder="Enter Regional ID"
                        required 
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label>Status</label>
                    <input 
                        type="text" 
                        value={status} 
                        onChange={e => setStatus(e.target.value)} 
                        className={styles.input}
                        placeholder="Enter Status"
                        required 
                    />
                </div>

                <button type="submit" className={styles.submitButton}>Submit</button>

                {message && (
                    <div 
                        className={`${styles.message} ${
                            message.type === "success" ? styles.successMessage : styles.errorMessage
                        }`}
                    >
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
}