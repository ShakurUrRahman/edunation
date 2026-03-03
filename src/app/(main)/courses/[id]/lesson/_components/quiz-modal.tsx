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

	const totalQuizzes = quizzes?.length || 0;
	const lastQuizIndex = totalQuizzes - 1;
	const currentQuiz = quizzes[quizIndex];

	const quizChangeHandler = (type) => {
		if (type === "next" && quizIndex < lastQuizIndex) {
			setQuizIndex((prev) => prev + 1);
		} else if (type === "prev" && quizIndex > 0) {
			setQuizIndex((prev) => prev - 1);
		}
	};

	const updateAnswer = (event, quizId, optionLabel) => {
		const checked = event.target.checked;
		if (!checked) return;

		const newAnswer = {
			quizId: quizId,
			options: [{ option: optionLabel }],
		};

		setAnswers((prev) => {
			const filtered = prev.filter((a) => a.quizId !== quizId);
			return [...filtered, newAnswer];
		});
	};

	const submitQuiz = async () => {
		if (answers.length < totalQuizzes) {
			toast.error("Please answer all questions before submitting.");
			// Optional: return;
		}

		setIsSubmitting(true);
		try {
			await addQuizAssessment(courseId, quizSetId, answers);
			setOpen(false);
			router.refresh();
			toast.success(`Thanks for submitting the quiz.`);
		} catch (error) {
			toast.error("Problem in submitting the quiz");
		} finally {
			setIsSubmitting(false);
		}
	};

	// Check if current option is selected
	const isSelected = (optionLabel) => {
		const found = answers.find((a) => a.quizId === currentQuiz.id);
		return found?.options[0]?.option === optionLabel;
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[95vw] md:max-w-[700px] p-0 overflow-hidden rounded-2xl">
				<DialogHeader className="p-6 pb-0">
					<div className="flex items-center justify-between mb-2">
						<DialogTitle className="text-xl font-bold">
							Quiz Assessment
						</DialogTitle>
						<Badge
							variant="outline"
							className="text-primary border-primary/20"
						>
							{quizIndex + 1} of {totalQuizzes}
						</Badge>
					</div>
					{/* Progress bar */}
					<div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
						<div
							className="bg-primary h-full transition-all duration-300"
							style={{
								width: `${((quizIndex + 1) / totalQuizzes) * 100}%`,
							}}
						/>
					</div>
				</DialogHeader>

				<div className="p-6">
					<div className="space-y-6">
						<div>
							<div className="flex gap-3 items-start">
								<HelpCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
								<h3 className="text-lg md:text-xl font-semibold leading-tight">
									{currentQuiz?.title}
								</h3>
							</div>
							<div className="flex items-center gap-1.5 text-muted-foreground mt-3 text-xs uppercase tracking-wider font-medium">
								<Info className="w-3.5 h-3.5" />
								No negative marking for this quiz
							</div>
						</div>

						{/* Options Grid */}
						<div className="grid grid-cols-1 gap-3">
							{currentQuiz?.options.map((option) => (
								<div key={option.label} className="relative">
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
									/>
									<Label
										htmlFor={`opt-${option.label}`}
										className="flex items-center gap-3 p-4 rounded-xl border-2 border-muted bg-card hover:bg-accent/50 cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/5 font-medium"
									>
										<div
											className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${isSelected(option.label) ? "border-primary" : "border-muted-foreground"}`}
										>
											{isSelected(option.label) && (
												<div className="w-2.5 h-2.5 rounded-full bg-primary" />
											)}
										</div>
										{option.label}
									</Label>
								</div>
							))}
						</div>
					</div>
				</div>

				<DialogFooter className="p-6 bg-secondary/30 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between items-center">
					<div className="flex w-full sm:w-auto gap-2">
						<Button
							variant="outline"
							className="flex-1 sm:flex-none rounded-xl"
							disabled={quizIndex === 0}
							onClick={() => quizChangeHandler("prev")}
						>
							<ArrowLeft className="w-4 h-4 mr-2" /> Prev
						</Button>
						<Button
							variant="outline"
							className="flex-1 sm:flex-none rounded-xl"
							disabled={quizIndex === lastQuizIndex}
							onClick={() => quizChangeHandler("next")}
						>
							Next <ArrowRight className="w-4 h-4 ml-2" />
						</Button>
					</div>

					<Button
						className="w-full sm:w-auto rounded-xl bg-green-600 hover:bg-green-700 text-white min-w-[140px]"
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
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default QuizModal;
