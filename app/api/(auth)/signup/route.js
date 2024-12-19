import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import User from "../../../lib/models/users";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { email, password, phoneNumber, firstName, lastName } = await request.json();

        await connectDB();

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "Email already registered" },
                { status: 400 }
            );
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            phoneNumber,
            firstName,
            lastName
        });

        await newUser.save();

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Error creating user: " + error.message },
            { status: 500 }
        );
    }
}