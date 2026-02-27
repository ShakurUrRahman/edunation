"use client";

interface Category {
	id: string;
	title: string;
	thumbnail?: string;
}

interface Course {
	id: string;
	category?: { id: string };
	[key: string]: any;
}

interface CategoryFilterProps {
	categories: Category[];
	courses: Course[];
	selectedCategories: string[];
	toggleCategory: (id: string) => void;
}

export default function CategoryFilter({
	categories,
	courses,
	selectedCategories,
	toggleCategory,
}: CategoryFilterProps) {
	return (
		<div className="bg-white rounded-xl p-5 mb-5 shadow-sm">
			<h4 className="text-base font-bold mb-3.5 text-[#1a1a2e]">
				Category
			</h4>

			<ul className="m-0 p-0 list-none">
				{categories.map((cat) => {
					const active = selectedCategories.includes(cat.id);

					// Derive count from courses — same pattern as homepage tabs
					const count = courses.filter(
						(course) => course.category?.id === cat.id,
					).length;

					// Hide categories with no courses

					return (
						<li
							key={cat.id}
							onClick={() => toggleCategory(cat.id)}
							className={`
                flex items-center justify-between
                px-3 py-2.5 rounded-md mb-1
                cursor-pointer text-sm
                transition-colors duration-150 select-none
                ${
					active
						? "bg-primary text-white font-semibold"
						: "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
				}
              `}
						>
							<span>{cat.title}</span>

							{/* Course count badge — replaces thumbnail */}
							<span
								className={`
                  rounded px-1.5 py-0.5 text-[11px] font-semibold
                  ${
						active
							? "bg-white/20 text-white"
							: "bg-gray-100 text-gray-400"
					}
                `}
							>
								{String(count).padStart(2, "0")}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
