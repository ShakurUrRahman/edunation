"use client";

import { useRouter } from "next/navigation";
import { LessonModal } from "./lesson-modal";

export function LessonModalIntercepted({ courseId, moduleId, lesson }) {
	const router = useRouter();

	return (
		<LessonModal
			open={true}
			setOpen={(open) => {
				if (!open) {
					router.back(); // close = go back to module page
					router.refresh(); // ← refresh module page data in real time
				}
			}}
			courseId={courseId}
			moduleId={moduleId}
			lesson={lesson}
			onclose={() => router.refresh()}
		/>
	);
}
