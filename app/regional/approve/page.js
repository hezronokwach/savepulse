"use client";
import { useState } from 'react';

export default function RegionalApprove() {
    const [RequestID, setRequestID] = useState('');
    const [ApproverID, setApproverID] = useState('');
    // const [StatusMessage, setStatusMessage] = useState('');
    // const [BloodType, setBloodType] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await fetch('http://localhost:3000/Regional/approve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({RequestID,ApproverID,}),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                setTimeout(() => {
                    window.location.href = '/approve'; // Redirect using window.location
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
                    <label>RequestID</label>
                    <input type="text" value={RequestID} onChange={e => setRequestID(e.target.value)} required />
                </div>
                <div>
                    <label>ApproverID</label>
                    <input type="text" value={ApproverID} onChange={e => setApproverID(e.target.value)} required />
                </div>
                {/* <div>
                    <label>StatusMessage</label>
                    <input type="text" value={StatusMessage} onChange={e => setStatusMessage(e.target.value)} required />
                </div> */}
                {/* <div>
                    <label>BloodType</label>
                    <input type="text" value={BloodType} onChange={e => setBloodType(e.target.value)} required />
                </div> */}
               
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