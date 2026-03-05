"use client";

import {
	CheckCircle,
	Award,
	Video,
	FileText,
	Download,
	Smartphone,
	ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
	description?: string;
	learning?: string[];
	modules?: any[];
	language?: string;
	certificate?: boolean;
}

interface Props {
	course: Course;
	totalDuration: number;
}

export default function CourseOverview({ course, totalDuration }: Props) {
	return (
		<div className="space-y-6 md:space-y-10 border border-primary/20 p-4 md:p-6 rounded-2xl bg-white shadow-sm">
			{/* Description */}
			{course?.description && (
				<section className="px-2 md:px-0">
					<h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">
						Course Description
					</h2>
					<p className=" md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
						{course.description}
					</p>
				</section>
			)}

			{/* What you'll learn */}
			{course?.learning && course.learning.length > 0 && (
				<section className="relative rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-5 md:p-8 shadow-sm">
					<div className="mb-5">
						<h2 className="text-lg md:text-xl font-bold text-gray-900">
							What you'll learn
						</h2>
						<p className="text-xs md:text-sm text-gray-500 mt-1">
							Skills and knowledge you will gain from this course
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
						{course.learning.map((item, i) => (
							<div
								key={i}
								className="group flex items-center gap-3 rounded-xl p-2 md:p-3 transition-all duration-200 hover:bg-white hover:shadow-sm"
							>
								<div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 shrink-0 mt-0.5">
									<CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
								</div>
								<span className=" text-gray-700 leading-snug md:leading-relaxed">
									{item}
								</span>
							</div>
						))}
					</div>
				</section>
			)}

			{/* This course includes */}
			<section className="relative rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 md:p-8 shadow-sm">
				<div className="mb-5">
					<h3 className="text-lg md:text-xl font-bold text-gray-900">
						This course includes
					</h3>
					<p className="text-xs md:text-sm text-gray-500 mt-1">
						Everything you need to succeed
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
					{/* Feature Items */}
					<FeatureItem
						icon={<Video size={18} />}
						text={`${(totalDuration / 3600).toFixed(1)} hours on-demand video`}
					/>
					<FeatureItem
						icon={<Download size={18} />}
						text="200+ downloadable resource"
					/>
					<FeatureItem
						icon={<ClipboardList size={18} />}
						text="21 Assignments"
					/>
					<FeatureItem
						icon={<Smartphone size={18} />}
						text="Access on mobile and TV"
					/>
					<FeatureItem
						icon={<FileText size={18} />}
						text="23 articles"
					/>
					<FeatureItem
						icon={<Award size={18} />}
						text="Certificate of completion"
					/>
				</div>
			</section>
		</div>
	);
}

// Reusable Feature Component for cleaner grid logic
function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
	return (
		<div className="group flex items-center gap-3 p-2.5 md:p-3 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-sm">
			<div className="text-primary shrink-0">{icon}</div>
			<span className=" text-gray-700 font-medium">{text}</span>
		</div>
	);
}
