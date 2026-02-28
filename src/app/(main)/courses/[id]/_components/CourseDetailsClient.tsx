"use client";

import { useState, useTransition } from "react";
import { Star, User, Calendar } from "lucide-react";
import CourseTabNav, { Tab } from "./CourseTabNav";
import CourseVideoPreview from "./CourseVideoPreview";
import CourseEnrollCard from "./CourseEnrollCard";
import CourseCurriculum from "./CourseCurriculum";
import CourseOverview from "./CourseOverview";
import { formatMyDate } from "@/lib/date";
import CourseInstructor from "./CourseInstructor";
import { motion, AnimatePresence } from "framer-motion";
import CourseReviews from "./CourseReviews";

interface Props {
	course: any;
	instructorDetails: any;
	instructorPersonalDetails: any;
	relatedCourses: any[];
	enrollAction: (courseId: string) => Promise<void>;
}

export default function CourseDetailsClient({
	course,
	instructorDetails,
	instructorPersonalDetails,
	hasEnrollment,
	relatedCourses,
	loggedInUser,
}: Props) {
	const [activeTab, setActiveTab] = useState<Tab>("Overview");

	const instructorName = course.instructor
		? `${course.instructor.firstName} ${course.instructor.lastName}`
		: null;

	const totalDuration = course?.modules
		.map((item) => {
			return item.lessonIds.reduce(function (acc, obj) {
				return acc + obj.duration;
			}, 0);
		})
		.reduce(function (acc, obj) {
			return acc + obj;
		}, 0);

	const avgRating =
		course.testimonials?.length > 0
			? course.testimonials.reduce(
					(sum: number, t: any) => sum + t.rating,
					0,
				) / course.testimonials.length
			: 0;

	return (
		<div className="pt-12 pb-32 mb-10 container">
			{/* Added items-start to the grid to ensure the right column 
          stays at the top of its row.
      */}
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 items-start">
				{/* ── Left column ── */}
				<div className="flex flex-col">
					{/* Course meta */}
					<div className="mb-6">
						{course.category && (
							<p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 backdrop-blur shadow-sm border border-green-300 text-sm font-medium mb-3">
								{course.category.title}
							</p>
						)}

						<h1 className="text-4xl font-bold text-[#1a1a2e] mb-3 leading-snug">
							{course.title}
						</h1>

						<div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
							{instructorName && (
								<div className="flex items-center gap-1.5">
									{course.instructor?.profilePicture ? (
										<img
											src={
												course.instructor.profilePicture
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

					<CourseVideoPreview
						thumbnail={course.thumbnail}
						title={course.title}
						previewUrl={course.previewUrl}
					/>

					<CourseTabNav
						activeTab={activeTab}
						onChange={setActiveTab}
					/>

					{/* FIX: Use mode="popLayout" to prevent the right column 
              from jumping down when the left content height changes.
          */}
					<AnimatePresence mode="popLayout">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.25, ease: "easeInOut" }}
							className="w-full"
						>
							{activeTab === "Overview" && (
								<CourseOverview
									course={course}
									totalDuration={totalDuration}
								/>
							)}

							{activeTab === "Curriculum" && (
								<CourseCurriculum
									modules={course?.modules ?? []}
									totalDuration={totalDuration}
								/>
							)}

							{activeTab === "Instructor" &&
								course?.instructor && (
									<CourseInstructor
										instructorDetails={instructorDetails}
										instructorPersonalDetails={
											instructorPersonalDetails
										}
									/>
								)}

							{activeTab === "Reviews" && <CourseReviews />}
						</motion.div>
					</AnimatePresence>
				</div>

				{/* ── Right column — sticky enroll card ── */}
				<aside className="lg:sticky lg:top-30">
					<CourseEnrollCard
						course={course}
						hasEnrollment={hasEnrollment}
						totalDuration={totalDuration}
						loggedInUser={loggedInUser}
					/>
				</aside>
			</div>
		</div>
	);
}
