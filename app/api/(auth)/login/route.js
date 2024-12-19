import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import User from "../../../lib/models/users";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { email, password} = await request.json();

        await connectDB();

        // Check for existing user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "Wrong email or password" },
                { status: 400 }
            );
        }

        // Hash password before saving
        const unhashedPassword = await bcrypt.compare(password, user.password);
        if (!unhashedPassword) {
            return NextResponse.json(
                { message: "Wrong email or password" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Login successfully" },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Error creating user: " + error.message },
            { status: 500 }
        );
    }
}