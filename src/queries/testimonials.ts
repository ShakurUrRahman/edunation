import { Testimonial } from "@/model/testimonial-model";

import { replaceMongoIdInArray } from "@/lib/convertData";
import { User } from "@/model/user.model";

export async function getAllTestimonials() {
	const testimonials = await Testimonial.find({})
		.populate({ path: "user", model: User })
		.sort({ _id: -1 }) // newest first
		.lean();

	return replaceMongoIdInArray(testimonials);
}

export async function getTestimonialsForCourse(courseId) {
	const testimonials = await Testimonial.find({ courseId: courseId }).lean();
	return replaceMongoIdInArray(testimonials);
}
