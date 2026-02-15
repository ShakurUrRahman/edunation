import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { updateCourse } from "@/app/actions/course";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
	try {
		const formData = await request.formData();
		const file = formData.get("files");
		const courseId = formData.get("courseId");

		if (!file) {
			return new NextResponse("No file provided", { status: 400 });
		}

		// Convert file to base64
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

		// Upload to Cloudinary
		const uploadResult = await cloudinary.uploader.upload(base64, {
			folder: "courses",
		});

		// Save the Cloudinary URL to your DB
		await updateCourse(courseId, { thumbnail: uploadResult.secure_url });

		return new NextResponse(
			JSON.stringify({ url: uploadResult.secure_url }),
			{ status: 200 },
		);
	} catch (err) {
		return new NextResponse(err.message, { status: 500 });
	}
}
