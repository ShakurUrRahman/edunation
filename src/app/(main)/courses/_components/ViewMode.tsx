"use client";

import { LayoutGrid, List } from "lucide-react";

export default function ViewMode({ viewMode, setViewMode, totalCourses = 25 }) {
	return (
		<div className="flex items-center gap-3">
			{/* Toggle */}
			<div className="flex border border-gray-200 rounded-md overflow-hidden shadow-sm">
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
				>
					<LayoutGrid className="h-3.5 w-3.5" />
					Grid
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
				>
					<List className="h-3.5 w-3.5" />
					List
				</button>
			</div>

			{/* Result count */}
			<span className="text-sm text-gray-500">
				We Found{" "}
				<strong className="text-primary font-bold">
					{totalCourses}
				</strong>{" "}
				Courses Available For you
			</span>
		</div>
	);
}
