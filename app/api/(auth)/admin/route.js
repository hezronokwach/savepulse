import { NextResponse } from "next/server";
import connectDB from '../../../lib/db';
import Admin from '../../../lib/models/admin';
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        await connectDB();

        // Define admin users
        const adminUsers = [
            {
                email: "bantu@gmail.com",
                password: await bcrypt.hash("0909", 10)
            },
            {
                email: "hezron@gmail.com",
                password: await bcrypt.hash("0101", 10)
            }
        ];

        // Clear existing admins
        await Admin.deleteMany({});

        // Insert new admins
        const admins = await Admin.create(adminUsers);

        return NextResponse.json(
            { message: "Admin users created successfully", count: admins.length },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error creating admin users:', error);
        return NextResponse.json(
            { message: "Error creating admin users" },
            { status: 500 }
        );
    }
}