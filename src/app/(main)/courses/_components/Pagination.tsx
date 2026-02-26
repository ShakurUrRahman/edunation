"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	// if (totalPages <= 1) return null;

	// Build smart page number list with ellipsis
	// e.g. [1, "...", 4, 5, 6, "...", 12]
	const getPageNumbers = (): (number | "...")[] => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}
		const pages: (number | "...")[] = [1];
		if (currentPage > 3) pages.push("...");
		for (
			let i = Math.max(2, currentPage - 1);
			i <= Math.min(totalPages - 1, currentPage + 1);
			i++
		) {
			pages.push(i);
		}
		if (currentPage < totalPages - 2) pages.push("...");
		pages.push(totalPages);
		return pages;
	};

	return (
		<div className="flex items-center justify-center gap-1.5 min-h-screen">
			{/* Prev */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="
          w-9 h-9 rounded-md
          border border-gray-200 bg-white
          flex items-center justify-center
          text-gray-500 cursor-pointer
          hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-colors duration-150
        "
				aria-label="Previous page"
			>
				<ChevronLeft className="w-4 h-4" />
			</button>

			{/* Page numbers */}
			{getPageNumbers().map((p, i) =>
				p === "..." ? (
					<span
						key={`ellipsis-${i}`}
						className="w-9 h-9 flex items-center justify-center text-sm text-gray-400"
					>
						…
					</span>
				) : (
					<button
						key={p}
						onClick={() => onPageChange(p)}
						className={`
              w-9 h-9 rounded-md text-sm font-medium
              border-none cursor-pointer
              transition-colors duration-150
              ${
					currentPage === p
						? "bg-primary text-white font-bold shadow-md shadow-primary/25"
						: "bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700"
				}
            `}
						aria-label={`Page ${p}`}
						aria-current={currentPage === p ? "page" : undefined}
					>
						{p}
					</button>
				),
			)}

			{/* Next */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="
          w-9 h-9 rounded-md
          bg-primary hover:bg-primary/90
          border-none
          flex items-center justify-center
          text-white cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-colors duration-150
        "
				aria-label="Next page"
			>
				<ChevronRight className="w-4 h-4" />
			</button>
		</div>
	);
}
