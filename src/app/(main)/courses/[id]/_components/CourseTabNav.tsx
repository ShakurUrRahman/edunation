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
			<div className="relative flex items-center overflow-x-auto scrollbar-hide border border-primary/20 rounded-2xl bg-white p-1 md:p-1.5 shadow-sm">
				{/* Sliding Background */}
				<div
					className="absolute top-1 bottom-1 rounded-xl bg-primary transition-all duration-300 ease-in-out"
					style={{
						width: `calc((100% - 8px) / ${TABS.length})`, // subtract p-1 (4px each side = 8px) on mobile
						left: `calc(4px + ${activeIndex} * (100% - 8px) / ${TABS.length})`,
					}}
				/>

				{TABS.map((tab) => {
					const isActive = activeTab === tab;

					return (
						<button
							key={tab}
							onClick={() => onChange(tab)}
							className={`
                relative z-10 flex-1 min-w-[100px] md:min-w-0 px-4 py-2.5 md:py-3
                text-xs md:text-sm font-semibold
                transition-colors duration-300
                rounded-xl whitespace-nowrap
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
