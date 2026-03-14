import { AccordionContent } from "@/components/ui/accordion";
import { SidebarLessonItem } from "./sidebar-lesson-items";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { Suspense } from "react";

export const SidebarLessons = ({ courseId, lessons, module }) => {
	const allLessons = lessons.toSorted((a, b) => a.order - b.order);
	return (
		<AccordionContent>
			<div className="flex flex-col w-full gap-3">
				{allLessons.map((lesson) => (
					<Suspense key={lesson.id} fallback={null}>
						<SidebarLessonItem
							courseId={courseId}
							lesson={lesson}
							module={module}
						/>
					</Suspense>
				))}
			</div>
		</AccordionContent>
	);
};
