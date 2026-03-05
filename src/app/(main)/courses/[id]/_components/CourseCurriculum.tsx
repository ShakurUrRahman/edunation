"use client";

import React, { useState } from "react";
import {
	ChevronDown,
	ChevronUp,
	KeyRoundIcon,
	LockIcon,
	PlayCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CourseCurriculum({
	modules,
	totalDuration,
}: {
	modules: any[];
	totalDuration: number;
}) {
	const [openSections, setOpenSections] = useState<string[]>([]);

	const totalLectures = modules?.reduce(
		(acc, m) => acc + (m.lessonIds?.length || 0),
		0,
	);

	const isAllExpanded =
		modules.length > 0 && openSections.length === modules.length;

	const toggleSection = (id: string) => {
		setOpenSections((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		);
	};

	const handleToggleAll = () => {
		if (isAllExpanded) {
			setOpenSections([]);
		} else {
			setOpenSections(modules.map((m) => m._id));
		}
	};

	return (
		<div className="p-4 md:p-6 border border-primary/20 rounded-2xl shadow-sm bg-white">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
				<div className="space-y-2">
					<h2 className="text-xl md:text-2xl font-bold text-[#1D2939]">
						Course Content
					</h2>
					<div className="flex flex-wrap items-center text-gray-500 text-xs md:text-sm gap-y-1 gap-x-2">
						<span>{modules?.length} chapter(s)</span>
						<span className="hidden xs:inline">•</span>
						<span>{totalLectures} lecture(s)</span>
						<span className="hidden xs:inline">•</span>
						<span className="w-full xs:w-auto">
							{totalDuration
								? (totalDuration / 3600).toFixed(1)
								: 0}{" "}
							hours total duration
						</span>
					</div>
				</div>

				<button
					onClick={handleToggleAll}
					className="text-primary font-bold text-sm hover:text-primary/80 transition-colors self-start md:self-auto bg-primary/5 px-3 py-1.5 rounded-lg md:bg-transparent md:p-0"
				>
					{isAllExpanded ? "Collapse All" : "Expand All"}
				</button>
			</div>

			{/* Accordion List */}
			<div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
				{modules.map((module, index) => {
					const isOpen = openSections.includes(module._id);

					return (
						<div
							key={module._id}
							className={cn(
								"border-gray-100",
								index !== modules.length - 1 ? "border-b" : "",
							)}
						>
							<button
								onClick={() => toggleSection(module._id)}
								className={cn(
									"w-full flex items-start justify-between p-4 transition-all duration-200",
									isOpen
										? "bg-gray-50"
										: "bg-white hover:bg-gray-50/80",
								)}
							>
								<div className="flex items-start gap-3 pr-2">
									<div className="mt-0.5 p-0.5 rounded-md border border-gray-300 shrink-0">
										{isOpen ? (
											<ChevronUp size={14} />
										) : (
											<ChevronDown size={14} />
										)}
									</div>
									<span className="font-semibold text-[#1D2939] text-sm md:text-base text-left leading-tight">
										{module.title}
									</span>
								</div>
								<div className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-wider shrink-0 mt-1">
									{module.lessonIds?.length || 0} LECTURES
								</div>
							</button>

							<AnimatePresence initial={false}>
								{isOpen && (
									<motion.div
										initial={{ height: 0 }}
										animate={{ height: "auto" }}
										exit={{ height: 0 }}
										transition={{
											duration: 0.3,
											ease: [0.4, 0, 0.2, 1],
										}}
										className="overflow-hidden"
									>
										<div className="px-4 pb-4 pt-0 bg-gray-50/50">
											<div className="space-y-1 bg-white rounded-lg border border-gray-100 p-2 md:p-3">
												{module.lessonIds?.map(
													(lesson: any) => (
														<div
															key={lesson._id}
															className="flex items-start justify-between p-2 rounded-md hover:bg-gray-50 transition-colors group cursor-default"
														>
															<div className="flex items-start gap-3 text-sm text-gray-600">
																<LockIcon
																	size={16}
																	className="text-primary mt-0.5 shrink-0"
																/>
																<span className="group-hover:text-black transition-colors leading-snug">
																	{
																		lesson.title
																	}
																</span>
															</div>
															<span className="text-[10px] md:text-xs text-gray-400 tabular-nums shrink-0 ml-4 mt-0.5">
																{/* Ideally pass lesson.duration here instead of totalDuration */}
																{lesson.duration
																	? (
																			lesson.duration /
																			60
																		).toFixed(
																			0,
																		)
																	: 0}{" "}
																min
															</span>
														</div>
													),
												)}
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>
		</div>
	);
}
