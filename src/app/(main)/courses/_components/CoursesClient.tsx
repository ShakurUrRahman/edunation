"use client";

import { useState, useMemo } from "react";
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

export default function CoursesClient({ courses, categories }) {
	const [viewMode, setViewMode] = useState("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	// ── Price range ───────────────────────────────────────────────────────────
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

	// ── Helpers ───────────────────────────────────────────────────────────────
	const toggleCategory = (val: string) =>
		setSelectedCategories((prev) =>
			prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val],
		);

	const removeFilter = (id: string) =>
		setSelectedCategories((prev) => prev.filter((c) => c !== id));

	const handleCategoryChange = (updater) => {
		setSelectedCategories(updater);
		setCurrentPage(1);
	};

	const handleApplyPrice = (range: [number, number]) => {
		setAppliedRange(range);
		setCurrentPage(1);
	};

	// SearchBox calls this after debounce — resets to page 1
	const handleSearch = (query: string) => {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	// ── Combined filter ───────────────────────────────────────────────────────
	const filteredCourses = courses.filter((course) => {
		// 1. Category
		if (
			selectedCategories.length > 0 &&
			!selectedCategories.includes(course.category?.id)
		)
			return false;

		// 2. Price range
		const price = course.price ?? 0;
		if (price < appliedRange[0] || price > appliedRange[1]) return false;

		// 3. Search — matches title, description, or instructor name
		if (searchQuery.trim() !== "") {
			const q = searchQuery.toLowerCase();
			const matchesTitle = course.title?.toLowerCase().includes(q);
			const matchesDescription = course.description
				?.toLowerCase()
				.includes(q);
			const matchesInstructor = course.instructor?.name
				?.toLowerCase()
				.includes(q);
			if (!matchesTitle && !matchesDescription && !matchesInstructor)
				return false;
		}

		return true;
	});

	// ── Pagination ────────────────────────────────────────────────────────────
	const totalPages = Math.max(
		1,
		Math.ceil(filteredCourses.length / ITEMS_PER_PAGE),
	);
	const paginatedCourses = filteredCourses.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	return (
		<>
			{/* Top bar */}
			<div className="flex items-center justify-between flex-wrap gap-3 mb-5">
				<ViewMode
					viewMode={viewMode}
					setViewMode={setViewMode}
					totalCourses={filteredCourses.length}
				/>
				<div className="flex items-center gap-2.5">
					{/* onSearch receives the debounced value from SearchBox */}
					<SearchBox onSearch={handleSearch} />
					<SortCourse
						sortOption={sortOption}
						setSortOption={setSortOption}
					/>
				</div>
			</div>

			{/* Active filter pills */}
			<ActiveFilters
				categories={categories}
				selectedCategories={selectedCategories}
				selectedRatings={selectedRatings}
				selectedTags={selectedTags}
				removeFilter={removeFilter}
			/>

			{/* Two-column layout */}
			<div className="grid grid-cols-[260px_1fr] gap-7">
				<aside>
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
					/>
					<RecentCourses />
					<PopularTags
						selectedTags={selectedTags}
						onTagChange={setSelectedTags}
					/>
				</aside>

				<div>
					<div
						className={`grid gap-5 mb-8 ${viewMode === "grid" ? "grid-cols-2" : "grid-cols-1"}`}
					>
						{paginatedCourses.length > 0 ? (
							paginatedCourses.map((course) => (
								<CourseCard key={course.id} course={course} />
							))
						) : (
							<div className="col-span-2 flex flex-col items-center justify-center py-20 text-gray-400">
								<svg
									width="48"
									height="48"
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
								<p className="text-xs mt-1">
									Try adjusting your filters
								</p>
							</div>
						)}
					</div>

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>
		</>
	);
}
