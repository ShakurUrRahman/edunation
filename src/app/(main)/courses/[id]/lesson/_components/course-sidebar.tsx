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

export const CourseSidebar = async ({ courseId }) => {
	const course = await getCourseDetails(courseId);
	const loggedInUser = await getLoggedInUser();

	console.log(loggedInUser);

	const report = await getAReport({
		course: courseId,
		student: loggedInUser.id,
	});

	const totalCompletedModules = report?.totalCompletedModules?.length ?? 0;
	const totalModules = course?.modules?.length ?? 0;
	const totalProgress =
		totalModules > 0 ? (totalCompletedModules / totalModules) * 100 : 0;

	// Build modules with watch state
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

	// ── Check if user already reviewed (server-side) ────────────────────────────
	const alreadyReviewed = await hasUserReviewed(courseId);

	return (
		<div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
			{/* Title + Progress */}
			<div className="p-8 flex flex-col border-b">
				<h1 className="font-semibold">{course.title}</h1>
				<div className="mt-10">
					<CourseProgress variant="success" value={totalProgress} />
				</div>
			</div>

			{/* Modules list */}
			<SidebarModules courseId={courseId} modules={courseModules} />

			{/* Quiz */}
			<div className="w-full px-4 lg:px-14 pt-10 border-t">
				{quizSet && (
					<Quiz
						courseId={courseId}
						quizSet={quizSet}
						isTaken={isQuizComplete}
					/>
				)}
			</div>

			{/* Certificate + Review */}
			<div className="w-full px-6 pb-6">
				<DownloadCertificate
					courseId={courseId}
					totalProgress={totalProgress}
				/>

				{/* GiveReview receives hasReviewed so the button is disabled if already done */}
				<GiveReview
					courseId={courseId}
					hasReviewed={alreadyReviewed}
					loggedInUser={loggedInUser}
				/>
			</div>
		</div>
	);
};
