import { Lesson } from "@/model/lesson.model";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { dbConnect } from "@/service/mongo";

export async function getLesson(lessonId) {
	await dbConnect();
	const lesson = await Lesson.findById(lessonId).lean();
	return replaceMongoIdInObject(lesson);
}

export async function create(lessonData) {
	await dbConnect();
	try {
		const lesson = await Lesson.create(lessonData);
		return JSON.parse(JSON.stringify(lesson));
	} catch (err) {
		throw new Error(err);
	}
}

export async function getLessonBySlug(slug) {
	await dbConnect();
	try {
		const lesson = await Lesson.findOne({ slug: slug }).lean();
		return replaceMongoIdInObject(lesson);
	} catch (err) {
		throw new Error(err);
	}
}
