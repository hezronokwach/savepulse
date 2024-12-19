import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Admin from "../../../../lib/models/admin";

export async function POST(request) {
    try {
        const { adminId } = await request.json();

        await connectDB();

        const admin = await Admin.findById(adminId).select('-password');
        if (!admin) {
            return NextResponse.json(
                { message: "Unauthorized access" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { 
                message: "Admin verified",
                admin: admin 
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}