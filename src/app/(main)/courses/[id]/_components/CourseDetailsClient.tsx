"use client";

import { useState, useTransition } from "react";
import { Star, User, Calendar } from "lucide-react";
import CourseTabNav, { Tab } from "./CourseTabNav";
import CourseVideoPreview from "./CourseVideoPreview";
import CourseEnrollCard from "./CourseEnrollCard";
import CourseCurriculum from "./CourseCurriculum";
import CourseReviews from "./CourseReviews";
import RelatedCourses from "./CourseOverview";
import CourseOverview from "./CourseOverview";
import { formatMyDate } from "@/lib/date";
import CourseInstructor from "./CourseInstructor";

interface Props {
	course: any;
	relatedCourses: any[];
	enrollAction: (courseId: string) => Promise<void>; // your server action
}

export default function CourseDetailsClient({
	course,
	instructorDetails,
	instructorPersonalDetails,
	relatedCourses,
	enrollAction,
}: Props) {
	const [activeTab, setActiveTab] = useState<Tab>("Overview");
	const [isPending, startTransition] = useTransition();

	const instructorName = course.instructor
		? `${course.instructor.firstName} ${course.instructor.lastName}`
		: null;

	// Average rating from testimonials
	const avgRating =
		course.testimonials?.length > 0
			? course.testimonials.reduce(
					(sum: number, t: any) => sum + t.rating,
					0,
				) / course.testimonials.length
			: 0;

	const handleEnroll = () => {
		startTransition(async () => {
			await enrollAction(course.id);
		});
	};

	return (
		<>
			<div className="pt-12 pb-32 container">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
					{/* ── Left column ── */}
					<div>
						{/* Course meta */}
						<div className="mb-6">
							{/* Category badge */}
							{course.category && (
								<p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 backdrop-blur shadow-sm border border-green-300 text-sm font-medium mb-3">
									{course.category.title}
								</p>
							)}

							{/* Title */}
							<h1 className="text-4xl font-bold text-[#1a1a2e] mb-3 leading-snug">
								{course.title}
							</h1>

							{/* Meta row */}
							<div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
								{instructorName && (
									<div className="flex items-center gap-1.5">
										{course.instructor?.profilePicture ? (
											<img
												src={
													course.instructor
														.profilePicture
												}
												alt={instructorName}
												className="w-6 h-6 rounded-full object-cover"
											/>
										) : (
											<User className="w-4 h-4 text-primary" />
										)}
										<span>{instructorName}</span>
									</div>
								)}
								{course.createdOn && (
									<div className="flex items-center gap-1.5">
										<Calendar className="w-4 h-4 text-primary" />
										<span>
											{formatMyDate(course.createdOn)}
										</span>
									</div>
								)}
								{avgRating > 0 && (
									<div className="flex items-center gap-1.5">
										<Star className="w-4 h-4 fill-[#f5a623] text-[#f5a623]" />
										<span className="font-semibold text-[#1a1a2e]">
											{avgRating.toFixed(1)} Rating
										</span>
									</div>
								)}
							</div>
						</div>

						{/* Thumbnail / video preview */}
						<CourseVideoPreview
							thumbnail={course.thumbnail}
							title={course.title}
							previewUrl={course.previewUrl}
						/>

						{/* Tab navigation */}
						<CourseTabNav
							activeTab={activeTab}
							onChange={setActiveTab}
						/>

						{/* Tab content */}
						{activeTab === "Overview" && (
							<CourseOverview course={course} />
						)}
						{activeTab === "Curriculum" && (
							<CourseCurriculum modules={course.modules ?? []} />
						)}
						{activeTab === "Instructor" && course?.instructor && (
							<CourseInstructor
								instructorDetails={instructorDetails}
								instructorPersonalDetails={
									instructorPersonalDetails
								}
							/>
						)}
						{/* {activeTab === "Reviews" && (
							<CourseReviews
								testimonials={course.testimonials ?? []}
								rating={avgRating}
							/>
						)} */}
					</div>

					{/* ── Right column — sticky enroll card ── */}
					<div className="lg:sticky lg:top-6">
						<CourseEnrollCard
							course={course}
							onEnroll={handleEnroll}
							isEnrolling={isPending}
						/>
					</div>
				</div>
			</div>

			{/* Related courses */}
			<RelatedCourses
				courses={relatedCourses}
				instructorName={instructorName ?? undefined}
			/>
		</>
	);
}
