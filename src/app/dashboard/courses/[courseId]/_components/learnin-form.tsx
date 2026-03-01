// dashboard/_components/learning-form.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil, Plus, X, GripVertical, CheckCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateCourse } from "@/app/actions/course";

// ── Schema ─────────────────────────────────────────────────────────────────
// Each item must be 2–3 words (min 3 chars, essentially a short phrase)
const itemSchema = z
	.string()
	.min(3, "Must be at least 2–3 words")
	.refine((val) => val.trim().split(/\s+/).length >= 2, {
		message: "Enter at least 2 words (e.g. 'Build REST APIs')",
	});

const formSchema = z.object({
	item: itemSchema,
});

type FormValues = z.infer<typeof formSchema>;

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
	initialData: { learning?: string[] };
	courseId: string;
}

// ── Component ──────────────────────────────────────────────────────────────
export const LearningForm = ({ initialData, courseId }: Props) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [items, setItems] = useState<string[]>(initialData?.learning ?? []);
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { item: "" },
	});

	// ── Add one item ──────────────────────────────────────────────────────────
	const handleAdd = (values: FormValues) => {
		const trimmed = values.item.trim();
		if (items.includes(trimmed)) {
			toast.error("This item already exists");
			return;
		}
		const next = [...items, trimmed];
		setItems(next);
		form.reset();
		saveToServer(next);
	};

	// ── Remove one item ───────────────────────────────────────────────────────
	const handleRemove = (index: number) => {
		const next = items.filter((_, i) => i !== index);
		setItems(next);
		saveToServer(next);
	};

	// ── Persist to DB ─────────────────────────────────────────────────────────
	const saveToServer = (list: string[]) => {
		startTransition(async () => {
			try {
				await updateCourse(courseId, { learning: list });
				toast.success("Learning outcomes updated");
				router.refresh();
			} catch {
				toast.error("Something went wrong");
			}
		});
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				<span>What students will learn</span>
				<Button
					onClick={() => setIsEditing((v) => !v)}
					variant="ghost"
					size="sm"
				>
					{isEditing ? (
						<>
							<X className="h-4 w-4 mr-1" /> Done
						</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-1" /> Edit
						</>
					)}
				</Button>
			</div>

			{/* Display list */}
			{items.length > 0 ? (
				<ul className="mt-3 space-y-1.5">
					{items.map((item, i) => (
						<li
							key={i}
							className="flex items-center justify-between gap-2 bg-white rounded-md px-3 py-2 text-sm"
						>
							<div className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-primary shrink-0" />
								<span>{item}</span>
							</div>
							{isEditing && (
								<button
									type="button"
									onClick={() => handleRemove(i)}
									disabled={isPending}
									className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer border-none bg-transparent p-0"
								>
									<X className="h-4 w-4" />
								</button>
							)}
						</li>
					))}
				</ul>
			) : (
				<p className="text-sm text-slate-500 italic mt-2">
					No learning outcomes added yet
				</p>
			)}

			{/* Add new item input */}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleAdd)}
						className="mt-4 flex items-start gap-2"
					>
						<FormField
							control={form.control}
							name="item"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="e.g. Build REST APIs with Node.js"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Each outcome should be 2–3 words minimum
										(e.g. "Deploy to Vercel")
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							size="sm"
							disabled={isPending}
							className="mt-0.5"
						>
							<Plus className="h-4 w-4" />
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
};
