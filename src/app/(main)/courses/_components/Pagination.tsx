"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

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
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const current = Number(currentPage); // ← add these two
	const total = Number(totalPages);

	const getPageNumbers = (): (number | "...")[] => {
		if (total <= 5) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}
		const pages: (number | "...")[] = [1];
		if (current > 3) pages.push("...");
		for (
			let i = Math.max(2, current - 1);
			i <= Math.min(total - 1, current + 1);
			i++
		) {
			pages.push(i);
		}
		if (current < total - 2) pages.push("...");
		pages.push(total);
		return pages;
	};

	const handlePageChange = (page: number) => {
		window.scrollTo({ top: 0, behavior: "smooth" });

		// Preserve existing query params (category, search, sort etc.)
		const params = new URLSearchParams(searchParams.toString());

		if (page === 1) {
			params.delete("page"); // ← page 1 = clean URL /courses
		} else {
			params.set("page", String(page));
		}
		onPageChange(page);
		const query = params.toString();
		router.push(query ? `${pathname}?${query}` : pathname, {
			scroll: false,
		});
	};

	return (
		<div className="flex items-center justify-center gap-1.5">
			<button
				onClick={() => handlePageChange(current - 1)}
				disabled={current === 1}
				className="w-9 h-9 rounded-md border border-gray-200 bg-white flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
				aria-label="Previous page"
			>
				<ChevronLeft className="w-4 h-4" />
			</button>

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
						onClick={() => handlePageChange(p as number)}
						className={`w-9 h-9 rounded-md text-sm font-medium border-none cursor-pointer transition-colors duration-150 ${
							current === p
								? "bg-primary text-white font-bold shadow-md shadow-primary/25"
								: "bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700"
						}`}
						aria-label={`Page ${p}`}
						aria-current={current === p ? "page" : undefined}
					>
						{p}
					</button>
				),
			)}

			<button
				onClick={() => handlePageChange(current + 1)}
				disabled={current === total}
				className="w-9 h-9 rounded-md bg-primary hover:bg-primary/90 border-none flex items-center justify-center text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
				aria-label="Next page"
			>
				<ChevronRight className="w-4 h-4" />
			</button>
		</div>
	);
}
