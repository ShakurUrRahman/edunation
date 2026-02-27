"use client";

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
	return (
		<div className="flex border-b border-gray-200 mb-8 bg-white">
			{TABS.map((tab) => (
				<button
					key={tab}
					onClick={() => onChange(tab)}
					className={`
            px-5 py-3 text-sm font-semibold
            border-b-2 -mb-px
            cursor-pointer border-none bg-transparent
            transition-colors duration-150
            ${
				activeTab === tab
					? "border-primary text-primary"
					: "border-transparent text-gray-500 hover:text-gray-700"
			}
          `}
				>
					{tab}
				</button>
			))}
		</div>
	);
}
