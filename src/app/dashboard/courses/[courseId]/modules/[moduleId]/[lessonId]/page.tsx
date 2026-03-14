// modules/[moduleId]/[lessonId]/page.tsx
import { redirect } from "next/navigation";

export default async function LessonFallback({ params }) {
	const { courseId, moduleId } = await params;
	redirect(`/dashboard/courses/${courseId}/modules/${moduleId}`);
}
