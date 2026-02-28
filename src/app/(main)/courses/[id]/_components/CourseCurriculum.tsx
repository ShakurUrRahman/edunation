"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function CourseCurriculum({
	modules,
	totalDuration,
}: {
	modules: any[];
	totalDuration: number;
}) {
	const [openSections, setOpenSections] = useState<string[]>([]);

	// Calculate total lectures across all modules
	const totalLectures = modules?.reduce(
		(acc, m) => acc + (m.lessonIds?.length || 0),
		0,
	);

	// Determine if all sections are currently expanded
	const isAllExpanded =
		modules.length > 0 && openSections.length === modules.length;

	const toggleSection = (id: string) => {
		setOpenSections((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		);
	};

	// Toggle between expanding all and collapsing all
	const handleToggleAll = () => {
		if (isAllExpanded) {
			setOpenSections([]); // Close all
		} else {
			setOpenSections(modules.map((m) => m._id)); // Expand all
		}
	};

	return (
		<div className=" p-6 border border-primary rounded-2xl shadow-sm">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
				<div>
					<h2 className="text-2xl font-bold mb-6">Course Content</h2>
					<div className="flex items-center text-gray-500 text-sm gap-2">
						<span>{modules?.length} chapter(s)</span>
						<span>•</span>
						<span>{totalLectures} lecture(s)</span>
						<span>•</span>
						<span>
							{totalDuration
								? (totalDuration / 3600).toPrecision(2)
								: 0}{" "}
							hours total length
						</span>
					</div>
				</div>

				{/* Dynamic Button Text */}
				<button
					onClick={handleToggleAll}
					className="text-primary font-semibold text-sm hover:underline self-start md:self-center"
				>
					{isAllExpanded
						? "Collapse All Sections"
						: "Expand All Sections"}
				</button>
			</div>

			{/* Accordion List */}
			<div className="border border-gray-200 rounded-2xl overflow-hidden">
				{modules.map((module, index) => {
					const isOpen = openSections.includes(module._id);

					return (
						<div
							key={module._id}
							className={`${index !== modules.length - 1 ? "border-b" : ""} border-gray-100`}
						>
							<button
								onClick={() => toggleSection(module._id)}
								className={`w-full flex items-center justify-between p-4 transition-colors ${
									isOpen
										? "bg-gray-50"
										: "bg-white hover:bg-gray-50"
								}`}
							>
								<div className="flex items-center gap-3">
									<div className="p-1 rounded-full border border-gray-300">
										{isOpen ? (
											<ChevronUp size={14} />
										) : (
											<ChevronDown size={14} />
										)}
									</div>
									<span className="font-semibold text-[#1D2939] text-left">
										{module.title}
									</span>
								</div>
								<div className="text-sm text-gray-500">
									{module.lessonIds?.length || 0} lectures
								</div>
							</button>

							<AnimatePresence>
								{isOpen && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{
											duration: 0.3,
											ease: "easeInOut",
										}}
										className="overflow-hidden bg-gray-50/50"
									>
										<div className="p-4 bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-1">
											<div className="space-y-3">
												{module.lessonIds?.map(
													(lesson: any) => (
														<div
															key={lesson._id}
															className="flex items-center justify-between group"
														>
															<div className="flex items-center gap-3 text-sm text-gray-600">
																<PlayCircle
																	size={16}
																	className="text-[#005F5F]"
																/>
																<span className="group-hover:text-black transition-colors">
																	{
																		lesson.title
																	}
																</span>
															</div>
															<span className="text-xs text-gray-400">
																{(
																	totalDuration /
																	3600
																).toPrecision(
																	2,
																)}{" "}
																hours
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
