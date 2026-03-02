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
		<div className="w-full mb-8">
			{/* Container Logic:
        - overflow-x-auto: Allows swiping on mobile
        - no-scrollbar: (Optional utility) to keep it clean
        - md:justify-around: Centers/spreads them on larger screens
      */}
			<div className="flex items-center overflow-x-auto scrollbar-hide border border-primary/20 rounded-2xl bg-white p-1 md:p-1.5 shadow-sm">
				{TABS.map((tab) => {
					const isActive = activeTab === tab;

					return (
						<button
							key={tab}
							onClick={() => onChange(tab)}
							className={`
                relative flex-1 min-w-[100px] md:min-w-0 px-4 py-2.5 md:py-3 
                text-xs md:text-sm font-semibold transition-all duration-300 
                rounded-xl cursor-pointer whitespace-nowrap
                ${
					isActive
						? "bg-primary text-white shadow-md shadow-primary/20"
						: "text-gray-500 hover:text-primary hover:bg-primary/5"
				}
              `}
						>
							{tab}

							{/* Subtle active indicator for mobile if not using full background color */}
							{isActive && (
								<span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full md:hidden" />
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
