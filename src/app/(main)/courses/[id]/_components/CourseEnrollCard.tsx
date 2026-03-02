"use client";

import { EnrollCourse } from "@/components/enroll-course";
import {
	BookOpen,
	Clock,
	Globe,
	Award,
	Phone,
	BadgeCheck,
	GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Course {
	id: string;
	price?: number;
	modules?: any[];
	language?: string;
	certificate?: boolean;
}

interface Props {
	course: Course;
	hasEnrollment: boolean;
	totalDuration: number;
	loggedInUser: any;
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
			value: totalDuration ? (totalDuration / 3600).toFixed(1) : 0,
		},
		{ icon: Globe, label: "Language", value: course.language ?? "English" },
		{
			icon: Award,
			label: "Certificate",
			value: "Included",
		},
	];

	return (
		<div className="lg:sticky lg:top-10 bg-white rounded-3xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden w-full max-w-[400px] mx-auto lg:mx-0">
			{/* Top Gradient Banner */}
			<div className="h-2 bg-gradient-to-r from-primary to-teal-400" />

			{/* Price Section */}
			<div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6 text-center">
				<div className="flex items-center justify-center gap-2">
					<span className="text-3xl md:text-4xl font-black text-gray-900">
						{isFree ? (
							<span className="text-primary">Free</span>
						) : (
							`৳${course.price?.toLocaleString()}`
						)}
					</span>
					{!isFree && (
						<span className="text-sm text-gray-400 line-through font-medium">
							৳{(course.price! * 1.5).toFixed(0)}
						</span>
					)}
				</div>

				<p className="text-[11px] md:text-xs text-gray-500 mt-3 font-medium uppercase tracking-wide">
					Full lifetime access • 30-day money-back
				</p>
			</div>

			{/* CTA Section */}
			<div className="px-6 md:px-8 pb-6 md:pb-8">
				{hasEnrollment ? (
					<Link
						href={`/courses/${course?.id}/lesson`}
						className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
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
						className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
					>
						<GraduationCap className="w-5 h-5" />
						Enroll Now
					</button>
				) : (
					<div className="w-full">
						<EnrollCourse courseId={course?.id} />
					</div>
				)}
			</div>

			{/* Features List */}
			<div className="bg-gray-50/50 px-6 md:px-8 py-6 md:py-8 border-t border-gray-100">
				<p className="text-sm font-bold text-gray-800 mb-4">
					This Course Includes:
				</p>

				<ul className="space-y-4">
					{includes.map(({ icon: Icon, label, value }) => (
						<li
							key={label}
							className="flex items-center justify-between text-sm group"
						>
							<div className="flex items-center gap-3 text-gray-600 transition-colors group-hover:text-primary">
								<Icon className="w-4 h-4 md:w-5 md:h-5" />
								<span className="font-medium">{label}</span>
							</div>

							<span className="font-bold text-gray-900">
								{label === "Duration"
									? `${value} Hours`
									: value}
							</span>
						</li>
					))}
				</ul>
			</div>

			{/* Support Section */}
			<Link
				href="/support"
				className="flex items-center justify-center gap-2 px-6 py-5 bg-white border-t border-gray-100 transition-all hover:bg-primary group"
			>
				<Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
				<span className="text-sm font-bold text-gray-600 group-hover:text-white transition-colors">
					Need Help? Contact Support
				</span>
			</Link>
		</div>
	);
}
