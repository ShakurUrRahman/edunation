"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Check } from "lucide-react";

const SORT_OPTIONS = [
	{ label: "Price: Low to High", value: "price-asc" },
	{ label: "Price: High to Low", value: "price-desc" },
	{ label: "Latest", value: "latest" },
	{ label: "Popular", value: "popular" },
];

interface SortCourseProps {
	sortOption?: string;
	setSortOption?: (value: string) => void;
}

const SortCourse = ({ sortOption, setSortOption }: SortCourseProps) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(sortOption ?? "");
	const containerRef = useRef<HTMLDivElement>(null);

	const selectedLabel = SORT_OPTIONS.find((o) => o.value === selected)?.label;

	// Close when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Close on Escape
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, []);

	const handleSelect = (value: string) => {
		setSelected(value);
		setSortOption?.(value);
		setOpen(false);
	};

	return (
		<div ref={containerRef} className="relative">
			{/* Trigger */}
			<button
				onClick={() => setOpen((prev) => !prev)}
				className="
          h-9 w-[180px]
          flex items-center gap-2
          px-3
          bg-gray-100 border border-gray-200 rounded-md
          text-sm font-semibold text-gray-600
          shadow-sm
          hover:border-gray-300 hover:bg-gray-50
          focus:outline-none focus:border-primary
          transition-colors duration-200
          cursor-pointer
        "
			>
				<ArrowUpDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
				<span className="flex-1 text-left truncate">
					{selectedLabel ?? "Sort By"}
				</span>
			</button>

			{/* Dropdown */}
			{open && (
				<div
					className="
            absolute top-full left-0 mt-1.5 z-50
            w-[180px]
            bg-gray-100
            border border-gray-200
            rounded-xl
            shadow-xl
            p-1
          "
				>
					{SORT_OPTIONS.map((option) => {
						const isActive = selected === option.value;
						return (
							<button
								key={option.value}
								onClick={() => handleSelect(option.value)}
								className={`
                  w-full flex items-center justify-between
                  px-3 py-2 rounded-md
                  text-sm font-medium text-left
                  cursor-pointer border-none
                  transition-colors duration-150
                  ${
						isActive
							? "bg-[#e8f4f0] text-primary font-semibold"
							: "text-gray-600 hover:bg-[#e8f4f0] hover:text-primary"
					}
                `}
							>
								{option.label}
								{isActive && (
									<Check className="h-3.5 w-3.5 shrink-0" />
								)}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default SortCourse;
