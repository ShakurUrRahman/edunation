"use client";

import { BookOpen, Clock, Users, Globe, Award, Phone } from "lucide-react";

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
	onEnroll,
	isEnrolling,
}: Props) {
	const isFree = !course.price || course.price === 0;
	const includes = [
		{
			icon: BookOpen,
			label: "Lessons",
			value: String(
				course.modules?.reduce(
					(acc: number, m: any) => acc + (m.lessonIds?.length ?? 0),
					0,
				) ?? 0,
			),
		},
		{ icon: Clock, label: "Duration", value: "Self-paced" },
		{ icon: Globe, label: "Language", value: course.language ?? "English" },
		{
			icon: Award,
			label: "Certificate",
			value: course.certificate ? "Yes" : "No",
		},
	];

	return (
		<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
			{/* Price */}
			<div className="px-6 pt-6 pb-4">
				<p className="text-2xl font-bold text-[#1a1a2e]">
					{isFree ? (
						<span className="text-[#2a9d5c]">Free</span>
					) : (
						<span>${course.price?.toFixed(2)}</span>
					)}
				</p>
			</div>

			{/* Enroll button — calls your enroll action */}
			<div className="px-6 pb-5 border-b border-gray-100">
				<button
					onClick={onEnroll}
					disabled={isEnrolling}
					className="w-full h-11 bg-[#2a9d5c] hover:bg-[#248f52] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-lg border-none transition-colors duration-200 cursor-pointer"
				>
					{isEnrolling ? "Processing..." : "Enroll Now"}
				</button>
				<p className="text-center text-xs text-gray-400 mt-2">
					30-Day Money-Back Guarantee
				</p>
			</div>

			{/* Course includes */}
			<div className="px-6 py-5 border-b border-gray-100">
				<p className="text-sm font-bold text-[#1a1a2e] mb-4">
					Course Includes:
				</p>
				<ul className="space-y-3">
					{includes.map(({ icon: Icon, label, value }) => (
						<li
							key={label}
							className="flex items-center justify-between"
						>
							<div className="flex items-center gap-2.5 text-sm text-gray-500">
								<Icon className="w-4 h-4 text-[#2a9d5c] shrink-0" />
								<span>{label}</span>
							</div>
							<span className="text-sm font-semibold text-[#1a1a2e]">
								{value}
							</span>
						</li>
					))}
				</ul>
			</div>

			{/* Share */}
			<div className="px-6 py-5 border-b border-gray-100">
				<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
					Share This Course
				</p>
				<div className="flex items-center gap-2">
					{[
						{ label: "f", bg: "#1877f2" },
						{ label: "✕", bg: "#000" },
						{ label: "in", bg: "#0a66c2" },
						{ label: "▶", bg: "#ff0000" },
					].map(({ label, bg }) => (
						<button
							key={label}
							className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer border-none hover:opacity-80 transition-opacity"
							style={{ background: bg }}
						>
							{label}
						</button>
					))}
				</div>
			</div>

			{/* Call */}
			<div className="px-6 py-5">
				<button className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-[#2a9d5c] text-[#2a9d5c] rounded-lg text-sm font-semibold hover:bg-[#2a9d5c] hover:text-white transition-colors duration-200 cursor-pointer bg-transparent">
					<Phone className="w-4 h-4" />
					Call Us: 123-456-789
				</button>
			</div>
		</div>
	);
}
