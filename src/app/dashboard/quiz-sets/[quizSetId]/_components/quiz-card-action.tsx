"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteQuiz, updateQuiz } from "@/app/actions/quiz";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

function buildInitialForm(quiz: any) {
	const opts = quiz?.options ?? [];
	const toOption = (i: number) => ({
		label: opts[i]?.text ?? opts[i]?.label ?? "",
		isTrue: opts[i]?.is_correct ?? opts[i]?.isTrue ?? false,
	});
	return {
		title: quiz?.title ?? "",
		description: quiz?.description ?? "",
		optionA: toOption(0),
		optionB: toOption(1),
		optionC: toOption(2),
		optionD: toOption(3),
	};
}

const OPTION_KEYS = ["optionA", "optionB", "optionC", "optionD"] as const;

export const QuizCardActions = ({ quiz, quizSetId }) => {
	const [action, setAction] = useState(null);
	const [editOpen, setEditOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState(() => buildInitialForm(quiz));
	const router = useRouter();

	const openEdit = () => {
		setForm(buildInitialForm(quiz)); // re-sync with latest quiz prop
		setEditOpen(true);
	};

	const setOptionField = (
		key: (typeof OPTION_KEYS)[number],
		field: "label" | "isTrue",
		value: any,
	) => setForm((f) => ({ ...f, [key]: { ...f[key], [field]: value } }));

	// ── Main form handler (delete only now) ───────────────────────────────────
	async function handleSubmit(event) {
		event.preventDefault();
		try {
			switch (action) {
				case "delete-quiz": {
					setIsLoading(true);
					await deleteQuiz(quiz.id, quizSetId);
					toast.success("The quiz has been deleted");
					router.refresh();
					break;
				}
				default:
					throw new Error("Invalid action");
			}
		} catch (e: any) {
			toast.error(e.message);
		} finally {
			setIsLoading(false);
		}
	}

	// ── Edit handler ──────────────────────────────────────────────────────────
	async function handleUpdate() {
		if (!form.title.trim()) return toast.error("Title is required");
		setIsLoading(true);
		try {
			await updateQuiz(quiz.id, form);
			toast.success("Quiz updated");
			setEditOpen(false);
			router.refresh();
		} catch (e: any) {
			toast.error(e.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			{/* ── Existing form pattern preserved ────────────────────────── */}
			<form onSubmit={handleSubmit}>
				<Button
					variant="ghost"
					size="sm"
					type="button"
					onClick={openEdit}
				>
					<Pencil className="w-3 mr-1" /> Edit
				</Button>
				<Button
					size="sm"
					className="text-destructive"
					variant="ghost"
					disabled={isLoading}
					onClick={() => setAction("delete-quiz")}
				>
					<Trash className="w-3 mr-1" /> Delete
				</Button>
			</form>

			{/* ── Edit modal ─────────────────────────────────────────────── */}
			<Dialog open={editOpen} onOpenChange={setEditOpen}>
				<DialogContent
					className="max-w-lg max-h-[90vh] overflow-y-auto"
					onInteractOutside={(e) => e.preventDefault()}
				>
					<DialogTitle className="text-base font-bold">
						Edit Quiz
					</DialogTitle>

					<div className="space-y-4 mt-2">
						{/* Title */}
						<div>
							<label className="text-xs font-semibold text-gray-600 mb-1 block">
								Question Title *
							</label>
							<Input
								value={form.title}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										title: e.target.value,
									}))
								}
								placeholder="Enter question..."
								disabled={isLoading}
							/>
						</div>

						{/* Description */}
						<div>
							<label className="text-xs font-semibold text-gray-600 mb-1 block">
								Description
							</label>
							<Input
								value={form.description}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										description: e.target.value,
									}))
								}
								placeholder="Optional description..."
								disabled={isLoading}
							/>
						</div>

						{/* Options */}
						<div>
							<label className="text-xs font-semibold text-gray-600 mb-2 block">
								Options (✓ = correct answer)
							</label>
							<div className="space-y-2">
								{OPTION_KEYS.map((key, i) => (
									<div
										key={key}
										className="flex items-center gap-2"
									>
										<input
											type="checkbox"
											checked={form[key].isTrue}
											onChange={(e) =>
												setOptionField(
													key,
													"isTrue",
													e.target.checked,
												)
											}
											className="w-4 h-4 accent-primary shrink-0"
											disabled={isLoading}
										/>
										<span className="text-xs text-gray-400 w-6 shrink-0">
											{String.fromCharCode(65 + i)}
										</span>
										<Input
											value={form[key].label}
											onChange={(e) =>
												setOptionField(
													key,
													"label",
													e.target.value,
												)
											}
											placeholder={`Option ${String.fromCharCode(65 + i)}...`}
											className="flex-1 h-8 text-sm"
											disabled={isLoading}
										/>
									</div>
								))}
							</div>
						</div>

						{/* Buttons */}
						<div className="flex gap-2 pt-1">
							<Button
								variant="outline"
								className="flex-1"
								onClick={() => setEditOpen(false)}
								disabled={isLoading}
							>
								Cancel
							</Button>
							<Button
								className="flex-1 bg-primary hover:bg-primary/90 text-white"
								onClick={handleUpdate}
								disabled={isLoading}
							>
								{isLoading ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
