"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen, Star, Users, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { EnrollCourse } from "@/components/enroll-course";
import { useRouter } from "next/navigation";

// ── Helpers ───────────────────────────────────────────────────────────────────
function getAvgRating(testimonials: any[]): number {
	if (!testimonials?.length) return 0;
	return (
		testimonials.reduce((s, t) => s + (t.rating ?? 0), 0) /
		testimonials.length
	);
}

function RatingBadge({ rating, count }: { rating: number; count: number }) {
	return (
		<div className="flex items-center gap-1.5 bg-amber-400/15 border border-amber-400/30 rounded-full px-2.5 py-1">
			<Star className="w-3 h-3 fill-amber-400 text-amber-400" />
			<span className="text-[11px] font-bold text-amber-500 tracking-wide">
				{rating.toFixed(1)}
			</span>
			<span className="text-[10px] text-amber-400/70">({count})</span>
		</div>
	);
}

const CourseCard = ({
	course,
	loggedInUser,
	viewMode = "grid", // Default to grid
}: {
	course: any;
	loggedInUser: any;
	viewMode?: string;
}) => {
	const router = useRouter();
	const avgRating = getAvgRating(course?.testimonials ?? []);
	const totalReviews = course?.testimonials?.length ?? 0;
	const isFree = !course?.price || course.price === 0;
	const isList = viewMode === "list";

	return (
		<div
			className={`
        group relative flex 
        ${isList ? "flex-col md:flex-row min-h-[220px]" : "flex-col"}
        bg-[#0f2314] rounded-2xl overflow-hidden
        border border-white/8
        shadow-[0_4px_24px_rgba(0,0,0,0.35)]
        hover:shadow-[0_8px_48px_rgba(42,157,92,0.18)]
        hover:-translate-y-1 transition-all duration-400 ease-out
      `}
		>
			{/* ── Thumbnail Section ────────────────────────────────────────── */}
			<div
				className={`
            relative overflow-hidden shrink-0
            ${isList ? "h-48 md:h-auto md:w-72 lg:w-80" : "h-48"}
         `}
			>
				<Link href={`/courses/${course.id}`}>
					<Image
						src={course?.thumbnail}
						alt={course?.title ?? "Course"}
						fill
						className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
					/>
				</Link>

				<div className="absolute inset-0 bg-gradient-to-t from-[#072e0d] via-[#0f2314]/30 to-transparent" />

				{/* Price pill (Positioned differently for list if desired, but top-left/right works) */}
				<div className="absolute top-3 left-3 right-3 flex items-center justify-between">
					{course?.category?.title && (
						<span className="text-[10px] font-bold uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full">
							{course.category.title}
						</span>
					)}
					<span
						className={`text-xs font-extrabold px-3 py-1 rounded-full shadow-lg ${isFree ? "bg-emerald-500 text-white" : "bg-primary text-white"}`}
					>
						{isFree ? "Free" : formatPrice(course.price)}
					</span>
				</div>
			</div>

			{/* ── Content Section ──────────────────────────────────────────── */}
			<div className="flex flex-col flex-1 px-5 py-5 lg:px-7">
				{/* Top row: Rating + Meta */}
				<div className="flex items-center justify-between mb-2">
					{totalReviews > 0 ? (
						<RatingBadge rating={avgRating} count={totalReviews} />
					) : (
						<span className="text-[10px] text-white/30 italic">
							No ratings yet
						</span>
					)}
					<div className="flex items-center gap-1 text-[11px] text-white/70">
						<BookOpen className="w-3.5 h-3.5" />
						<span>{course?.modules?.length ?? 0} chapter(s)</span>
					</div>
				</div>

				{/* Title */}
				<Link href={`/courses/${course.id}`}>
					<h3
						className={`font-bold text-white/90 leading-snug group-hover:text-amber-100 transition-colors duration-200 ${isList ? "text-xl mb-2" : "text-[16px] line-clamp-2"}`}
					>
						{course?.title}
					</h3>
				</Link>

				{/* Instructor */}
				{(course?.instructor?.firstName ||
					course?.instructor?.name) && (
					<p className="text-xs text-white/50 mb-3">
						by{" "}
						{course.instructor.firstName
							? `${course.instructor.firstName} ${course.instructor.lastName ?? ""}`
							: course.instructor.name}
					</p>
				)}

				{/* Only show short description in List mode */}
				{isList && (
					<p className="text-sm text-white/60 line-clamp-2 mb-4 hidden md:block">
						{course?.description ||
							"Master the skills needed to excel in this field with our comprehensive course content."}
					</p>
				)}

				<div className="flex-1" />

				{/* Footer / CTA Area */}
				<div
					className={`flex items-center justify-between pt-4 border-t border-white/10 ${isList ? "mt-2" : "mt-4"}`}
				>
					<div className="flex items-center gap-0.5">
						{[1, 2, 3, 4, 5].map((s) => (
							<Star
								key={s}
								className="w-3.5 h-3.5"
								fill={
									s <= Math.round(avgRating)
										? "#f5a623"
										: "transparent"
								}
								stroke={
									s <= Math.round(avgRating)
										? "#f5a623"
										: "#ffffff56"
								}
								strokeWidth={1.5}
							/>
						))}
					</div>

					<div className="flex items-center gap-3">
						{/* Optional "Learn More" link for List mode */}
						{isList && (
							<Link
								href={`/courses/${course.id}`}
								className="hidden lg:flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
							>
								Details <ArrowUpRight className="w-3 h-3" />
							</Link>
						)}

						{!loggedInUser ? (
							<button
								onClick={() =>
									router.push(
										`/signin?redirect=/courses/${course?.id}`,
									)
								}
								className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-primary hover:brightness-110 px-4 py-2 rounded-full transition-all shadow-md"
							>
								<Sparkles className="w-3 h-3" />
								Enroll Now
							</button>
						) : (
							<EnrollCourse asLink={true} courseId={course.id} />
						)}
					</div>
				</div>
			</div>

			{/* Hover decoration */}
			<div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
		</div>
	);
};

export default CourseCard;
