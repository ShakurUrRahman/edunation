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

// ── Avg rating from testimonials ─────────────────────────────────────────────
function getAvgRating(course: any): number {
	if (!course.testimonials?.length) return 0;
	return (
		course.testimonials.reduce(
			(sum: number, t: any) => sum + (t.rating ?? 0),
			0,
		) / course.testimonials.length
	);
}

export default function CoursesClient({ courses, categories, loggedInUser }) {
	const [viewMode, setViewMode] = useState("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	// ── Price range ──────────────────────────────────────────────────────────────
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

	// ── Live rating counts for the sidebar (based on ALL courses, not filtered) ──
	// Shows how many courses have floor(avgRating) === star
	const ratingCounts = useMemo(() => {
		const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
		courses.forEach((course: any) => {
			const floor = Math.floor(getAvgRating(course));
			if (floor >= 1 && floor <= 5) counts[floor]++;
		});
		return counts;
	}, [courses]);

	// ── Handlers ─────────────────────────────────────────────────────────────────
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

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	const handleSort = (option: string) => {
		setSortOption(option);
		setCurrentPage(1);
	};

	// ── 1. Filter ────────────────────────────────────────────────────────────────
	const filteredCourses = useMemo(() => {
		return courses.filter((course: any) => {
			// Category
			if (
				selectedCategories.length > 0 &&
				!selectedCategories.includes(course.category?.id)
			)
				return false;

			// Price
			const price = course.price ?? 0;
			if (price < appliedRange[0] || price > appliedRange[1])
				return false;

			// Search — title, description, or instructor full name
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

			// Average rating filter — floor(avg) must match one of selectedRatings
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

	// ── 2. Sort ──────────────────────────────────────────────────────────────────
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
			// "popular" = highest average rating (most average rated)
			case "popular":
				return copy.sort((a, b) => getAvgRating(b) - getAvgRating(a));
			default:
				return copy;
		}
	}, [filteredCourses, sortOption]);

	// ── 3. Paginate ──────────────────────────────────────────────────────────────
	const totalPages = Math.max(
		1,
		Math.ceil(sortedCourses.length / ITEMS_PER_PAGE),
	);
	const paginatedCourses = sortedCourses.slice(
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
					totalCourses={sortedCourses.length}
				/>
				<div className="flex items-center gap-2.5">
					<SearchBox onSearch={handleSearch} />
					<SortCourse
						sortOption={sortOption}
						setSortOption={handleSort}
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
					{/* Pass live counts and lifted state */}
					<AverageRatingFilter
						selectedRatings={selectedRatings}
						setSelectedRatings={setSelectedRatings}
						ratingCounts={ratingCounts}
					/>
					<RecentCourses />
					<PopularTags
						selectedTags={selectedTags}
						onTagChange={setSelectedTags}
					/>
				</aside>

				<div>
					<div
						className={`grid gap-5 mb-8 ${
							viewMode === "grid" ? "grid-cols-2" : "grid-cols-1"
						}`}
					>
						{paginatedCourses.length > 0 ? (
							paginatedCourses.map((course) => (
								<CourseCard
									key={course.id}
									course={course}
									loggedInUser={loggedInUser}
								/>
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
