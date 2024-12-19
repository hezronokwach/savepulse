"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('useEffect triggered'); // Debugging log

        const verifyAdmin = async () => {
            const adminId = typeof window !== 'undefined' ? sessionStorage.getItem('adminId') : null;
            console.log('Admin ID:', adminId); // Debugging log

            if (!adminId) {
                setIsLoading(false);
                router.push('/admin');
                return;
            }

            try {
                const response = await fetch('/api/admin/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ adminId }),
                });

                const data = await response.json();
                console.log('Verification response:', data); // Debugging log

                if (!response.ok) {
                    sessionStorage.removeItem('adminId');
                    router.push('/admin');
                    return;
                }

            } catch (error) {
                console.error('Error verifying admin:', error);
                sessionStorage.removeItem('adminId');
                router.push('/admin');
            } finally {
                setIsLoading(false);
            }
        };

        verifyAdmin();
    }, [router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const adminId = typeof window !== 'undefined' ? sessionStorage.getItem('adminId') : null;
    if (!adminId) {
        return null; // This will not be reached due to the redirect in useEffect
    }

    // Redirect authorized users to /admin/dashboard if they are on the /admin path
    if (router.asPath === '/admin' && adminId) {
        router.push('/admin/dashboard');
        return null;
    }

    // Render children if the user is authorized and not on the login page
    return children;
}