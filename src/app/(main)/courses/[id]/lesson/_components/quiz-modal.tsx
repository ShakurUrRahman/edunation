"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	ArrowLeft,
	ArrowRight,
	HelpCircle,
	Info,
	Loader2,
	CheckCircle2,
	XCircle,
	Trophy,
	RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addQuizAssessment } from "@/app/actions/quiz";

function QuizModal({ courseId, quizSetId, quizzes, open, setOpen, isTaken }) {
	const router = useRouter();
	const [quizIndex, setQuizIndex] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false); // ← new

	const totalQuizzes = quizzes?.length || 0;
	const lastQuizIndex = totalQuizzes - 1;
	const currentQuiz = quizzes[quizIndex];

	// ── Score calculation ────────────────────────────────────────────────────
	const getScore = () => {
		let correct = 0;
		quizzes.forEach((quiz) => {
			const answer = answers.find((a) => a.quizId === quiz.id);
			const selectedLabel = answer?.options[0]?.option;
			const correctOption = quiz.options.find((o) => o.isTrue);
			if (selectedLabel === correctOption?.label) correct++;
		});
		return correct;
	};

	const isAnswerCorrect = (quiz) => {
		const answer = answers.find((a) => a.quizId === quiz.id);
		const selectedLabel = answer?.options[0]?.option;
		const correctOption = quiz.options.find((o) => o.isTrue);
		return selectedLabel === correctOption?.label;
	};

	const getOptionState = (quiz, optionLabel) => {
		const answer = answers.find((a) => a.quizId === quiz.id);
		const selected = answer?.options[0]?.option === optionLabel;
		const isCorrect = quiz.options.find(
			(o) => o.label === optionLabel,
		)?.isTrue;
		if (!submitted) return "default";
		if (isCorrect) return "correct";
		if (selected && !isCorrect) return "wrong";
		return "default";
	};

	const quizChangeHandler = (type) => {
		if (type === "next" && quizIndex < lastQuizIndex)
			setQuizIndex((p) => p + 1);
		else if (type === "prev" && quizIndex > 0) setQuizIndex((p) => p - 1);
	};

	const updateAnswer = (event, quizId, optionLabel) => {
		if (submitted) return;
		if (!event.target.checked) return;
		setAnswers((prev) => [
			...prev.filter((a) => a.quizId !== quizId),
			{ quizId, options: [{ option: optionLabel }] },
		]);
	};

	const submitQuiz = async () => {
		if (answers.length < totalQuizzes) {
			toast.error("Please answer all questions before submitting.");
			return;
		}
		setIsSubmitting(true);
		try {
			await addQuizAssessment(courseId, quizSetId, answers);
			setSubmitted(true); // ← show results
			router.refresh();
			toast.success("Quiz submitted!");
		} catch {
			toast.error("Problem submitting the quiz");
		} finally {
			setIsSubmitting(false);
		}
	};

	const isSelected = (optionLabel) => {
		const found = answers.find((a) => a.quizId === currentQuiz.id);
		return found?.options[0]?.option === optionLabel;
	};

	const score = submitted ? getScore() : 0;
	const pct = submitted ? Math.round((score / totalQuizzes) * 100) : 0;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="w-full max-w-[95vw] md:max-w-[700px] p-0 overflow-hidden rounded-2xl h-[100dvh] md:h-auto md:max-h-[90vh] flex flex-col">
				{/* ── Score Summary (shown after submit) ──────────────────────── */}
				{submitted && (
					<div
						className={`shrink-0 px-6 py-4 border-b flex items-center justify-between gap-4
            ${pct >= 70 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}
					>
						<div className="flex items-center gap-3">
							<div
								className={`p-2 rounded-full ${pct >= 70 ? "bg-green-100" : "bg-red-100"}`}
							>
								<Trophy
									className={`w-5 h-5 ${pct >= 70 ? "text-green-600" : "text-red-500"}`}
								/>
							</div>
							<div>
								<p
									className={`text-sm font-bold ${pct >= 70 ? "text-green-700" : "text-red-600"}`}
								>
									{pct >= 70
										? "Great job!"
										: "Keep practicing!"}
								</p>
								<p className="text-xs text-gray-500">
									{score} of {totalQuizzes} correct — {pct}%
								</p>
							</div>
						</div>
						{/* Mini progress bar */}
						<div className="flex-1 max-w-[120px] h-2 bg-gray-200 rounded-full overflow-hidden">
							<div
								className={`h-full rounded-full transition-all duration-700 ${pct >= 70 ? "bg-green-500" : "bg-red-400"}`}
								style={{ width: `${pct}%` }}
							/>
						</div>
						<span
							className={`text-lg font-black ${pct >= 70 ? "text-green-600" : "text-red-500"}`}
						>
							{pct}%
						</span>
					</div>
				)}

				{/* Header */}
				<DialogHeader className="p-4 md:p-6 pb-0 shrink-0">
					<div className="flex items-center justify-between mb-2">
						<DialogTitle className="text-base md:text-xl font-bold flex items-center gap-2">
							{submitted &&
								(isAnswerCorrect(currentQuiz) ? (
									<CheckCircle2 className="w-5 h-5 text-green-500" />
								) : (
									<XCircle className="w-5 h-5 text-red-400" />
								))}
							Quiz Assessment
						</DialogTitle>
						<Badge
							variant="outline"
							className="text-primary border-primary/20 mr-5"
						>
							{quizIndex + 1} of {totalQuizzes}
						</Badge>
					</div>
					<div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
						<div
							className="bg-primary h-full transition-all duration-300"
							style={{
								width: `${((quizIndex + 1) / totalQuizzes) * 100}%`,
							}}
						/>
					</div>
				</DialogHeader>

				{/* Body */}
				<div className="flex-1 overflow-y-auto p-4 md:p-6">
					<div className="space-y-5">
						<div>
							<div className="flex gap-3 items-start">
								<HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
								<h3 className="text-base md:text-xl font-semibold leading-tight">
									{currentQuiz?.title}
								</h3>
							</div>
							<div className="flex items-center gap-1.5 text-muted-foreground mt-2 text-xs uppercase tracking-wider font-medium">
								<Info className="w-3.5 h-3.5" />
								No negative marking for this quiz
							</div>
						</div>

						{/* Options */}
						<div className="grid grid-cols-1 gap-2.5">
							{currentQuiz?.options.map((option) => {
								const state = getOptionState(
									currentQuiz,
									option.label,
								);
								return (
									<div
										key={option.label}
										className="relative"
									>
										<input
											className="peer absolute opacity-0"
											type="radio"
											name={`quiz-${currentQuiz.id}`}
											id={`opt-${option.label}`}
											checked={isSelected(option.label)}
											onChange={(e) =>
												updateAnswer(
													e,
													currentQuiz.id,
													option.label,
												)
											}
											disabled={submitted}
										/>
										<Label
											htmlFor={`opt-${option.label}`}
											className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border-2 font-medium text-sm md:text-base transition-all
                        ${submitted ? "cursor-default" : "cursor-pointer hover:bg-accent/50"}
                        ${state === "correct" ? "border-green-400 bg-green-50 text-green-700" : ""}
                        ${state === "wrong" ? "border-red-400 bg-red-50 text-red-600" : ""}
                        ${state === "default" ? "border-muted bg-card peer-checked:border-primary peer-checked:bg-primary/5" : ""}
                      `}
										>
											<div
												className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 shrink-0 flex items-center justify-center
                        ${state === "correct" ? "border-green-500" : state === "wrong" ? "border-red-400" : isSelected(option.label) ? "border-primary" : "border-muted-foreground"}`}
											>
												{state === "correct" && (
													<CheckCircle2 className="w-3 h-3 text-green-500" />
												)}
												{state === "wrong" && (
													<XCircle className="w-3 h-3 text-red-400" />
												)}
												{state === "default" &&
													isSelected(
														option.label,
													) && (
														<div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary" />
													)}
											</div>
											{option.label}
											{/* Show correct answer label after submit */}
											{submitted && option.isTrue && (
												<span className="ml-auto text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
													Correct
												</span>
											)}
										</Label>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Footer */}
				<DialogFooter className="p-4 md:p-6 bg-secondary/30 border-t shrink-0 flex flex-col-reverse sm:flex-row gap-2 sm:justify-between items-center">
					<div className="flex w-full sm:w-auto gap-2">
						<Button
							variant="outline"
							size="sm"
							className="flex-1 sm:flex-none rounded-xl"
							disabled={quizIndex === 0}
							onClick={() => quizChangeHandler("prev")}
						>
							<ArrowLeft className="w-4 h-4 mr-1" /> Prev
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex-1 sm:flex-none rounded-xl"
							disabled={quizIndex === lastQuizIndex}
							onClick={() => quizChangeHandler("next")}
						>
							Next <ArrowRight className="w-4 h-4 ml-1" />
						</Button>
					</div>

					{submitted ? (
						<Button
							size="sm"
							className="w-full sm:w-auto rounded-xl bg-primary hover:bg-primary/90 text-white min-w-[130px]"
							onClick={() => setOpen(false)}
						>
							Close
						</Button>
					) : (
						<Button
							size="sm"
							className="w-full sm:w-auto rounded-xl bg-green-600 hover:bg-green-700 text-white min-w-[130px]"
							onClick={submitQuiz}
							disabled={isTaken || isSubmitting}
						>
							{isSubmitting ? (
								<Loader2 className="w-4 h-4 animate-spin mr-2" />
							) : isTaken ? (
								<CheckCircle2 className="w-4 h-4 mr-2" />
							) : null}
							{isTaken ? "Submitted" : "Submit Quiz"}
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default QuizModal;
