export const TABS = [
	"Overview",
	"Curriculum",
	"Instructor",
	"Reviews",
] as const;
export type Tab = (typeof TABS)[number];

export default function CourseTabNav({ activeTab, onChange }: Props) {
	return (
		<div className="flex justify-around border border-primary rounded-2xl mb-8 bg-white">
			{TABS.map((tab) => (
				<button
					key={tab}
					onClick={() => onChange(tab)}
					className={`
                  px-5 py-3 text-sm border-b-4 -mb-px cursor-pointer bg-transparent
                  transition-all duration-300 ease-in-out
                  ${
						activeTab === tab
							? "border-primary text-primary font-bold"
							: "border-transparent text-gray-700 hover:text-gray-900"
					}
               `}
				>
					{tab}
				</button>
			))}
		</div>
	);
}
