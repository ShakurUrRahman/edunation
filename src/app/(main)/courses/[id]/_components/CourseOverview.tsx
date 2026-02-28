import {
	CheckCircle,
	BookOpen,
	Clock,
	Globe,
	Award,
	Video,
	FileText,
	Download,
	Smartphone,
	ClipboardList,
} from "lucide-react";

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

export default function CourseOverview({ course, totalDuration }: Props) {
	const totalLessons =
		course?.modules?.reduce(
			(acc: number, m: any) => acc + (m.lessonIds?.length ?? 0),
			0,
		) ?? 0;

	return (
		<div className="space-y-10 border border-primary p-6 rounded-2xl">
			{/* Description */}
			{course?.description && (
				<section>
					<h2 className="text-2xl font-bold mb-6">
						Course Description
					</h2>
					<p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
						{course.description}
					</p>
				</section>
			)}

			{/* What you'll learn — your field: learning[] */}
			{/* {course?.learning && course.learning.length > 0 && (
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
			)} */}

			<section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
				{/* Title */}
				<h3 className="text-lg font-semibold mb-6">
					This course includes:
				</h3>

				{/* Grid Content */}
				<div className="grid md:grid-cols-2 gap-y-5 gap-x-12">
					{/* Left Column */}
					<div className="flex items-center gap-3 text-gray-700">
						<Video size={18} className="text-primary" />
						<span>
							{(totalDuration / 3660).toPrecision(2)} Hours hours
							on-demand video
						</span>
					</div>

					<div className="flex items-center gap-3 text-gray-700">
						<Download size={18} className="text-primary" />
						<span>1 downloadable resource</span>
					</div>

					<div className="flex items-center gap-3 text-gray-700">
						<ClipboardList size={18} className="text-primary" />
						<span>Assignments</span>
					</div>

					<div className="flex items-center gap-3 text-gray-700">
						<Smartphone size={18} className="text-primary" />
						<span>Access on mobile and TV</span>
					</div>

					<div className="flex items-center gap-3 text-gray-700">
						<FileText size={18} className="text-primary" />
						<span>1 article</span>
					</div>

					<div className="flex items-center gap-3 text-gray-700">
						<Award size={18} className="text-primary" />
						<span>Certificate of completion</span>
					</div>
				</div>
			</section>
		</div>
	);
}
