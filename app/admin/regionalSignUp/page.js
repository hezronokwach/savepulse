"use client";
import { useState } from 'react';

export default function SatelitteSignUp() {
    const [regionalID, setregionalID] = useState('');
    const [regionalName, setregionalName] = useState('');
    const [regionalLocation, setregionalLocation] = useState('');
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
                body: JSON.stringify({regionalID, regionalName, regionalLocation, contactPerson, contactEmail, contactPassword}),
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
                    <label>regional ID</label>
                    <input type="text" value={regionalID} onChange={e => setregionalID(e.target.value)} required />
                </div>
                <div>
                    <label>regional name</label>
                    <input type="text" value={regionalName} onChange={e => setregionalName(e.target.value)} required />
                </div>
                <div>
                    <label>regional location</label>
                    <input type="text" value={regionalLocation} onChange={e => setregionalLocation(e.target.value)} required />
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

/*
"use client";
import { useState } from 'react';

// Reusable Input Component
function InputField({ label, type, value, onChange, required }) {
    return (
        <div>
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange} required={required} />
        </div>
    );
}

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        firstName: '',
        lastName: ''
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
                {[
                    { label: 'Email', type: 'email', name: 'email', required: true },
                    { label: 'Password', type: 'password', name: 'password', required: true },
                    { label: 'Phone Number', type: 'text', name: 'phoneNumber', required: false },
                    { label: 'First Name', type: 'text', name: 'firstName', required: true },
                    { label: 'Last Name', type: 'text', name: 'lastName', required: true }
                ].map(({ label, type, name, required }) => (
                    <InputField
                        key={name}
                        label={label}
                        type={type}
                        value={formData[name]}
                        onChange={handleChange}
                        required={required}
                    />
                ))}
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
*/