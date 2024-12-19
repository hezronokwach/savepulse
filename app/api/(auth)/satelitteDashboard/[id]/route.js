import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Satellite from '../../../../lib/models/satelitteStations';

export async function GET(request, { params }) {
    try {
        //console.log("Satellite ID:", params.id);
        await connectDB();

        const { id } = await params; // Extract the satellite ID from the URL parameters

        // Find the satellite using the ID
        const satellite = await Satellite.findById(id);

        if (!satellite) {
            return NextResponse.json(
                { message: 'Satellite not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { satellite },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching satellite data:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}