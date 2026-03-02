// app/api/upload-profile/route.ts

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { updateProfilePicture } from "@/app/actions/account"; // ← your actions file

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("files") as File | null;
		const email = formData.get("email") as string | null; // ← same identifier as your actions

		if (!file) return new NextResponse("No file provided", { status: 400 });
		if (!email)
			return new NextResponse("No email provided", { status: 400 });

		// Convert to base64 — same as your course upload route
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

		// Upload to Cloudinary into "profile-pictures" folder
		const uploadResult = await cloudinary.uploader.upload(base64, {
			folder: "profile-pictures",
			transformation: [
				{ width: 400, height: 400, crop: "fill", gravity: "face" },
				{ quality: "auto", fetch_format: "auto" },
			],
		});

		// Save URL using your existing action pattern (email as identifier)
		await updateProfilePicture(email, uploadResult.secure_url);

		return new NextResponse(
			JSON.stringify({ url: uploadResult.secure_url }),
			{ status: 200 },
		);
	} catch (err: any) {
		return new NextResponse(err.message, { status: 500 });
	}
}
