"use client";
import { useState } from 'react';
import styles from './SignUp.module.css';

export default function UserSignUp() {
    // const [userID, setUserID] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, phoneNumber, firstName, lastName }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                setTimeout(() => {
                    window.location.href = '/login';
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
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem', fontSize: '2.0rem' }}>
    Donor Sign Up
</h2>
                {/* <div className={styles.formGroup}>
                    <label htmlFor="userID">User ID</label>
                    <input
                        id="userID"
                        type="text"
                        value={userID}
                        onChange={e => setUserID(e.target.value)}
                        className={styles.input}
                        placeholder="Choose a unique username"
                        required 
                    />
                </div> */}

                <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your first name"
                        required 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your last name"
                        required 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="you@example.com"
                        required 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className='text' htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Create a strong password"
                        required 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number (Optional)</label>
                    <input
                        id="phoneNumber"
                        type="text"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your phone number"
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