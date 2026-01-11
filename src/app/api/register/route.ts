import { User } from "@/model/user.model";
import { dbConnect } from "@/service/mongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface RegisterPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	userRole: string;
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	try {
		const body = (await request.json()) as RegisterPayload;
		const { firstName, lastName, email, password, userRole } = body;

		// 🔒 Basic validation
		if (!firstName || !lastName || !email || !password || !userRole) {
			return NextResponse.json(
				{ message: "All fields are required" },
				{ status: 400 }
			);
		}

		await dbConnect();

		// ✅ CHECK: User already exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists with this email" },
				{ status: 409 } // Conflict
			);
		}

		// 🔐 Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			role: userRole,
		});

		return NextResponse.json(
			{ message: "User has been created successfully" },
			{ status: 201 }
		);
	} catch (error) {
		console.error("User registration error:", error);

		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
};
