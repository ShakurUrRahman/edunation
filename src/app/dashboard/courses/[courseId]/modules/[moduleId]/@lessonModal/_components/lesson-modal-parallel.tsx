"use client";

import { useRouter } from "next/navigation";
import { LessonModal } from "./lesson-modal"; // your existing modal

export function LessonModalParallel({ courseId, moduleId, lesson }) {
	const router = useRouter();
	console.log(lesson);

	return (
		<LessonModal
			open={true}
			setOpen={(open) => {
				if (!open) router.back(); // close = go back
			}}
			courseId={courseId}
			moduleId={moduleId}
			lesson={lesson}
			onclose={() => router.refresh()}
		/>
	);
}
