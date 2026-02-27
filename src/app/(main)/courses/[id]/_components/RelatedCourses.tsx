import Link from "next/link";
import Image from "next/image";
import { Star, BookOpen, Users } from "lucide-react";

interface RelatedCourse {
	id: string;
	title: string;
	thumbnail?: string;
	price?: number;
	modules?: any[];
	testimonials?: any[];
}

interface Props {
	courses: RelatedCourse[];
	instructorName?: string;
}

function Stars({ rating }: { rating: number }) {
	return (
		<div className="flex gap-0.5">
			{[1, 2, 3, 4, 5].map((s) => (
				<Star
					key={s}
					className="w-3 h-3"
					fill={s <= Math.round(rating) ? "#f5a623" : "#e2e8f0"}
					stroke="none"
				/>
			))}
		</div>
	);
}

export default function RelatedCourses({ courses, instructorName }: Props) {
	if (!courses || courses.length === 0) return null;

	return (
		<section className="py-14 bg-[#f8fdf9] border-t border-gray-100">
			<div className="max-w-6xl mx-auto px-5">
				<div className="flex items-end justify-between mb-8">
					<div>
						<p className="text-xs font-bold text-[#2a9d5c] uppercase tracking-widest mb-1">
							Top Courses
						</p>
						<h2
							className="text-2xl font-bold text-[#1a1a2e]"
							style={{ fontFamily: "'Playfair Display', serif" }}
						>
							Explore Courses By{" "}
							<span className="text-[#2a9d5c]">
								{instructorName ?? "Instructor"}
							</span>
						</h2>
					</div>
					<Link
						href="/courses"
						className="text-sm font-bold text-white bg-[#f5a623] hover:bg-[#e09710] px-4 py-2 rounded-md transition-colors whitespace-nowrap"
					>
						Show All Courses →
					</Link>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{courses.slice(0, 3).map((course) => {
						const isFree = !course.price || course.price === 0;
						const totalLessons =
							course.modules?.reduce(
								(acc: number, m: any) =>
									acc + (m.lessonIds?.length ?? 0),
								0,
							) ?? 0;
						const avgRating =
							course.testimonials &&
							course.testimonials.length > 0
								? course.testimonials.reduce(
										(sum: number, t: any) => sum + t.rating,
										0,
									) / course.testimonials.length
								: 0;

						return (
							<Link
								key={course.id}
								href={`/courses/${course.id}`}
							>
								<div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-200">
									<div className="relative h-44 overflow-hidden bg-gray-200">
										{course.thumbnail && (
											<Image
												src={course.thumbnail}
												alt={course.title}
												fill
												className="object-cover"
											/>
										)}
										<div className="absolute top-2.5 left-2.5">
											<span className="bg-[#2a9d5c] text-white text-[10px] font-bold px-2 py-0.5 rounded">
												{isFree
													? "Free"
													: `$${course.price}`}
											</span>
										</div>
									</div>
									<div className="p-3.5">
										<h3 className="text-sm font-semibold text-[#1a1a2e] leading-snug mb-2 line-clamp-2">
											{course.title}
										</h3>
										{avgRating > 0 && (
											<div className="flex items-center gap-1.5 mb-2.5">
												<Stars rating={avgRating} />
												<span className="text-[11px] text-gray-400">
													({avgRating.toFixed(1)}/5
													Customer Rating)
												</span>
											</div>
										)}
										<div className="flex items-center gap-4 border-t border-gray-100 pt-2.5 mb-3">
											<span className="flex items-center gap-1 text-xs text-gray-500">
												<BookOpen className="w-3.5 h-3.5" />
												{totalLessons} Lessons
											</span>
										</div>
										<button className="w-full py-2 bg-[#1a1a2e] hover:bg-[#2a9d5c] text-white text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors duration-200 border-none cursor-pointer">
											Preview This Course →
										</button>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
