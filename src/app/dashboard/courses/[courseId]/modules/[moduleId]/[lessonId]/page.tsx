import { redirect } from "next/navigation";

type Props = {
	params: Promise<{ courseId: string; moduleId: string }>;
};

export default async function LessonFallbackPage({ params }: Props) {
	const { courseId, moduleId } = await params;
	// Hard reload lands here — redirect back to module page
	redirect(`/dashboard/courses/${courseId}/modules/${moduleId}`);
}
