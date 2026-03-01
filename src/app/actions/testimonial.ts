// actions/testimonial.actions.ts
"use server";

import { Testimonial } from "@/model/testimonial-model";
import { Course } from "@/model/course-model";
import { getLoggedInUser } from "@/lib/loggedIn-user";
import { revalidatePath } from "next/cache";
import { dbConnect } from "@/service/mongo";

export async function createTestimonial({
	courseId,
	rating,
	content,
}: {
	courseId: string;
	rating: number;
	content: string;
}) {
	try {
		await dbConnect();
		const loggedInUser = await getLoggedInUser();
		if (!loggedInUser) throw new Error("Not authenticated");

		// Prevent duplicate reviews
		const existing = await Testimonial.findOne({
			courseId,
			user: loggedInUser.id,
		});
		if (existing) throw new Error("You have already reviewed this course");

		// 1. Save testimonial doc
		const testimonial = await Testimonial.create({
			content,
			rating,
			user: loggedInUser.id,
			courseId,
		});

		// 2. Push ObjectId into course.testimonials[]
		await Course.findByIdAndUpdate(courseId, {
			$push: { testimonials: testimonial._id },
		});

		// 3. Revalidate the course page so the new review appears immediately
		revalidatePath(`/courses/${courseId}`);

		return { success: true };
	} catch (error: any) {
		return {
			success: false,
			error: error.message ?? "Something went wrong",
		};
	}
}

export async function hasUserReviewed(courseId: string): Promise<boolean> {
	try {
		await dbConnect();
		const loggedInUser = await getLoggedInUser();
		if (!loggedInUser) return false;

		const existing = await Testimonial.findOne({
			courseId,
			user: loggedInUser.id,
		}).lean();

		return !!existing;
	} catch {
		return false;
	}
}
