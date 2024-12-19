"use client";
import { useState } from 'react';
import styles from '../../login/Login.module.css';

export default function Dashboard() {
    const [adminData, setAdminData] = useState(null);

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Admin Dashboard</h1>
            {adminData && <p>Welcome, {adminData.email}</p>}
            <div className={styles.formGroup}>
                {/* Add your dashboard content here */}
            </div>
        </div>
    );
}