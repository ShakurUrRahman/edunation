"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { EnrollCourse } from "@/components/enroll-course";
import { useRouter } from "next/navigation";

const Courses = ({ courses, loggedInUser }) => {
	const router = useRouter();

	return (
		/* Breakpoints: 
		   1 col on mobile (default)
		   2 cols on small/medium tablets (sm/md)
		   3 cols on large screens (xl) 
		*/
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
			{courses.map((course) => {
				return (
					<div
						key={course?._id}
						className="group hero hover:shadow-xl transition-all duration-300 p-4 h-full flex flex-col border border-primary/20 rounded-lg"
					>
						<Link
							href={`/courses/${course?._id}`}
							className="flex-1"
						>
							{/* Thumbnail Container */}
							<div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-inner">
								<Image
									src={course.thumbnail}
									alt={course.title}
									className="object-cover transition-transform duration-500 group-hover:scale-105"
									fill
								/>
							</div>

							{/* Content Area */}
							<div className="flex flex-col pt-4">
								<div className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
									{course.title}
								</div>

								<p className="text-xs font-semibold text-primary uppercase tracking-wider mt-1">
									{course.category.title}
								</p>

								<div className="my-4 flex items-center gap-x-2">
									<div className="flex items-center gap-x-1.5 text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
										<BookOpen className="w-4 h-4 text-primary" />
										<span className="text-xs font-medium">
											{course.modules?.length} Chapters
										</span>
									</div>
								</div>
							</div>
						</Link>

						{/* Footer Area - Pushed to bottom */}
						<div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/10">
							<p className="text-lg font-bold text-foreground">
								{course.price === 0 ? (
									<span className="text-green-600">Free</span>
								) : (
									formatPrice(course.price)
								)}
							</p>

							<div className="flex items-center">
								{!loggedInUser ? (
									<Button
										variant="outline"
										size="sm"
										className="text-xs font-bold rounded-full hover:bg-primary hover:text-white transition-all h-9 px-4 gap-2"
										onClick={() => router.push(`/signin`)}
									>
										Enroll
										<ArrowRight className="w-3.5 h-3.5" />
									</Button>
								) : (
									<EnrollCourse
										asLink={true}
										courseId={course._id}
									/>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Courses;
