import { Testimonial } from "@/model/testimonial-model";

import { replaceMongoIdInArray } from "@/lib/convertData";
import { User } from "@/model/user.model";
import { dbConnect } from "@/service/mongo";

export async function getAllTestimonials() {
	await dbConnect();
	const testimonials = await Testimonial.find({})
		.populate({ path: "user", model: User })
		.sort({ _id: -1 }) // newest first
		.lean();

	return replaceMongoIdInArray(testimonials);
}

export async function getTestimonialsForCourse(courseId) {
	await dbConnect();
	const testimonials = await Testimonial.find({ courseId: courseId }).lean();
	return replaceMongoIdInArray(testimonials);
}
