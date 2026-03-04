// _components/course-sidebar.tsx
import { CourseProgress } from "@/components/course-progress";
import { SidebarModules } from "./sidebar-modules";
import { getCourseDetails } from "@/queries/courses";
import { getLoggedInUser } from "@/lib/loggedIn-user";
import { Watch } from "@/model/watch.model";
import { getAReport } from "@/queries/reports";
import { Quiz } from "./quiz";
import { DownloadCertificate } from "./download-certificate";
import { GiveReview } from "./give-review";
import { hasUserReviewed } from "@/app/actions/testimonial";
import { BookOpenCheck, LayoutDashboard } from "lucide-react"; // Icons for flair

export const CourseSidebar = async ({ courseId }) => {
	const course = await getCourseDetails(courseId);
	const loggedInUser = await getLoggedInUser();

	const report = await getAReport({
		course: courseId,
		student: loggedInUser.id,
	});

	const totalCompletedModules = report?.totalCompletedModules?.length ?? 0;
	const totalModules = course?.modules?.length ?? 0;
	const totalProgress =
		totalModules > 0 ? (totalCompletedModules / totalModules) * 100 : 0;

	// Build modules logic (unchanged)
	const updatedModules = await Promise.all(
		course?.modules.map(async (module) => {
			const moduleId = module._id.toString();
			const updatedLessons = await Promise.all(
				module.lessonIds.map(async (lesson) => {
					const watch = await Watch.findOne({
						lesson: lesson._id.toString(),
						module: moduleId,
						user: loggedInUser.id,
					}).lean();
					if (watch?.state === "completed")
						lesson.state = "completed";
					return lesson;
				}),
			);
			return module;
		}),
	);

	const courseModules = updatedModules.map((module) => ({
		id: module._id.toString(),
		slug: module.slug,
		title: module.title,
		order: module.order,
		lessonIds: module.lessonIds.map((lesson) => ({
			id: lesson._id.toString(),
			slug: lesson.slug,
			title: lesson.title,
			order: lesson.order,
			access: lesson.access,
			state: lesson.state ?? "started",
		})),
	}));

	const quizSet = course?.quizSet
		? {
				id: course.quizSet._id?.toString(),

				title: course.quizSet.title,

				active: course.quizSet.active,

				quizIds:
					course.quizSet.quizIds?.map((quiz: any) => ({
						id: quiz._id?.toString(),

						title: quiz.title,

						description: quiz.description,

						options:
							quiz.options?.map((option: any) => ({
								label: option.text,

								isTrue: option.is_correct,
							})) ?? [],
					})) ?? [],
			}
		: null;
	const isQuizComplete = !!report?.quizAssessment;
	const alreadyReviewed = await hasUserReviewed(courseId);

	return (
		<div className="h-full flex flex-col bg-background border-r shadow-sm overflow-hidden">
			{/* 1. Header Section: Adaptive Padding */}
			<div className="p-6 lg:p-8 flex flex-col border-b hero dark:bg-slate-900/20">
				<div className="flex items-center gap-x-2 mb-4">
					<div className="p-2 bg-primary/10 rounded-lg">
						<BookOpenCheck className="w-5 h-5 text-primary" />
					</div>
					<h1 className="font-bold text-lg leading-tight line-clamp-2">
						{course.title}
					</h1>
				</div>

				<div className="space-y-2">
					<div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
						<span>Your Progress</span>
						<span>{Math.round(totalProgress)}%</span>
					</div>
					<CourseProgress
						variant="success"
						value={totalProgress}
						size="sm"
					/>
				</div>
			</div>

			{/* 2. Scrollable Modules: Flexible area */}
			<div className="flex-1 overflow-y-auto custom-scrollbar">
				<SidebarModules courseId={courseId} modules={courseModules} />

				{/* 3. Quiz Section: Responsive horizontal padding */}
				{quizSet && (
					<div className="px-4 lg:px-6 py-8 border-t bg-slate-50/30">
						<div className="flex items-center gap-x-2 mb-4 text-sm font-bold text-slate-600">
							<LayoutDashboard className="w-4 h-4" />
							Final Assessment
						</div>
						<Quiz
							courseId={courseId}
							quizSet={quizSet}
							isTaken={isQuizComplete}
						/>
					</div>
				)}
			</div>

			{/* 4. Footer Section: Actions fixed to bottom */}
			<div className="p-4 lg:p-6 border-t bg-background space-y-3">
				<DownloadCertificate
					courseId={courseId}
					totalProgress={totalProgress}
				/>

				<GiveReview
					courseId={courseId}
					hasReviewed={alreadyReviewed}
					loggedInUser={loggedInUser}
				/>
			</div>
		</div>
	);
};
