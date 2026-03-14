import { getLesson } from "@/queries/lessons";
import { LessonModalIntercepted } from "../_components/lesson-modal-intercepted";

type Props = {
	params: Promise<{ courseId: string; moduleId: string; lessonId: string }>;
};

export default async function InterceptedLessonPage({ params }: Props) {
	const { courseId, moduleId, lessonId } = await params;

	const lesson = await getLesson(lessonId);

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
		<LessonModalIntercepted
			courseId={courseId}
			moduleId={moduleId}
			lesson={lessonData}
		/>
	);
}
