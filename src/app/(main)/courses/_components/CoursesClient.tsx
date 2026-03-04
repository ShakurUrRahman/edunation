"use client";

import { useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import ViewMode from "./ViewMode";
import SearchBox from "./SearchBox";
import SortCourse from "./SortCourse";
import ActiveFilters from "./ActiveFilters";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import AverageRatingFilter from "./AverageRatingFilter";
import RecentCourses from "./RecentCourses";
import PopularTags from "./PopularTags";
import Pagination from "./Pagination";
import CourseCard from "./CourseCard";

const ITEMS_PER_PAGE = 8;

function getAvgRating(course: any): number {
	if (!course.testimonials?.length) return 0;
	return (
		course.testimonials.reduce(
			(sum: number, t: any) => sum + (t.rating ?? 0),
			0,
		) / course.testimonials.length
	);
}

export default function CoursesClient({
	courses,
	categories,
	loggedInUser,
	initialCategoryId,
}) {
	const [viewMode, setViewMode] = useState("grid");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>(
		initialCategoryId ? [initialCategoryId] : [],
	);
	const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	const router = useRouter();
	const pathname = usePathname();

	const minPrice = useMemo(
		() => Math.min(...courses.map((c) => c.price ?? 0)),
		[courses],
	);
	const maxPrice = useMemo(
		() => Math.max(...courses.map((c) => c.price ?? 0), 0),
		[courses],
	);
	const [appliedRange, setAppliedRange] = useState<[number, number]>([
		minPrice,
		maxPrice,
	]);

	const ratingCounts = useMemo(() => {
		const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
		courses.forEach((course: any) => {
			const floor = Math.floor(getAvgRating(course));
			if (floor >= 1 && floor <= 5) counts[floor]++;
		});
		return counts;
	}, [courses]);

	// ── Handlers ─────────────────────────────────────────────────────────────
	const removeFilter = (id: string) =>
		setSelectedCategories((prev) => prev.filter((c) => c !== id));

	const handleCategoryChange = (updater) => {
		const next: string[] =
			typeof updater === "function"
				? updater(selectedCategories)
				: updater;
		setSelectedCategories(next);
		setCurrentPage(1);

		const params = new URLSearchParams();
		if (next.length === 1) {
			const cat = categories.find((c) => c.id === next[0]);
			if (cat?.title) {
				const slug = cat.title
					.toLowerCase()
					.replace(/\s+/g, "-")
					.replace(/[^a-z0-9-]/g, "");
				params.set("category", slug);
			}
		}
		const query = params.toString();
		router.push(query ? `${pathname}?${query}` : pathname, {
			scroll: false,
		});
	};

	const toggleCategory = (val: string) => {
		handleCategoryChange((prev: string[]) =>
			prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val],
		);
	};

	const handleApplyPrice = (range: [number, number]) => {
		setAppliedRange(range);
		setCurrentPage(1);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	const handleSort = (option: string) => {
		setSortOption(option);
		setCurrentPage(1);
	};

	// ── Filter ────────────────────────────────────────────────────────────────
	const filteredCourses = useMemo(() => {
		return courses.filter((course: any) => {
			if (
				selectedCategories.length > 0 &&
				!selectedCategories.includes(course.category?.id)
			)
				return false;

			const price = course.price ?? 0;
			if (price < appliedRange[0] || price > appliedRange[1])
				return false;

			if (searchQuery.trim() !== "") {
				const q = searchQuery.toLowerCase();
				const matchesTitle = course.title?.toLowerCase().includes(q);
				const matchesDescription = course.description
					?.toLowerCase()
					.includes(q);
				const matchesInstructor =
					`${course.instructor?.firstName ?? ""} ${course.instructor?.lastName ?? ""}`
						.toLowerCase()
						.includes(q);
				if (!matchesTitle && !matchesDescription && !matchesInstructor)
					return false;
			}

			if (selectedRatings.length > 0) {
				const floor = Math.floor(getAvgRating(course));
				if (!selectedRatings.includes(floor)) return false;
			}

			return true;
		});
	}, [
		courses,
		selectedCategories,
		appliedRange,
		searchQuery,
		selectedRatings,
	]);

	// ── Sort ──────────────────────────────────────────────────────────────────
	const sortedCourses = useMemo(() => {
		const copy = [...filteredCourses];
		switch (sortOption) {
			case "price-asc":
				return copy.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
			case "price-desc":
				return copy.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
			case "latest":
				return copy.sort(
					(a, b) =>
						new Date(b.createdOn ?? 0).getTime() -
						new Date(a.createdOn ?? 0).getTime(),
				);
			case "popular":
				return copy.sort((a, b) => getAvgRating(b) - getAvgRating(a));
			default:
				return copy;
		}
	}, [filteredCourses, sortOption]);

	// ── Paginate ──────────────────────────────────────────────────────────────
	const totalPages = Math.max(
		1,
		Math.ceil(sortedCourses.length / ITEMS_PER_PAGE),
	);
	const paginatedCourses = sortedCourses.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	// ── Shared sidebar filters ────────────────────────────────────────────────
	const SidebarContent = (
		<div className="space-y-5">
			<CategoryFilter
				categories={categories}
				courses={courses}
				toggleCategory={toggleCategory}
				selectedCategories={selectedCategories}
				setSelectedCategories={handleCategoryChange}
			/>
			<PriceFilter
				minPrice={minPrice}
				maxPrice={maxPrice}
				appliedRange={appliedRange}
				onApply={handleApplyPrice}
			/>
			<AverageRatingFilter
				selectedRatings={selectedRatings}
				setSelectedRatings={setSelectedRatings}
				ratingCounts={ratingCounts}
			/>
			<div className="hidden lg:block">
				<RecentCourses />
			</div>
			<PopularTags
				selectedTags={selectedTags}
				onTagChange={setSelectedTags}
			/>
		</div>
	);

	return (
		<div>
			{/* ── Top bar ──────────────────────────────────────────────────── */}
			<div className="flex sm:flex-row md:flex-col justify-between lg:flex-row gap-3 mb-6">
				{/* Row 1: view mode left | sort + filter-toggle right */}
				<div className="flex items-center justify-between gap-2">
					<ViewMode
						viewMode={viewMode}
						setViewMode={setViewMode}
						totalCourses={sortedCourses.length}
					/>
					<div>
						<button
							onClick={() => setIsFilterOpen(true)}
							className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
						>
							<SlidersHorizontal size={15} />
							<span className="hidden sm:inline">Filters</span>
						</button>
					</div>
				</div>
				<div className="sm:flex gap-2 space-y-2">
					{/* Row 2: search full width */}
					<SearchBox onSearch={handleSearch} />
					<div className="flex items-center gap-2 shrink-0">
						<SortCourse
							sortOption={sortOption}
							setSortOption={handleSort}
						/>
						{/* Mobile filter toggle — hidden on desktop */}
					</div>
				</div>
			</div>

			{/* ── Active filter pills ───────────────────────────────────────── */}
			<div className="mb-6">
				<ActiveFilters
					categories={categories}
					selectedCategories={selectedCategories}
					selectedRatings={selectedRatings}
					selectedTags={selectedTags}
					removeFilter={removeFilter}
				/>
			</div>

			{/* ── Main layout ───────────────────────────────────────────────── */}
			<div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-8">
				{/* Desktop sidebar — hidden on mobile */}
				<aside className="hidden lg:block shrink-0">
					{SidebarContent}
				</aside>

				{/* Mobile drawer backdrop */}
				{isFilterOpen && (
					<div
						className="fixed inset-0 bg-black/50 z-40 lg:hidden"
						onClick={() => setIsFilterOpen(false)}
					/>
				)}

				{/* Mobile drawer */}
				<div
					className={`
						fixed top-0 left-0 h-full w-[290px] z-100
						bg-white shadow-2xl overflow-y-auto
						transition-transform duration-300 ease-in-out
						lg:hidden
						${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
					`}
				>
					{/* Drawer header */}
					<div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b bg-white z-10">
						<h2 className="text-base font-bold text-gray-900">
							Filters
						</h2>
						<button
							onClick={() => setIsFilterOpen(false)}
							className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
						>
							<X size={18} />
						</button>
					</div>

					{/* Drawer filters */}
					<div className="p-5">{SidebarContent}</div>

					{/* Sticky show results */}
					<div className="sticky bottom-0 p-4 bg-white border-t">
						<button
							onClick={() => setIsFilterOpen(false)}
							className="w-full py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
						>
							Show {sortedCourses.length} Results
						</button>
					</div>
				</div>

				{/* ── Course grid ───────────────────────────────────────────── */}
				<div className="flex-1 min-w-0">
					{paginatedCourses.length > 0 ? (
						<div
							className={`grid gap-5 mb-8 ${
								viewMode === "grid"
									? "grid-cols-1 sm:grid-cols-2"
									: "grid-cols-1"
							}`}
						>
							{paginatedCourses.map((course) => (
								<CourseCard
									key={course.id}
									course={course}
									loggedInUser={loggedInUser}
									viewMode={viewMode}
								/>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-24 text-gray-400">
							<svg
								width="44"
								height="44"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								className="mb-3 opacity-40"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.35-4.35" />
							</svg>
							<p className="text-sm font-medium">
								{searchQuery
									? `No courses found for "${searchQuery}"`
									: "No courses found"}
							</p>
							<p className="text-xs mt-1 text-gray-300">
								Try adjusting your filters
							</p>
						</div>
					)}

					<div className="mt-6 border-t pt-6">
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={setCurrentPage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
