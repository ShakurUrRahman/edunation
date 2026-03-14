"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const SidebarLessonItem = ({ courseId, lesson, module }) => {
	const searchParams = useSearchParams();
	const currentSlug = searchParams.get("name");
	const isActive = currentSlug === lesson.slug;

	const isPrivate = lesson?.access === "private";
	const isComplete = lesson?.state === "completed";

	return (
		<Link
			href={
				isPrivate
					? "#"
					: `/courses/${courseId}/lesson?name=${lesson.slug}&module=${module}`
			}
			className={cn(
				"flex items-center gap-x-2 text-sm font-medium transition-all",
				isPrivate &&
					"text-slate-500 cursor-default hover:text-slate-500",
				!isPrivate &&
					isComplete &&
					!isActive &&
					"text-emerald-700 hover:text-emerald-700",
				!isPrivate &&
					isActive &&
					"text-blue-600 hover:text-blue-600 font-semibold",
				!isPrivate &&
					!isComplete &&
					!isActive &&
					"text-slate-700 hover:text-slate-600",
			)}
		>
			<div className="flex items-center gap-x-2">
				<div>
					{isPrivate ? (
						<Lock size={16} className="text-slate-500" />
					) : isComplete ? (
						<CheckCircle
							size={16}
							className={cn(
								isActive ? "text-blue-600" : "text-emerald-700",
							)}
						/>
					) : (
						<PlayCircle
							size={16}
							className={cn(
								isActive ? "text-blue-600" : "text-slate-700",
							)}
						/>
					)}
				</div>
				<div>{lesson.title}</div>
			</div>
		</Link>
	);
};
