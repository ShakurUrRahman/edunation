"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";
import { useState } from "react";
import QuizModal from "./quiz-modal";

export function Quiz({ courseId, quizSet, isTaken }) {
	const [open, setOpen] = useState(false);

	const quizzes = quizSet?.quizIds ?? [];

	return (
		<>
			<div className="max-w-[270px] bg-white border border-border rounded-md overflow-hidden">
				<div className="flex h-32 items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 px-6 text-center">
					<span className="text-lg font-semibold text-white">
						{quizSet?.title}
					</span>
				</div>

				<div className="p-4">
					<div className="flex items-center justify-between gap-6 text-sm mb-2 font-medium text-gray-700">
						<span>Total Marks</span>
						{quizzes.length * 5}
					</div>

					<p className="mb-4 text-gray-500 text-sm">
						Taking the quiz is optional but highly recommended.
					</p>

					<Button
						className="w-full"
						variant="outline"
						onClick={() => setOpen(true)}
					>
						{isTaken ? "Quiz Taken" : "Take Quiz"}
					</Button>
				</div>
			</div>

			<QuizModal
				courseId={courseId}
				quizSetId={quizSet?.id}
				quizzes={quizzes}
				open={open}
				setOpen={setOpen}
				isTaken={isTaken}
			/>
		</>
	);
}
