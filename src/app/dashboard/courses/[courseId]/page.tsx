// app/dashboard/courses/[courseId]/page.tsx
import { IconBadge } from "@/components/icon-badge";
import {
	CircleDollarSign,
	LayoutDashboard,
	ListChecks,
	PlayCircle,
	BookOpen,
} from "lucide-react";

import { CategoryForm } from "./_components/category-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { ModulesForm } from "./_components/module-form";
import { PriceForm } from "./_components/price-form";
import { TitleForm } from "./_components/title-form";
import { CourseActions } from "./_components/course-action";
import { QuizSetForm } from "./_components/quiz-set-form";
import AlertBanner from "@/components/alert-banner";

import { getCategories } from "@/queries/categories";
import { getCourseDetails } from "@/queries/courses";
import { getAllQuizSets } from "@/queries/quizzes";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { PreviewVideoForm } from "./_components/preview-video-form";
import { LearningForm } from "./_components/learnin-form";

type PageProps = {
	params: Promise<{ courseId: string }>;
};

const EditCourse = async ({ params }: PageProps) => {
	const { courseId } = await params;
	const course = await getCourseDetails(courseId);

	// Categories
	const categories = await getCategories();
	const mappedCategories = categories.map((c) => ({
		value: c.title,
		label: c.title,
		id: c.id,
	}));

	// Modules
	const modules = replaceMongoIdInArray(course?.modules).sort(
		(a, b) => a.order - b.order,
	);
	const moduleData = modules.map((module) => ({
		id: module.id,
		active: module.active,
		order: module.order,
		title: module.title,
		slug: module.slug,
	}));

	// Quiz sets
	const allQuizSets = await getAllQuizSets(true);
	const mappedQuizSet = allQuizSets?.length
		? allQuizSets.map((qs) => ({ value: qs.id, label: qs.title }))
		: [];

	return (
		<>
			{!course.active && (
				<AlertBanner
					label="This course is unpublished. It will not be visible in the courses."
					variant="warning"
				/>
			)}

			<div className="p-6">
				<div className="flex items-center justify-end">
					<CourseActions
						courseId={courseId}
						isActive={course?.active}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
					{/* ── Left column ─────────────────────────────────────────────── */}
					<div>
						{/* Customize */}
						<div className="flex items-center gap-x-2">
							<IconBadge icon={LayoutDashboard} />
							<h2 className="text-xl">Customize your course</h2>
						</div>
						<TitleForm
							initialData={{ title: course?.title }}
							courseId={courseId}
						/>
						<DescriptionForm
							initialData={{ description: course?.description }}
							courseId={courseId}
						/>
						<ImageForm
							initialData={{ imageUrl: course?.thumbnail }}
							courseId={courseId}
						/>
						<CategoryForm
							initialData={{ value: course?.category?.title }}
							courseId={courseId}
							options={mappedCategories}
						/>
						<QuizSetForm
							initialData={{
								quizSetId: course?.quizSet?._id?.toString(),
							}}
							courseId={courseId}
							options={mappedQuizSet}
						/>

						{/* ── Preview Video — new ──────────────────────────────────── */}
						<div className="flex items-center gap-x-2 mt-8">
							<IconBadge icon={PlayCircle} />
							<h2 className="text-xl">Preview Video</h2>
						</div>
						<PreviewVideoForm
							initialData={{
								preview_video_url: course?.preview_video_url,
							}}
							courseId={courseId}
						/>
					</div>

					{/* ── Right column ────────────────────────────────────────────── */}
					<div className="space-y-6">
						{/* Modules */}
						<div>
							<div className="flex items-center gap-x-2 mb-6">
								<IconBadge icon={ListChecks} />
								<h2 className="text-xl">Course Modules</h2>
							</div>
							<ModulesForm
								initialData={moduleData}
								courseId={courseId}
							/>
						</div>

						{/* Price */}
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={CircleDollarSign} />
								<h2 className="text-xl">Sell your course</h2>
							</div>
							<PriceForm
								initialData={{ price: course?.price }}
								courseId={courseId}
							/>
						</div>

						{/* ── Learning outcomes — new ──────────────────────────────── */}
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={BookOpen} />
								<h2 className="text-xl">
									What students will learn
								</h2>
							</div>
							<LearningForm
								initialData={{
									learning: course?.learning ?? [],
								}}
								courseId={courseId}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditCourse;
