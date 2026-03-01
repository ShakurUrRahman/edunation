"use server";

import { getSlug } from "@/lib/convertData";
import { createQuiz } from "@/queries/quizzes";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { getQuizSetById } from "@/queries/quizzes";
import mongoose from "mongoose";

import { getLoggedInUser } from "@/lib/loggedIn-user";
import { createAssessmentReport } from "@/queries/reports";
import { Assessment } from "@/model/assesment.model";
import { Quizset } from "@/model/quizsets.model";

export async function updateQuizSet(quizset, dataToUpdate) {
	try {
		await Quizset.findByIdAndUpdate(quizset, dataToUpdate);
	} catch (e) {
		throw new Error(e);
	}
}

export async function addQuizToQuizSet(quizSetId, quizData) {
	try {
		console.log(quizSetId, quizData);

		const transformedQuizData = {};

		transformedQuizData["title"] = quizData["title"];
		transformedQuizData["description"] = quizData["description"];
		transformedQuizData["slug"] = getSlug(quizData["title"]);
		transformedQuizData["options"] = [
			{
				text: quizData.optionA.label,
				is_correct: quizData.optionA.isTrue,
			},
			{
				text: quizData.optionB.label,
				is_correct: quizData.optionB.isTrue,
			},
			{
				text: quizData.optionC.label,
				is_correct: quizData.optionC.isTrue,
			},
			{
				text: quizData.optionD.label,
				is_correct: quizData.optionD.isTrue,
			},
		];

		console.log(transformedQuizData);
		const createdQuizId = await createQuiz(transformedQuizData);
		console.log(createdQuizId);

		const quizSet = await Quizset.findById(quizSetId);
		quizSet.quizIds.push(createdQuizId);
		quizSet.save();
	} catch (e) {
		throw new Error(e);
	}
}

export async function changeQuizSetPublishState(quizSetId) {
	const quizSet = await Quizset.findById(quizSetId);
	try {
		const res = await Quizset.findByIdAndUpdate(
			quizSetId,
			{ active: !quizSet.active },
			{ lean: true },
		);
		return res.active;
	} catch (err) {
		throw new Error(err);
	}
}

export async function deleteQuizSet(quizSetId) {
	try {
		await Quizset.findByIdAndDelete(quizSetId);
	} catch (err) {
		throw new Error(err);
	}
}

export async function doCreateQuizSet(data) {
	try {
		data["slug"] = getSlug(data.title);
		const createdQuizSet = await Quizset.create(data);
		return createdQuizSet?._id.toString();
	} catch (e) {
		throw new Error(e);
	}
}

export async function addQuizAssessment(courseId, quizSetId, answers) {
	try {
		console.log(quizSetId, answers);
		const quizSet = await getQuizSetById(quizSetId);
		const quizzes = replaceMongoIdInArray(quizSet.quizIds);

		const assessmentRecord = quizzes.map((quiz) => {
			const obj = {};
			obj.quizId = new mongoose.Types.ObjectId(quiz.id);
			const found = answers.find((a) => a.quizId === quiz.id);
			if (found) {
				obj.attmpted = true;
			} else {
				obj.attmpted = false;
			}
			const mergedOptions = quiz.options.map((o) => {
				return {
					option: o.text,
					isCorrect: o.is_correct,
					isSelected: (function () {
						const found = answers.find(
							(a) => a.options[0].option === o.text,
						);
						if (found) {
							return true;
						} else {
							return false;
						}
					})(),
				};
			});
			obj["options"] = mergedOptions;
			return obj;
		});

		const assessmentEntry = {};
		assessmentEntry.assessments = assessmentRecord;
		assessmentEntry.otherMarks = 0;

		const assessment = await Assessment.create(assessmentEntry);
		const loggedInUser = await getLoggedInUser();

		await createAssessmentReport({
			courseId: courseId,
			userId: loggedInUser.id,
			quizAssessment: assessment?._id,
		});
	} catch (err) {
		throw new Error(err);
	}
}
