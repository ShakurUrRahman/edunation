"use client";

import { LayoutGrid, List } from "lucide-react";

export default function ViewMode({ viewMode, setViewMode, totalCourses = 25 }) {
	return (
		<div className="md:flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 hidden">
			<div className="flex items-center gap-3">
				{/* Toggle Container */}
				<div className="flex border border-gray-200 rounded-md overflow-hidden shadow-sm shrink-0">
					<button
						onClick={() => setViewMode("grid")}
						className={`
                     flex items-center gap-1.5 px-3 py-2 text-sm font-semibold
                     border-none cursor-pointer transition-colors duration-200
                     ${
							viewMode === "grid"
								? "bg-primary text-white"
								: "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"
						}
                  `}
						title="Grid View"
					>
						<LayoutGrid className="h-4 w-4" />
						{/* Hide text on mobile, show on small screens and up */}
						<span className="hidden xs:inline">Grid</span>
					</button>

					{/* Divider */}
					<div className="w-px bg-gray-200" />

					<button
						onClick={() => setViewMode("list")}
						className={`
                     flex items-center gap-1.5 px-3 py-2 text-sm font-semibold
                     border-none cursor-pointer transition-colors duration-200
                     ${
							viewMode === "list"
								? "bg-primary text-white"
								: "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"
						}
                  `}
						title="List View"
					>
						<List className="h-4 w-4" />
						<span className="hidden xs:inline">List</span>
					</button>
				</div>

				{/* Mobile Result Count (Shown only on small screens) */}
				<span className="text-sm text-gray-500 sm:hidden">
					<strong className="text-primary font-bold">
						{totalCourses}
					</strong>{" "}
					Courses
				</span>
			</div>

			{/* Desktop Result Count (Hidden on mobile, shown from 'sm' breakpoint) */}
			<span className="hidden sm:inline text-sm text-gray-500 whitespace-nowrap">
				We Found{" "}
				<strong className="text-primary font-bold">
					{totalCourses}
				</strong>{" "}
				Course(s) Available For you
			</span>
		</div>
	);
}
