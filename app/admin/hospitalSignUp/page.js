"use client";
import { useState } from 'react';

export default function HospitalSignUp() {
    const [hospitalID, sethospitalID] = useState('');
    const [hospitalName, sethospitalName] = useState('');
    const [hospitalLocation, sethospitalLocation] = useState('');
    const [contactPerson, setcontactPerson] = useState('');
    const [contactEmail, setcontactEmail] = useState('');
    const [contactPassword, setcontactPassword] = useState('');
    const [message, setMessage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3000/regional', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({hospitalID, hospitalName, hospitalLocation, contactPerson, contactEmail, contactPassword}),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                setTimeout(() => {
                    window.location.href = '/login'; // Redirect using window.location
                }, 1000);
            } else {
                setMessage({ type: "error", text: data.message });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred. Please try again." });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
            <div>
                    <label>hospital ID</label>
                    <input type="text" value={hospitalID} onChange={e => sethospitalID(e.target.value)} required />
                </div>
                <div>
                    <label>hospital name</label>
                    <input type="text" value={hospitalName} onChange={e => sethospitalName(e.target.value)} required />
                </div>
                <div>
                    <label>hospital location</label>
                    <input type="text" value={hospitalLocation} onChange={e => sethospitalLocation(e.target.value)} required />
                </div>

                <div>
                    <label>Contact person</label>
                    <input type="text" value={contactPerson} onChange={e => setcontactPerson(e.target.value)} />
                </div>
                <div>
                    <label>Contact Email</label>
                    <input type="email" value={contactEmail} onChange={e => setcontactEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Contact Password</label>
                    <input type="password" value={contactPassword} onChange={e => setcontactPassword(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && (
                <p
                    style={{
                        color: message.type === "success" ? "green" : "red",
                        marginTop: "10px",
                    }}
                >
                    {message.text}
                </p>
            )}
        </>
    );
}

