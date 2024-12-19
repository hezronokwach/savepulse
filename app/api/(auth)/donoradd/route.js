import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import DonorBlood from '../../../lib/models/donorblood';

export async function POST(request) {
  try {
    await connectDB();

    const { userID, status, satelliteID, sourceType } = await request.json();
    console.log("Request URL:", request.url);
    console.log("satelliteID:", satelliteID);
    console.log("userID:", userID);
    console.log("status:", status);
    //console.log("request:", request.json());
    // Create a new DonorBlood instance
    const newDonorBlood = new DonorBlood({
      userID,
      status,
      satelliteID,
      sourceType,
    });

    await newDonorBlood.save();

    return NextResponse.json(
      { message: "Donation recorded successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error('Donor blood registration error:', error);
    return NextResponse.json(
      { message: "Error recording donation" },
      { status: 500 }
    );
  }
}