import { Star } from "lucide-react";

interface Testimonial {
	_id: string;
	user: { firstName: string; lastName: string; profilePicture?: string };
	rating: number;
	comment: string;
	createdOn?: string;
}

interface Props {
	testimonials?: Testimonial[]; // Made optional so dummy data can kick in
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

const dummyTestimonials: Testimonial[] = [
	{
		_id: "1",
		user: {
			firstName: "Linda",
			lastName: "Brain",
			profilePicture: "https://i.pravatar.cc/150?u=linda",
		},
		rating: 5,
		comment:
			"Its done really well. Perfect for my brain in the way it learns. Lectures are great and the course really gives as much if not all things you need to know about UX Foundation. I love it and thank you.",
		createdOn: "2025-06-06T10:00:00Z",
	},
	{
		_id: "2",
		user: {
			firstName: "John",
			lastName: "Doe",
		},
		rating: 4,
		comment:
			"Very insightful content. The practical wireframing sections were particularly helpful for my current project. Highly recommend for beginners!",
		createdOn: "2025-08-12T14:30:00Z",
	},
	{
		_id: "3",
		user: {
			firstName: "Sarah",
			lastName: "Chen",
			profilePicture: "https://i.pravatar.cc/150?u=sarah",
		},
		rating: 5,
		comment:
			"The instructor explains complex AI concepts in a very digestible way. The move from low-fidelity to high-fidelity prototyping was seamless.",
		createdOn: "2026-01-20T09:15:00Z",
	},
];

export default function CourseReviews({
	testimonials = dummyTestimonials, // Defaulting to dummy data
	rating = 0,
}: Props) {
	const total = testimonials.length;

	// Logic for breakdown bars
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
		<div className="p-6 border border-primary rounded-2xl shadow-sm">
			{/* Summary Section */}{" "}
			<h2 className="text-2xl font-bold mb-8">Student Feedback</h2>
			<div className="p-6 border border-gray-200 rounded-[2rem] bg-white shadow-sm mb-6">
				<div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
					<div className="text-center shrink-0">
						<p className="text-6xl font-bold text-[#1D2939] leading-none">
							{avgRating.toFixed(1)}
						</p>
						<div className="mt-3 flex justify-center">
							<Stars rating={avgRating} />
						</div>
						<p className="text-xs text-gray-400 mt-2 font-medium">
							Total {total} Rating
						</p>
					</div>

					<div className="flex-1 w-full space-y-3">
						{breakdown.map(({ star, pct }) => (
							<div key={star} className="flex items-center gap-3">
								<span className="text-xs font-medium text-gray-500 w-8 shrink-0">
									{star} star
								</span>
								<div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-[#f5a623] rounded-full transition-all duration-500"
										style={{ width: `${pct}%` }}
									/>
								</div>
								<span className="text-xs text-gray-400 w-10 text-right">
									{Math.round(pct)}%
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
			{/* Testimonials List */}
			<section className="p-6 border border-gray-200 rounded-[2rem]  shadow-sm">
				<h2 className="text-xl font-bold text-[#1D2939] mb-6">
					Reviews
				</h2>
				{testimonials.length === 0 ? (
					<p className="text-sm text-gray-400 text-center py-8">
						No reviews yet.
					</p>
				) : (
					<div className="space-y-6">
						{testimonials.map((t) => {
							const fullName = `${t.user.firstName} ${t.user.lastName}`;
							return (
								<div
									key={t._id}
									className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
								>
									{/* Avatar Logic */}
									{t.user.profilePicture ? (
										<img
											src={t.user.profilePicture}
											alt={fullName}
											className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-100"
										/>
									) : (
										<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/5">
											<span className="text-sm font-bold text-primary">
												{t.user.firstName.charAt(0)}
											</span>
										</div>
									)}

									<div className="flex-1">
										<div className="flex items-center justify-between mb-1">
											<p className="text-base font-bold text-[#1D2939]">
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
										<div className="flex items-center gap-2 mb-2">
											<Stars
												rating={t.rating}
												size="xs"
											/>
											<span className="text-[10px] font-bold text-gray-500">
												({t.rating})
											</span>
										</div>
										<p className="text-sm text-gray-600 leading-relaxed italic">
											"{t.comment}"
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
