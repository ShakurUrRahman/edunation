"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Trophy, BookCheck } from "lucide-react"; // Themed icons
import { useState } from "react";
import QuizModal from "./quiz-modal";

export function Quiz({ courseId, quizSet, isTaken }) {
	const [open, setOpen] = useState(false);

	const quizzes = quizSet?.quizIds ?? [];
	const totalMarks = quizzes.length * 5;

	return (
		<>
			{/* Removed max-width fixed constraint to allow responsiveness in a grid */}
			<div className="w-full bg-card border border-primary/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
				{/* Header Section with Gradient */}
				<div className="relative h-32 flex items-center justify-center bg-gradient-to-br from-primary via-indigo-600 to-violet-700 px-6 text-center">
					{/* Decorative background icon */}
					<HelpCircle className="absolute right-[-10%] bottom-[-10%] w-24 h-24 text-white/10 -rotate-12" />

					<span className="relative z-10 text-lg font-bold text-white leading-tight">
						{quizSet?.title}
					</span>
				</div>

				{/* Content Section */}
				<div className="p-5 flex flex-col flex-1">
					<div className="flex items-center justify-between gap-4 text-sm mb-3 font-bold text-foreground">
						<div className="flex items-center gap-2">
							<Trophy className="w-4 h-4 text-amber-500" />
							<span>Total Marks</span>
						</div>
						<span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
							{totalMarks}
						</span>
					</div>

					<p className="mb-6 text-muted-foreground text-sm leading-relaxed">
						Taking this quiz is highly recommended to validate your
						learning progress.
					</p>

					{/* Spacer to push button to bottom if in a grid */}
					<div className="mt-auto">
						<Button
							className={`w-full font-semibold transition-all active:scale-95 ${
								isTaken
									? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
									: "shadow-sm"
							}`}
							variant={isTaken ? "outline" : "default"}
							onClick={() => setOpen(true)}
						>
							{isTaken ? (
								<div className="flex items-center gap-2">
									<BookCheck className="w-4 h-4" />
									Quiz Taken
								</div>
							) : (
								"Take Quiz"
							)}
						</Button>
					</div>
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
