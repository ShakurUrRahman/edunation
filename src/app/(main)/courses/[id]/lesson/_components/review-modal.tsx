// components/ReviewModal.tsx (or wherever you keep it)
"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Star } from "lucide-react";
import * as z from "zod";
import { createTestimonial } from "@/app/actions/testimonial";

// ── Schema ────────────────────────────────────────────────────────────────────
const formSchema = z.object({
	rating: z
		.number({ required_error: "Please select a rating" })
		.min(1, "Rating must be between 1 and 5")
		.max(5, "Rating must be between 1 and 5"),
	review: z.string().min(10, "Review must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

// ── Labels ────────────────────────────────────────────────────────────────────
const RATING_LABELS: Record<number, string> = {
	1: "Poor",
	2: "Fair",
	3: "Good",
	4: "Very Good",
	5: "Excellent",
};

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
	open: boolean;
	setOpen: (open: boolean) => void;
	courseId: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export const ReviewModal = ({ open, setOpen, courseId }: Props) => {
	const [hoveredStar, setHoveredStar] = useState(0);
	const [isPending, startTransition] = useTransition();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { rating: 0, review: "" },
	});

	const selectedRating = form.watch("rating");

	const handleClose = () => {
		form.reset();
		setHoveredStar(0);
		setOpen(false);
	};

	const onSubmit = (values: FormValues) => {
		startTransition(async () => {
			const result = await createTestimonial({
				courseId,
				rating: values.rating,
				// your schema field is "content" not "review"
				content: values.review,
			});

			if (result.success) {
				toast.success("Review submitted — thank you!");
				handleClose();
			} else {
				toast.error(result.error ?? "Something went wrong");
			}
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				className="max-w-md overflow-y-auto max-h-[90vh]"
				onInteractOutside={(e) => e.preventDefault()}
			>
				<DialogTitle className="text-lg font-bold text-[#1a1a2e]">
					Leave a Review
				</DialogTitle>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 mt-2"
					>
						{/* ── Star Picker ──────────────────────────────────────────── */}
						<FormField
							control={form.control}
							name="rating"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your Rating</FormLabel>
									<FormControl>
										<div className="flex items-center gap-1">
											{[1, 2, 3, 4, 5].map((star) => {
												const active =
													star <=
													(hoveredStar ||
														field.value);
												return (
													<button
														key={star}
														type="button"
														onMouseEnter={() =>
															setHoveredStar(star)
														}
														onMouseLeave={() =>
															setHoveredStar(0)
														}
														onClick={() =>
															field.onChange(star)
														}
														className="cursor-pointer border-none bg-transparent p-0.5 transition-transform hover:scale-110"
													>
														<Star
															className="w-7 h-7 transition-colors duration-150"
															fill={
																active
																	? "#f5a623"
																	: "transparent"
															}
															stroke={
																active
																	? "#f5a623"
																	: "#d1d5db"
															}
															strokeWidth={1.5}
														/>
													</button>
												);
											})}
											{(hoveredStar || selectedRating) >
												0 && (
												<span className="ml-2 text-sm font-semibold text-primary">
													{
														RATING_LABELS[
															hoveredStar ||
																selectedRating
														]
													}
												</span>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* ── Review Text ──────────────────────────────────────────── */}
						<FormField
							control={form.control}
							name="review"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your Review</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Share what you liked or didn't like about this course..."
											className="resize-none min-h-[120px]"
											disabled={isPending}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Write a brief overview about the course
										(min. 10 characters)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* ── Buttons ──────────────────────────────────────────────── */}
						<div className="flex items-center gap-3 pt-1">
							<Button
								variant="outline"
								type="button"
								onClick={handleClose}
								disabled={isPending}
								className="flex-1"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isPending}
								className="flex-1 bg-primary hover:bg-primary/90 text-white border-none"
							>
								{isPending ? "Submitting..." : "Submit Review"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
