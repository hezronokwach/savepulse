
// app/api/donorPage/[userID]/route.js
import { NextResponse } from "next/server";
import connectDB from '../../../../lib/db';
import User from '../../../../lib/models/users';
import DonorBlood from '../../../../lib/models/donorblood';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const {userID} = await params;

        // Fetch user data
        const user = await User.findById(userID).select('-password');
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Get donation count and latest blood type
        const donations = await DonorBlood.find({ userID: userID });
        const donationCount = donations.length;
        const latestBloodType = donations.length > 0 ? donations[0].bloodType : 'N/A';

        return NextResponse.json({
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                bloodType: latestBloodType,
            },
            donationCount
        });

    } catch (error) {
        console.error('Error fetching donor data:', error);
        return NextResponse.json(
            { message: "Error fetching donor data" },
            { status: 500 }
        );
    }
}