import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Admin from "../../../../lib/models/admin";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        await connectDB();

        // Check for existing admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return NextResponse.json(
                { message: "Invalid admin credentials" },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { message: "Invalid admin credentials" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { 
                message: "Admin login successful",
                adminId: admin._id 
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Error during admin login: " + error.message },
            { status: 500 }
        );
    }
}