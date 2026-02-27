import { Star } from "lucide-react";

// Your field: testimonials[]
interface Testimonial {
	_id: string;
	user: { firstName: string; lastName: string; profilePicture?: string };
	rating: number;
	comment: string;
	createdOn?: string;
}

interface Props {
	testimonials: Testimonial[];
	rating?: number;
}

function Stars({
	rating,
	size = "sm",
}: {
	rating: number;
	size?: "sm" | "xs";
}) {
	const cls = size === "xs" ? "w-3 h-3" : "w-3.5 h-3.5";
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

export default function CourseReviews({ testimonials, rating = 0 }: Props) {
	const total = testimonials.length;
	const breakdown = [5, 4, 3, 2, 1].map((star) => {
		const count = testimonials.filter(
			(t) => Math.round(t.rating) === star,
		).length;
		return { star, count, pct: total > 0 ? (count / total) * 100 : 0 };
	});

	const avgRating =
		total > 0
			? testimonials.reduce((sum, t) => sum + t.rating, 0) / total
			: rating;

	return (
		<div className="space-y-8">
			{/* Summary */}
			<section>
				<h2 className="text-lg font-bold text-[#1a1a2e] mb-5">
					Student Feedback
				</h2>
				<div className="flex items-center gap-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
					<div className="text-center shrink-0">
						<p className="text-5xl font-bold text-[#1a1a2e] leading-none">
							{avgRating.toFixed(1)}
						</p>
						<div className="mt-2">
							<Stars rating={avgRating} />
						</div>
						<p className="text-xs text-gray-400 mt-1">
							Total Rating
						</p>
					</div>
					<div className="flex-1 space-y-2">
						{breakdown.map(({ star, pct }) => (
							<div
								key={star}
								className="flex items-center gap-2.5"
							>
								<span className="text-xs text-gray-500 w-3 shrink-0">
									{star}
								</span>
								<Star className="w-3 h-3 fill-[#f5a623] text-[#f5a623] shrink-0" />
								<div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-[#f5a623] rounded-full"
										style={{ width: `${pct}%` }}
									/>
								</div>
								<span className="text-xs text-gray-400 w-8 text-right">
									{Math.round(pct)}%
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials list */}
			<section>
				<h2 className="text-lg font-bold text-[#1a1a2e] mb-4">
					Review
				</h2>
				{testimonials.length === 0 ? (
					<p className="text-sm text-gray-400 text-center py-8">
						No reviews yet.
					</p>
				) : (
					<div className="space-y-5">
						{testimonials.map((t) => {
							const fullName = `${t.user.firstName} ${t.user.lastName}`;
							return (
								<div
									key={t._id}
									className="flex gap-3.5 pb-5 border-b border-gray-100 last:border-0"
								>
									{t.user.profilePicture ? (
										<img
											src={t.user.profilePicture}
											alt={fullName}
											className="w-10 h-10 rounded-full object-cover shrink-0"
										/>
									) : (
										<div className="w-10 h-10 rounded-full bg-[#2a9d5c]/10 flex items-center justify-center shrink-0">
											<span className="text-sm font-bold text-[#2a9d5c]">
												{t.user.firstName.charAt(0)}
											</span>
										</div>
									)}
									<div className="flex-1">
										<div className="flex items-center justify-between mb-1">
											<p className="text-sm font-semibold text-[#1a1a2e]">
												{fullName}
											</p>
											{t.createdOn && (
												<span className="text-xs text-gray-400">
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
										<Stars rating={t.rating} size="xs" />
										<p className="text-sm text-gray-600 leading-relaxed mt-1.5">
											{t.comment}
										</p>
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
