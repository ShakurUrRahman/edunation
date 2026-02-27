"use client";

import { useState } from "react";
import { ChevronDown, PlayCircle, Lock } from "lucide-react";

// Your data shape: modules[].lessonIds[] (array of lesson objects after population)
interface Lesson {
	_id: string;
	title: string;
	duration?: string;
	isPreview?: boolean;
}

interface Module {
	_id: string;
	title: string;
	lessonIds: Lesson[];
	order: number;
}

interface Props {
	modules: Module[];
}

export default function CourseCurriculum({ modules }: Props) {
	// Sort by order field
	const sorted = [...modules].sort((a, b) => a.order - b.order);
	const [openModules, setOpenModules] = useState<string[]>(
		sorted.length > 0 ? [sorted[0]._id.toString()] : [],
	);

	const toggle = (id: string) =>
		setOpenModules((prev) =>
			prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
		);

	const totalLessons = modules.reduce(
		(acc, m) => acc + (m.lessonIds?.length ?? 0),
		0,
	);

	return (
		<section>
			<div className="flex items-center justify-between mb-5">
				<h2 className="text-lg font-bold text-[#1a1a2e]">
					Course Content
				</h2>
				<span className="text-xs text-gray-400">
					{modules.length} modules • {totalLessons} lessons
				</span>
			</div>

			<div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200">
				{sorted.map((mod) => {
					const isOpen = openModules.includes(mod._id.toString());
					const lessons: Lesson[] = mod.lessonIds ?? [];

					return (
						<div key={mod._id.toString()}>
							{/* Module header */}
							<button
								onClick={() => toggle(mod._id.toString())}
								className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50 hover:bg-gray-100 text-left cursor-pointer border-none transition-colors duration-150"
							>
								<div className="flex items-center gap-2.5">
									<ChevronDown
										className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
									/>
									<span className="text-sm font-semibold text-[#1a1a2e]">
										{mod.title}
									</span>
								</div>
								<span className="text-xs text-gray-400 shrink-0">
									{lessons.length}{" "}
									{lessons.length === 1
										? "lesson"
										: "lessons"}
								</span>
							</button>

							{/* Lessons */}
							{isOpen && lessons.length > 0 && (
								<ul className="divide-y divide-gray-100">
									{lessons.map((lesson) => (
										<li
											key={lesson._id?.toString()}
											className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
										>
											<div className="flex items-center gap-3">
												<PlayCircle
													className={`w-4 h-4 shrink-0 ${lesson.isPreview ? "text-[#2a9d5c]" : "text-gray-400"}`}
												/>
												<span className="text-sm text-gray-600">
													{lesson.title}
												</span>
												{lesson.isPreview && (
													<span className="text-[10px] font-semibold text-[#2a9d5c] bg-[#e8f4f0] px-2 py-0.5 rounded-full">
														Preview
													</span>
												)}
											</div>
											<div className="flex items-center gap-2">
												{lesson.duration && (
													<span className="text-xs text-gray-400">
														{lesson.duration}
													</span>
												)}
												{!lesson.isPreview && (
													<Lock className="w-3.5 h-3.5 text-gray-300" />
												)}
											</div>
										</li>
									))}
								</ul>
							)}

							{/* Empty module */}
							{isOpen && lessons.length === 0 && (
								<div className="px-4 py-3 text-xs text-gray-400 italic">
									No lessons yet.
								</div>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}
