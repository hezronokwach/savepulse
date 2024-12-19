import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Satellite from '../../../lib/models/satelitteStations';


export async function POST(request) {
    try {
        await connectDB();
        
        const { satelliteName, satelliteLocation, contactPerson, contactEmail, contactPassword } = await request.json();

        // Check for existing satellite
        const existingSatellite = await Satellite.findOne({ 
            $or: [
                { satelliteName: satelliteName },
                { contactEmail: contactEmail }
            ]
        });

        if (existingSatellite) {
            return NextResponse.json(
                { message: "Satellite or email already exists" },
                { status: 400 }
            );
        }

        const newSatellite = new Satellite({
            satelliteName,
            satelliteLocation,
            contactPerson,
            contactEmail,
            contactPassword
        });

        await newSatellite.save();

        return NextResponse.json(
            { message: "Satellite station registered successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error('Satellite registration error:', error);
        return NextResponse.json(
            { message: "Error registering satellite station" },
            { status: 500 }
        );
    }
}