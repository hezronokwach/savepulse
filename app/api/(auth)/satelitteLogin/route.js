import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Satellite from '../../../lib/models/satelitteStations';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        await connectDB();

        // Find the satellite using the email
        const satellite = await Satellite.findOne({ contactEmail: email });

        if (!satellite) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify the password
        const isValidPassword = await bcrypt.compare(password, satellite.contactPassword);

        if (!isValidPassword) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const redirectUrl = `satelitteDashboard/${satellite._id}`;
        return NextResponse.json(
            { message: 'Login successful', redirectUrl },
            { status: 200 }
        );

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}