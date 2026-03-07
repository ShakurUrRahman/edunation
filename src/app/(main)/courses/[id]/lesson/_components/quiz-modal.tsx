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
			<DialogContent
				className="
    w-full max-w-[95vw] md:max-w-[700px] 
    p-0 overflow-hidden rounded-2xl
    h-[100dvh] md:h-auto md:max-h-[90vh]
    flex flex-col
  "
			>
				{/* Header — fixed */}
				<DialogHeader className="p-4 md:p-6 pb-0 shrink-0">
					<div className="flex items-center justify-between mb-2">
						<DialogTitle className="text-base md:text-xl font-bold">
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

				{/* Scrollable body */}
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

						<div className="grid grid-cols-1 gap-2.5">
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
										className="flex items-center gap-3 p-3 md:p-4 rounded-xl border-2 border-muted bg-card hover:bg-accent/50 cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/5 font-medium text-sm md:text-base"
									>
										<div
											className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${isSelected(option.label) ? "border-primary" : "border-muted-foreground"}`}
										>
											{isSelected(option.label) && (
												<div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary" />
											)}
										</div>
										{option.label}
									</Label>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Footer — fixed to bottom */}
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
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default QuizModal;
