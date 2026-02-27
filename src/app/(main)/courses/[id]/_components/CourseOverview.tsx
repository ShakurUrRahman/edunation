import { CheckCircle, BookOpen, Clock, Globe, Award } from "lucide-react";

interface Course {
	description?: string;
	learning?: string[]; // your field: learning[]
	modules?: any[];
	language?: string;
	certificate?: boolean;
}

interface Props {
	course: Course;
}

export default function CourseOverview({ course }: Props) {
	const totalLessons =
		course?.modules?.reduce(
			(acc: number, m: any) => acc + (m.lessonIds?.length ?? 0),
			0,
		) ?? 0;

	return (
		<div className="space-y-10">
			{/* Description */}
			{course?.description && (
				<section>
					<h2 className="text-lg font-bold text-[#1a1a2e] mb-3">
						Course Description
					</h2>
					<p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
						{course.description}
					</p>
				</section>
			)}

			{/* What you'll learn — your field: learning[] */}
			{course?.learning && course.learning.length > 0 && (
				<section>
					<h2 className="text-lg font-bold text-[#1a1a2e] mb-4">
						What you'll learn
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
						{course.learning.map((item, i) => (
							<div
								key={i}
								className="flex items-start gap-2.5 text-sm text-gray-600"
							>
								<CheckCircle className="w-4 h-4 text-[#2a9d5c] mt-0.5 shrink-0" />
								<span>{item}</span>
							</div>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
