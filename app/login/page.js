"use client";
import { useState } from 'react';
import styles from './Login.module.css';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the userID returned from the backend
                localStorage.setItem('userID', data.userID);
                setMessage({ type: "success", text: data.message });
                setTimeout(() => {
                    window.location.href = `/donorPage/${data.userID}`;
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
                <div className={styles.formGroup}>
                <h1 className={styles.pageTitle}>Donor Login</h1>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your email"
                        required 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your password"
                        required 
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Submit
                </button>
            </form>

            {message && (
                <p className={`${styles.message} ${
                    message.type === "success" 
                        ? styles.successMessage 
                        : styles.errorMessage
                }`}>
                    {message.text}
                </p>
            )}
        </div>
    );
}
