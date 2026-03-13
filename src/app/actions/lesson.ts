"use server";

import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/lessons";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function createLesson(data) {
	await dbConnect();
	try {
		const title = data.get("title");
		const slug = data.get("slug");
		const moduleId = data.get("moduleId");
		const order = data.get("order");

		console.log(title, slug, moduleId, order);

		const createdLesson = await create({ title, slug, order });
		console.log(createdLesson);

		const module = await Module.findById(moduleId);
		module.lessonIds.push(createdLesson._id);
		module.save();

		return createdLesson;
	} catch (err) {
		throw new Error(err);
	}
}

export async function reOrderLesson(data) {
	await dbConnect();
	try {
		await Promise.all(
			data.map(async (element) => {
				await Lesson.findByIdAndUpdate(element.id, {
					order: element.position,
				});
			}),
		);
	} catch (err) {
		throw new Error(err);
	}
}

export async function updateLesson(lessonId, data) {
	await dbConnect();
	try {
		await Lesson.findByIdAndUpdate(lessonId, data);
		revalidatePath("/dashboard", "layout");
	} catch (err) {
		throw new Error(err);
	}
}

export async function changeLessonPublishState(lessonId) {
	await dbConnect();
	const lesson = await Lesson.findById(lessonId);
	try {
		const res = await Lesson.findByIdAndUpdate(
			lessonId,
			{ active: !lesson.active },
			{ lean: true },
		);
		revalidatePath("/dashboard", "layout");
		return res.active;
	} catch (err) {
		throw new Error(err);
	}
}

export async function deleteLesson(lessonId, moduleId) {
	await dbConnect();
	try {
		const module = await Module.findById(moduleId);
		module.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));
		await Lesson.findByIdAndDelete(lessonId);
		module.save();
	} catch (err) {
		throw new Error(err);
	}
}
