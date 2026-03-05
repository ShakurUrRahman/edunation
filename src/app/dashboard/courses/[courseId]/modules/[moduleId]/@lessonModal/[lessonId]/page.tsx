import { getLesson } from "@/queries/lessons"; // your existing query
import { LessonModalParallel } from "../_components/lesson-modal-parallel";

type Props = {
	params: Promise<{ courseId: string; moduleId: string; lessonId: string }>;
};

export default async function LessonModalPage({ params }: Props) {
	const { courseId, moduleId, lessonId } = await params;

	console.log(courseId, moduleId, lessonId);

	const lesson = await getLesson(lessonId); // fetch lesson server-side

	const lessonData = {
		id: lesson.id,
		title: lesson.title,
		description: lesson.description ?? null,
		video_url: lesson.video_url ?? null,
		duration: lesson.duration ?? null,
		access: lesson.access ?? "private",
		active: lesson.active ?? false,
	};

	return (
		<LessonModalParallel
			courseId={courseId}
			moduleId={moduleId}
			lesson={lessonData}
		/>
	);
}
