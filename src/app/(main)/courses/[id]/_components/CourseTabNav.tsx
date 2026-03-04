"use client";

import { useMemo } from "react";

export const TABS = [
	"Overview",
	"Curriculum",
	"Instructor",
	"Reviews",
] as const;

export type Tab = (typeof TABS)[number];

interface Props {
	activeTab: Tab;
	onChange: (tab: Tab) => void;
}

export default function CourseTabNav({ activeTab, onChange }: Props) {
	const activeIndex = useMemo(
		() => TABS.findIndex((tab) => tab === activeTab),
		[activeTab],
	);

	return (
		<div className="w-full mb-8">
			<div
				className="relative flex items-center border border-primary/20 rounded-2xl bg-white shadow-sm p-1 md:p-1.5"
				// Expose padding as CSS var so the slider math is always exact
				style={{ "--pad": "4px" } as React.CSSProperties}
			>
				{/* Sliding background */}
				<div
					className="absolute rounded-xl bg-primary transition-all duration-300 ease-in-out"
					style={{
						top: "var(--pad, 4px)",
						bottom: "var(--pad, 4px)",
						width: `calc((100% - var(--pad, 4px) * 2) / ${TABS.length})`,
						left: `calc(var(--pad, 4px) + ${activeIndex} * (100% - var(--pad, 4px) * 2) / ${TABS.length})`,
					}}
				/>

				{TABS.map((tab) => {
					const isActive = activeTab === tab;
					return (
						<button
							key={tab}
							onClick={() => onChange(tab)}
							className={`
                relative z-10 flex-1 py-2.5 md:py-3
                text-xs md:text-sm font-semibold
                transition-colors duration-300 rounded-xl
                whitespace-nowrap text-center
                ${isActive ? "text-white" : "text-gray-500 hover:text-primary"}
              `}
						>
							{tab}
						</button>
					);
				})}
			</div>
		</div>
	);
}
