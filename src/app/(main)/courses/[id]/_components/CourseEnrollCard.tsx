"use client";

import { EnrollCourse } from "@/components/enroll-course";
import {
	BookOpen,
	Clock,
	Globe,
	Award,
	Phone,
	Loader2,
	BadgeCheck,
	GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Course {
	price?: number;
	modules?: any[];
	language?: string;
	certificate?: boolean;
}

interface Props {
	course: Course;
	onEnroll: () => void;
	isEnrolling?: boolean;
}

export default function CourseEnrollCard({
	course,
	hasEnrollment,
	totalDuration,
	loggedInUser,
}: Props) {
	const isFree = !course.price || course.price === 0;

	const router = useRouter();

	const totalLessons =
		course.modules?.reduce(
			(acc: number, m: any) => acc + (m.lessonIds?.length ?? 0),
			0,
		) ?? 0;

	const includes = [
		{
			icon: BookOpen,
			label: "Lectures",
			value: totalLessons,
		},
		{
			icon: Clock,
			label: "Duration",
			value: totalDuration ? (totalDuration / 3600).toPrecision(2) : 0,
		},
		{ icon: Globe, label: "Language", value: course.language ?? "English" },
		{
			icon: Award,
			label: "Certificate",
			value: "Included",
		},
	];

	return (
		<div className="sticky top-6 bg-white rounded-3xl border shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
			{/* Top Gradient Banner */}
			<div className="h-2 bg-gradient-to-r from-primary to-teal-400" />

			{/* Price Section */}
			<div className="px-8 pt-8 pb-6 text-center">
				<div className="text-4xl font-extrabold text-gray-900">
					{isFree ? (
						<span className="text-primary">Free</span>
					) : (
						`৳${course.price?.toFixed(2)}`
					)}
				</div>

				{/* {!isFree && (
					<p className="text-sm text-gray-400 line-through mt-1">
						$99.99
					</p>
				)} */}

				<p className="text-xs text-gray-500 mt-3">
					Full lifetime access • 30-day money-back guarantee
				</p>
			</div>

			{/* CTA */}
			<div className="px-8 pb-8">
				{hasEnrollment ? (
					<Link
						href={`/courses/${course?.id}/lesson`}
						className="w-full h-12 bg-primary hover:opacity-90 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
					>
						<BadgeCheck className="w-5 h-5" />
						Access Course
					</Link>
				) : !loggedInUser ? (
					<button
						onClick={() =>
							router.push(
								`/signin?redirect=/courses/${course?.id}`,
							)
						}
						className="w-full h-12 bg-primary hover:opacity-90 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
					>
						<GraduationCap className="w-5 h-5" />
						Enroll Now
					</button>
				) : (
					<EnrollCourse courseId={course?.id} />
				)}
			</div>

			{/* Divider */}
			<div className="border-t" />

			{/* Features */}
			<div className="px-8 py-8 space-y-5">
				<p className="text-sm font-semibold text-gray-800">
					This Course Includes:
				</p>

				<ul className="space-y-4">
					{includes.map(({ icon: Icon, label, value }) => (
						<li
							key={label}
							className="flex items-center justify-between text-sm"
						>
							<div className="flex items-center gap-3 text-gray-600">
								<Icon className="w-5 h-5 text-primary" />
								<span>{label}</span>
							</div>

							<span className="font-semibold text-gray-900">
								{label === "Duration"
									? `${value} Hours`
									: value}
							</span>
						</li>
					))}
				</ul>
			</div>

			{/* Support Section */}
			<div
				className="group border-t px-8 py-6 bg-gray-50 
  transition-all duration-300 ease-in-out
  hover:bg-gradient-to-r hover:from-primary hover:to-teal-400"
			>
				<Link
					href="#"
					className="w-full flex items-center justify-center gap-2 
    text-sm font-medium text-gray-700 
    transition-colors duration-300 
    group-hover:text-white"
				>
					<Phone className="w-4 h-4 transition-colors duration-300 group-hover:text-white" />
					Need Help? Contact Support
				</Link>
			</div>
		</div>
	);
}
