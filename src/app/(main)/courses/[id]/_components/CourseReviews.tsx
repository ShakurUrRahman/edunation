"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
	_id: string; // Adjusted to match common Mongo/DB id patterns
	user: {
		firstName: string;
		lastName: string;
		profilePicture?: string;
	};
	rating: number;
	content: string;
	createdOn?: string;
}

interface Props {
	testimonials: Testimonial[];
}

function Stars({
	rating,
	size = "sm",
}: {
	rating: number;
	size?: "sm" | "xs";
}) {
	const cls = size === "xs" ? "w-3 h-3" : "w-4 h-4";
	return (
		<div className="flex gap-0.5">
			{[1, 2, 3, 4, 5].map((s) => (
				<Star
					key={s}
					className={cls}
					fill={s <= Math.round(rating) ? "#f5a623" : "#e2e8f0"}
					stroke="none"
				/>
			))}
		</div>
	);
}

export default function CourseReviews({ testimonials }: Props) {
	const total = testimonials?.length ?? 0;
	const avgRating =
		total > 0
			? testimonials.reduce((sum, t) => sum + t.rating, 0) / total
			: 0;

	const breakdown = [5, 4, 3, 2, 1].map((star) => {
		const count = testimonials.filter(
			(t) => Math.round(t.rating) === star,
		).length;
		return { star, count, pct: total > 0 ? (count / total) * 100 : 0 };
	});

	return (
		<div className="space-y-6 md:space-y-8 p-4 md:p-6 border border-primary/20 rounded-2xl bg-white shadow-sm">
			<h2 className="text-xl md:text-2xl font-bold text-gray-900">
				Student Feedback
			</h2>

			{/* ── Rating Summary ── */}
			<div className="p-4 md:p-8 bg-gray-50 rounded-3xl border border-gray-100 shadow-inner">
				<div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
					{/* Big number */}
					<div className="text-center shrink-0">
						<p className="text-5xl md:text-6xl font-black text-primary leading-none">
							{avgRating.toFixed(1)}
						</p>
						<div className="mt-4 flex justify-center">
							<Stars rating={avgRating} />
						</div>
						<p className="text-[10px] md:text-xs text-gray-400 mt-2 font-bold uppercase tracking-wider">
							{total} {total === 1 ? "Rating" : "Ratings"}
						</p>
					</div>

					{/* Breakdown bars */}
					<div className="flex-1 w-full space-y-2.5">
						{breakdown.map(({ star, pct }) => (
							<div key={star} className="flex items-center gap-3">
								<span className="text-xs font-bold text-gray-500 w-10 shrink-0">
									{star} star
								</span>
								<div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-[#f5a623] rounded-full transition-all duration-700 ease-out"
										style={{ width: `${pct}%` }}
									/>
								</div>
								<span className="text-xs text-gray-400 w-8 text-right tabular-nums">
									{Math.round(pct)}%
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ── Reviews List ── */}
			<section className="space-y-6">
				<h3 className="text-lg md:text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
					Latest Reviews
				</h3>

				{total === 0 ? (
					<div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-gray-100">
						<p className="text-sm text-gray-400">
							No reviews yet. Be the first to share your
							experience!
						</p>
					</div>
				) : (
					<div className="divide-y divide-gray-100">
						{testimonials.map((t) => {
							const fullName = `${t.user.firstName} ${t.user.lastName}`;
							return (
								<div
									key={t._id}
									className="py-6 first:pt-0 last:pb-0"
								>
									<div className="flex items-start gap-4">
										{/* Avatar */}
										<div className="shrink-0">
											{t.user.profilePicture ? (
												<img
													src={t.user.profilePicture}
													alt={fullName}
													className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-200"
												/>
											) : (
												<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/5">
													<span className="text-sm font-bold text-primary">
														{t.user.firstName.charAt(
															0,
														)}
													</span>
												</div>
											)}
										</div>

										{/* Content */}
										<div className="flex-1 min-w-0">
											<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
												<p className="text-sm md:text-base font-bold text-gray-900 truncate">
													{fullName}
												</p>
												{t.createdOn && (
													<span className="text-[10px] md:text-xs text-gray-400 font-medium">
														{new Date(
															t.createdOn,
														).toLocaleDateString(
															"en-US",
															{
																month: "short",
																day: "numeric",
																year: "numeric",
															},
														)}
													</span>
												)}
											</div>

											<div className="flex items-center gap-2 mb-3">
												<Stars
													rating={t.rating}
													size="xs"
												/>
												<span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
													{t.rating.toFixed(1)}
												</span>
											</div>

											<p className="text-sm text-gray-600 leading-relaxed italic bg-gray-50/50 p-3 rounded-xl border border-gray-100">
												"{t.content}"
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</section>
		</div>
	);
}
