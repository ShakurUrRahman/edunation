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

			{course?.learning && course.learning.length > 0 && (
				<section className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-white to-primary/5 p-8 shadow-md">
					{/* Heading */}
					<div className="mb-6">
						<h2 className="text-xl font-bold text-gray-900">
							What you'll learn
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							Skills and knowledge you will gain from this course
						</p>
					</div>

					{/* Content */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{course.learning.map((item, i) => (
							<div
								key={i}
								className="group flex items-start gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-white hover:shadow-sm"
							>
								<div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 shrink-0">
									<CheckCircle className="w-4 h-4 text-primary" />
								</div>

								<span className="text-sm text-gray-700 leading-relaxed">
									{item}
								</span>
							</div>
						))}
					</div>
				</section>
			)}

			<section className="relative rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-md">
				{/* Heading */}
				<div className="mb-6">
					<h3 className="text-xl font-bold text-gray-900">
						This course includes
					</h3>
					<p className="text-sm text-gray-500 mt-1">
						Everything you need to succeed
					</p>
				</div>

				{/* Grid */}
				<div className="grid md:grid-cols-2 gap-4">
					<div className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-sm">
						<Video size={18} className="text-primary" />
						<span className="text-sm text-gray-700">
							{(totalDuration / 3600).toFixed(1)} hours on-demand
							video
						</span>
					</div>

					<div className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-sm">
						<Download size={18} className="text-primary" />
						<span className="text-sm text-gray-700">
							1 downloadable resource
						</span>
					</div>

					<div className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-sm">
						<ClipboardList size={18} className="text-primary" />
						<span className="text-sm text-gray-700">
							21 Assignments
						</span>
					</div>

					<div className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-sm">
						<Smartphone size={18} className="text-primary" />
						<span className="text-sm text-gray-700">
							Access on mobile and TV
						</span>
					</div>

					<div className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-sm">
						<FileText size={18} className="text-primary" />
						<span className="text-sm text-gray-700">1 article</span>
					</div>

					<div className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-sm">
						<Award size={18} className="text-primary" />
						<span className="text-sm text-gray-700">
							Certificate of completion
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}
