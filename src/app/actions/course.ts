"use server";

import { create } from "@/queries/courses";

import { Course } from "@/model/course-model";
import { getLoggedInUser } from "@/lib/loggedIn-user";

export async function createCourse(data) {
	try {
		const loggedInUser = await getLoggedInUser();
		data["instructor"] = loggedInUser?.id;
		const course = await create(data);
		return course;
	} catch (e) {
		throw new Error(e);
	}
}

export async function updateCourse(courseId, dataToUpdate) {
	try {
		await Course.findByIdAndUpdate(courseId, dataToUpdate);
	} catch (e) {
		throw new Error(e);
	}
}
