import { CourseProgress } from "@/components/course-progress";
import { Badge } from "@/components/ui/badge";
import {
	BookOpen,
	GraduationCap,
	ClipboardCheck,
	BarChart3,
} from "lucide-react";
import Image from "next/image";
import { getCategoryDetails } from "@/queries/categories";
import { getAReport } from "@/queries/reports";
import { getCourseDetails } from "@/queries/courses";

const EnrolledCourseCard = async ({ enrollment }) => {
	const courseCategory = await getCategoryDetails(
		enrollment?.course?.category?._id,
	);

	const filter = {
		course: enrollment?.course?._id,
		student: enrollment?.student?._id,
	};

	const report = await getAReport(filter);
	const courseDetails = await getCourseDetails(enrollment?.course?._id);

	const totalModuleCount = courseDetails?.modules?.length || 0;
	const totalCompletedModules = report?.totalCompletedModules?.length || 0;
	const totalProgress = totalModuleCount
		? (totalCompletedModules / totalModuleCount) * 100
		: 0;

	const quizzes = report?.quizAssessment?.assessments || [];
	const totalQuizzes = quizzes.length;
	const quizzesTaken = quizzes.filter((q) => q.attempted);

	const totalCorrect = quizzesTaken
		.map((quiz) => quiz.options.filter((o) => o.isCorrect && o.isSelected))
		.filter((elem) => elem.length > 0)
		.flat();

	const marksFromQuizzes = totalCorrect?.length * 5;
	const otherMarks = report?.quizAssessment?.otherMarks ?? 0;
	const totalMarks = marksFromQuizzes + otherMarks;

	return (
		<div className="group herod hover:shadow-xl transition-all duration-300 overflow-hidden border border-primary/20 rounded-lg p-4 h-full flex flex-col">
			{/* Thumbnail Container */}
			<div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-inner">
				<Image
					src={enrollment?.course?.thumbnail}
					alt={enrollment?.course?.title}
					className="object-cover transition-transform duration-500 group-hover:scale-105"
					fill
				/>
				<div className="absolute top-2 left-2">
					<Badge className="bg-primary/90 hover:bg-primary backdrop-blur-md border-none">
						{courseCategory?.title}
					</Badge>
				</div>
			</div>

			{/* Content Area */}
			<div className="flex flex-col flex-1 pt-4">
				<h3 className="text-base font-bold line-clamp-2 group-hover:text-primary transition-colors min-h-[3rem]">
					{enrollment?.course?.title}
				</h3>

				<div className="flex items-center gap-x-1.5 text-muted-foreground mt-1 mb-4">
					<BookOpen className="w-4 h-4 text-primary/70" />
					<span className="text-xs font-medium">
						{totalModuleCount} Chapters
					</span>
				</div>

				{/* Stats Grid */}
				<div className="space-y-3 border-t border-b border-primary/10 py-4 mb-4">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground flex items-center gap-2">
							<GraduationCap className="w-4 h-4" /> Modules
						</span>
						<span className="font-semibold text-foreground">
							{totalCompletedModules}/{totalModuleCount}
						</span>
					</div>

					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground flex items-center gap-2">
							<ClipboardCheck className="w-4 h-4" /> Quizzes
						</span>
						<span className="font-semibold text-foreground">
							{quizzesTaken.length}/{totalQuizzes}
						</span>
					</div>

					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground flex items-center gap-2">
							<BarChart3 className="w-4 h-4" /> Final Score
						</span>
						<Badge
							variant="outline"
							className="font-bold border-primary/30 text-primary"
						>
							{totalMarks} pts
						</Badge>
					</div>
				</div>

				{/* Progress Section */}
				<div className="mt-auto">
					<div className="flex items-center justify-between mb-2">
						<p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
							Progress
						</p>
						<p className="text-xs font-bold text-primary">
							{Math.round(totalProgress)}%
						</p>
					</div>
					<CourseProgress
						size="sm"
						value={totalProgress}
						variant={totalProgress === 100 ? "success" : "default"}
					/>
				</div>
			</div>
		</div>
	);
};

export default EnrolledCourseCard;
