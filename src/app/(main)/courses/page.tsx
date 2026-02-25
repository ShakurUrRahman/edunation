"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";

import { ArrowRight } from "lucide-react";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SearchCourse from "./_components/SearchCourse";
import SortCourse from "./_components/SortCourse";
import FilterCourseMobile from "./_components/FilterCourseMobile";
import ActiveFilters from "./_components/ActiveFilters";
import FilterCourse from "./_components/FilterCourse";

import { getCourseList } from "@/queries/courses";
// import CourseCard from "./_components/CourseCard";

import { use, useState } from "react";

const CATEGORY_OPTIONS = [
	{ id: 1, label: "Business", value: "business", count: "06" },
	{ id: 2, label: "Education", value: "education", count: "07" },
	{ id: 3, label: "Family & Divorce", value: "family", count: "09" },
	{ id: 4, label: "Online Marketing", value: "marketing", count: "06" },
	{ id: 5, label: "Islamic", value: "islamic", count: "05" },
	{ id: 6, label: "Quran", value: "quran", count: "08" },
	{ id: 7, label: "Resources", value: "resources", count: "06" },
	{ id: 8, label: "Web Design", value: "web-design", count: "06" },
];

const RATING_OPTIONS = [5, 4, 3, 2, 1];

const SAMPLE_COURSES = [
	{
		id: 1,
		title: "Design Thinking Researching for Better UX",
		instructor: "Samantha",
		avatar: "https://i.pravatar.cc/32?img=1",
		thumbnail:
			"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=240&fit=crop",
		originalPrice: 20,
		price: 9,
		rating: 3.5,
		reviews: "4.7/5 Customer Rating",
		lessons: 20,
		students: 50,
	},
	{
		id: 2,
		title: "Discover Highly Rated Learning Programs",
		instructor: "Samantha",
		avatar: "https://i.pravatar.cc/32?img=2",
		thumbnail:
			"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=240&fit=crop",
		originalPrice: 20,
		price: 9,
		rating: 3.5,
		reviews: "4.7/5 Customer Rating",
		lessons: 20,
		students: 50,
	},
	{
		id: 3,
		title: "Boost Your Skills with Popular Course",
		instructor: "Samantha",
		avatar: "https://i.pravatar.cc/32?img=3",
		thumbnail:
			"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=240&fit=crop",
		originalPrice: 20,
		price: 9,
		rating: 3.5,
		reviews: "4.7/5 Customer Rating",
		lessons: 20,
		students: 50,
	},
	{
		id: 4,
		title: "Learn from the Best – Student Favorite Programs",
		instructor: "Samantha",
		avatar: "https://i.pravatar.cc/32?img=4",
		thumbnail:
			"https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=240&fit=crop",
		originalPrice: 20,
		price: 9,
		rating: 3.5,
		reviews: "4.7/5 Customer Rating",
		lessons: 20,
		students: 50,
	},
	{
		id: 5,
		title: "Upgrade Your Knowledge with Expert Courses",
		instructor: "Samantha",
		avatar: "https://i.pravatar.cc/32?img=5",
		thumbnail:
			"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=240&fit=crop",
		originalPrice: 20,
		price: 9,
		rating: 3.5,
		reviews: "4.7/5 Customer Rating",
		lessons: 20,
		students: 50,
	},
	{
		id: 6,
		title: "Discover Highly Rated Learning Programs",
		instructor: "Samantha",
		avatar: "https://i.pravatar.cc/32?img=6",
		thumbnail:
			"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=240&fit=crop",
		originalPrice: 20,
		price: 9,
		rating: 3.5,
		reviews: "4.7/5 Customer Rating",
		lessons: 20,
		students: 50,
	},
	{
		id: 7,
		title: "First Aid and Child Safety Essentials Course",
		instructor: "Samantha",
		avatar: "https://i.pravatar.cc/32?img=7",
		thumbnail:
			"https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&h=240&fit=crop",
		originalPrice: 20,
		price: 9,
		rating: 3.5,
		reviews: "4.7/5 Customer Rating",
		lessons: 20,
		students: 50,
	},
	{
		id: 8,
		title: "Boost Your Skills with Popular Courses",
		instructor: "Samantha",
		avatar: "https://i.pravatar.cc/32?img=8",
		thumbnail:
			"https://images.unsplash.com/photo-1555431189-0fabf2667795?w=400&h=240&fit=crop",
		originalPrice: 20,
		price: 9,
		rating: 3.5,
		reviews: "4.7/5 Customer Rating",
		lessons: 20,
		students: 50,
	},
];

const RECENT_PRODUCTS = [
	{
		id: 1,
		title: "Powerstroke Engines Turbo Air Products",
		img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&h=60&fit=crop",
	},
	{
		id: 2,
		title: "Powerstroke Engines Turbo Air Products",
		img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=60&h=60&fit=crop",
	},
	{
		id: 3,
		title: "Powerstroke Engines Turbo Air Products",
		img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=60&fit=crop",
	},
	{
		id: 4,
		title: "Powerstroke Engines Turbo Air Products",
		img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=60&h=60&fit=crop",
	},
];

const POPULAR_TAGS = [
	"Business",
	"Education",
	"Students",
	"Art",
	"Mission",
	"School",
	"Tech",
	"Development",
	"UI/UX Design",
	"Kutest",
];

function StarRating({ rating, total = 5 }) {
	return (
		<div style={{ display: "flex", gap: 2 }}>
			{[1, 2, 3, 4, 5].map((s) => (
				<svg
					key={s}
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill={
						s <= Math.floor(rating)
							? "#f5a623"
							: s - 0.5 <= rating
								? "url(#half)"
								: "#ddd"
					}
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient id="half">
							<stop offset="50%" stopColor="#f5a623" />
							<stop offset="50%" stopColor="#ddd" />
						</linearGradient>
					</defs>
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			))}
		</div>
	);
}

function CourseCard({ course }) {
	return (
		<div
			style={{
				background: "#fff",
				borderRadius: 8,
				overflow: "hidden",
				boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
				transition: "transform 0.2s, box-shadow 0.2s",
				cursor: "pointer",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = "translateY(-3px)";
				e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.13)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = "";
				e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
			}}
		>
			<div style={{ position: "relative", overflow: "hidden" }}>
				<img
					src={course.thumbnail}
					alt={course.title}
					style={{
						width: "100%",
						height: 170,
						objectFit: "cover",
						display: "block",
					}}
				/>
			</div>
			<div style={{ padding: "14px 14px 16px" }}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 8,
						marginBottom: 8,
					}}
				>
					<img
						src={course.avatar}
						alt={course.instructor}
						style={{
							width: 28,
							height: 28,
							borderRadius: "50%",
							objectFit: "cover",
						}}
					/>
					<div
						style={{
							display: "flex",
							gap: 8,
							alignItems: "center",
						}}
					>
						<span
							style={{
								fontSize: 12,
								color: "#999",
								textDecoration: "line-through",
							}}
						>
							${course.originalPrice}.00
						</span>
						<span
							style={{
								fontSize: 14,
								fontWeight: 700,
								color: "#2a9d5c",
							}}
						>
							${course.price}.00
						</span>
					</div>
				</div>
				<h3
					style={{
						fontSize: 14,
						fontWeight: 600,
						color: "#1a1a2e",
						lineHeight: 1.4,
						marginBottom: 8,
						fontFamily: "'Nunito Sans', sans-serif",
					}}
				>
					{course.title}
				</h3>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 6,
						marginBottom: 10,
					}}
				>
					<StarRating rating={course.rating} />
					<span style={{ fontSize: 11, color: "#888" }}>
						({course.reviews})
					</span>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 16,
						marginBottom: 12,
						borderTop: "1px solid #f0f0f0",
						paddingTop: 10,
					}}
				>
					<span
						style={{
							fontSize: 12,
							color: "#666",
							display: "flex",
							alignItems: "center",
							gap: 4,
						}}
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#888"
							strokeWidth="2"
						>
							<rect x="3" y="3" width="18" height="18" rx="2" />
							<path d="M3 9h18M9 21V9" />
						</svg>
						{course.lessons} Lessons
					</span>
					<span
						style={{
							fontSize: 12,
							color: "#666",
							display: "flex",
							alignItems: "center",
							gap: 4,
						}}
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#888"
							strokeWidth="2"
						>
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
							<circle cx="9" cy="7" r="4" />
							<path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
						</svg>
						{course.students} Students
					</span>
				</div>
				<button
					style={{
						width: "100%",
						padding: "9px 0",
						background: "#1a1a2e",
						color: "#fff",
						border: "none",
						borderRadius: 5,
						fontSize: 13,
						fontWeight: 600,
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: 6,
						transition: "background 0.2s",
						fontFamily: "'Nunito Sans', sans-serif",
						letterSpacing: 0.3,
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.background = "#2a9d5c")
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.background = "#1a1a2e")
					}
				>
					Preview This Course
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
					>
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	);
}

export default function CoursesPage() {
	const [selectedCategories, setSelectedCategories] = useState(["education"]);
	const [selectedPriceRange, setSelectedPriceRange] = useState(700);
	const [selectedRatings, setSelectedRatings] = useState([]);
	const [onSale, setOnSale] = useState(false);
	const [inStock, setInStock] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [viewMode, setViewMode] = useState("grid");
	const [currentPage, setCurrentPage] = useState(2);
	const [sort, setSort] = useState("");
	const [sidebarSearch, setSidebarSearch] = useState("");

	const toggleCategory = (val) => {
		setSelectedCategories((prev) =>
			prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val],
		);
	};

	const removeFilter = (type, val) => {
		if (type === "category")
			setSelectedCategories((prev) => prev.filter((c) => c !== val));
	};

	// const courses = await getCourseList()

	return (
		<div className="mt-14 mb-28">
			{/* Main Content */}
			<div
				style={{
					maxWidth: 1200,
					margin: "0 auto",
					padding: "28px 20px 60px",
				}}
			>
				{/* Top Bar: Grid/List toggle + result count + search + filter */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 20,
						flexWrap: "wrap",
						gap: 12,
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
						}}
					>
						<div
							style={{
								display: "flex",
								border: "1px solid #ddd",
								borderRadius: 6,
								overflow: "hidden",
							}}
						>
							<button
								onClick={() => setViewMode("grid")}
								style={{
									padding: "6px 14px",
									fontSize: 13,
									border: "none",
									cursor: "pointer",
									fontWeight: 600,
									background:
										viewMode === "grid"
											? "#1a1a2e"
											: "#fff",
									color:
										viewMode === "grid" ? "#fff" : "#555",
								}}
							>
								⊞ Grid
							</button>
							<button
								onClick={() => setViewMode("list")}
								style={{
									padding: "6px 14px",
									fontSize: 13,
									border: "none",
									cursor: "pointer",
									fontWeight: 600,
									background:
										viewMode === "list"
											? "#1a1a2e"
											: "#fff",
									color:
										viewMode === "list" ? "#fff" : "#555",
								}}
							>
								≡ List
							</button>
						</div>
						<span style={{ fontSize: 13, color: "#666" }}>
							We Found{" "}
							<strong style={{ color: "#2a9d5c" }}>25</strong>{" "}
							Courses Available For you
						</span>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
						}}
					>
						<div style={{ position: "relative" }}>
							<input
								type="text"
								placeholder="Search Keywords..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								style={{
									padding: "8px 36px 8px 14px",
									border: "1px solid #ddd",
									borderRadius: 6,
									fontSize: 13,
									outline: "none",
									width: 200,
									background: "#fff",
								}}
							/>
							<svg
								style={{
									position: "absolute",
									right: 10,
									top: "50%",
									transform: "translateY(-50%)",
									color: "#999",
								}}
								width="15"
								height="15"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.35-4.35" />
							</svg>
						</div>
						<button
							style={{
								display: "flex",
								alignItems: "center",
								gap: 6,
								padding: "8px 16px",
								border: "1px solid #ddd",
								borderRadius: 6,
								background: "#fff",
								fontSize: 13,
								cursor: "pointer",
								fontWeight: 600,
								color: "#444",
							}}
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<line x1="4" y1="6" x2="20" y2="6" />
								<line x1="8" y1="12" x2="16" y2="12" />
								<line x1="12" y1="18" x2="12" y2="18" />
							</svg>
							Filter
						</button>
					</div>
				</div>

				{/* Active Filters */}
				{selectedCategories.length > 0 && (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 8,
							marginBottom: 16,
							flexWrap: "wrap",
						}}
					>
						{selectedCategories.map((cat) => {
							const label =
								CATEGORY_OPTIONS.find((c) => c.value === cat)
									?.label || cat;
							return (
								<span
									key={cat}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 6,
										background: "#e8f4f0",
										color: "#2a9d5c",
										borderRadius: 20,
										padding: "4px 12px",
										fontSize: 12,
										fontWeight: 600,
									}}
								>
									{label}
									<button
										onClick={() =>
											removeFilter("category", cat)
										}
										style={{
											border: "none",
											background: "none",
											cursor: "pointer",
											color: "#2a9d5c",
											padding: 0,
											lineHeight: 1,
											fontSize: 14,
										}}
									>
										×
									</button>
								</span>
							);
						})}
					</div>
				)}

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "260px 1fr",
						gap: 28,
					}}
				>
					{/* Sidebar */}
					<aside>
						{/* Search Box */}
						<div
							style={{
								background: "#fff",
								borderRadius: 10,
								padding: "20px",
								marginBottom: 20,
								boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
							}}
						>
							<h4
								style={{
									fontSize: 16,
									fontWeight: 700,
									marginBottom: 14,
									color: "#1a1a2e",
								}}
							>
								Search Here
							</h4>
							<div style={{ position: "relative" }}>
								<input
									type="text"
									placeholder="Search Keywords..."
									value={sidebarSearch}
									onChange={(e) =>
										setSidebarSearch(e.target.value)
									}
									style={{
										width: "100%",
										padding: "9px 36px 9px 12px",
										border: "1px solid #e0e0e0",
										borderRadius: 6,
										fontSize: 13,
										outline: "none",
										boxSizing: "border-box",
									}}
								/>
								<button
									style={{
										position: "absolute",
										right: 0,
										top: 0,
										bottom: 0,
										width: 38,
										background: "#2a9d5c",
										border: "none",
										borderRadius: "0 6px 6px 0",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#fff"
										strokeWidth="2.5"
									>
										<circle cx="11" cy="11" r="8" />
										<path d="m21 21-4.35-4.35" />
									</svg>
								</button>
							</div>
						</div>

						{/* Category */}
						<div
							style={{
								background: "#fff",
								borderRadius: 10,
								padding: "20px",
								marginBottom: 20,
								boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
							}}
						>
							<h4
								style={{
									fontSize: 16,
									fontWeight: 700,
									marginBottom: 14,
									color: "#1a1a2e",
								}}
							>
								Category
							</h4>
							<ul
								style={{
									listStyle: "none",
									margin: 0,
									padding: 0,
								}}
							>
								{CATEGORY_OPTIONS.map((opt) => (
									<li
										key={opt.value}
										onClick={() =>
											toggleCategory(opt.value)
										}
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											padding: "9px 12px",
											borderRadius: 6,
											marginBottom: 4,
											cursor: "pointer",
											background:
												selectedCategories.includes(
													opt.value,
												)
													? "#2a9d5c"
													: "transparent",
											color: selectedCategories.includes(
												opt.value,
											)
												? "#fff"
												: "#555",
											transition: "background 0.15s",
											fontSize: 13,
											fontWeight:
												selectedCategories.includes(
													opt.value,
												)
													? 600
													: 400,
										}}
									>
										<span>{opt.label}</span>
										<span
											style={{
												background:
													selectedCategories.includes(
														opt.value,
													)
														? "rgba(255,255,255,0.25)"
														: "#f0f0f0",
												borderRadius: 4,
												padding: "1px 7px",
												fontSize: 11,
												fontWeight: 600,
												color: selectedCategories.includes(
													opt.value,
												)
													? "#fff"
													: "#888",
											}}
										>
											{opt.count}
										</span>
									</li>
								))}
							</ul>
						</div>

						{/* Price Filter */}
						<div
							style={{
								background: "#fff",
								borderRadius: 10,
								padding: "20px",
								marginBottom: 20,
								boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
							}}
						>
							<h4
								style={{
									fontSize: 16,
									fontWeight: 700,
									marginBottom: 16,
									color: "#1a1a2e",
								}}
							>
								Price Filter
							</h4>
							<input
								type="range"
								min={0}
								max={700}
								value={selectedPriceRange}
								onChange={(e) =>
									setSelectedPriceRange(
										Number(e.target.value),
									)
								}
								style={{
									width: "100%",
									accentColor: "#2a9d5c",
									marginBottom: 12,
								}}
							/>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									marginBottom: 12,
								}}
							>
								<span style={{ fontSize: 12, color: "#888" }}>
									$80 – ${selectedPriceRange}
								</span>
							</div>
							<button
								style={{
									background: "#2a9d5c",
									color: "#fff",
									border: "none",
									borderRadius: 6,
									padding: "8px 20px",
									fontSize: 13,
									fontWeight: 600,
									cursor: "pointer",
								}}
							>
								Filter
							</button>
						</div>

						{/* Sold */}
						<div
							style={{
								background: "#fff",
								borderRadius: 10,
								padding: "20px",
								marginBottom: 20,
								boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
							}}
						>
							<h4
								style={{
									fontSize: 16,
									fontWeight: 700,
									marginBottom: 12,
									color: "#1a1a2e",
								}}
							>
								Sold
							</h4>
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: 8,
									cursor: "pointer",
									fontSize: 13,
									color: "#555",
									marginBottom: 8,
								}}
							>
								<input
									type="checkbox"
									checked={onSale}
									onChange={(e) =>
										setOnSale(e.target.checked)
									}
									style={{ accentColor: "#2a9d5c" }}
								/>
								On Sale
							</label>
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: 8,
									cursor: "pointer",
									fontSize: 13,
									color: "#555",
								}}
							>
								<input
									type="checkbox"
									checked={inStock}
									onChange={(e) =>
										setInStock(e.target.checked)
									}
									style={{ accentColor: "#2a9d5c" }}
								/>
								In Stock
							</label>
						</div>

						{/* Average Rating */}
						<div
							style={{
								background: "#fff",
								borderRadius: 10,
								padding: "20px",
								marginBottom: 20,
								boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
							}}
						>
							<h4
								style={{
									fontSize: 16,
									fontWeight: 700,
									marginBottom: 12,
									color: "#1a1a2e",
								}}
							>
								Average Rating
							</h4>
							{RATING_OPTIONS.map((r) => (
								<label
									key={r}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 8,
										cursor: "pointer",
										marginBottom: 7,
									}}
								>
									<input
										type="checkbox"
										checked={selectedRatings.includes(r)}
										onChange={() =>
											setSelectedRatings((prev) =>
												prev.includes(r)
													? prev.filter(
															(x) => x !== r,
														)
													: [...prev, r],
											)
										}
										style={{ accentColor: "#2a9d5c" }}
									/>
									<StarRating rating={r} />
									<span
										style={{ fontSize: 12, color: "#888" }}
									>
										(
										{r === 5
											? "09"
											: r === 4
												? "04"
												: r === 3
													? "93"
													: r === 2
														? "02"
														: "01"}
										)
									</span>
								</label>
							))}
						</div>

						{/* Recent Products */}
						<div
							style={{
								background: "#fff",
								borderRadius: 10,
								padding: "20px",
								marginBottom: 20,
								boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
							}}
						>
							<h4
								style={{
									fontSize: 16,
									fontWeight: 700,
									marginBottom: 14,
									color: "#1a1a2e",
								}}
							>
								Recent Products
							</h4>
							{RECENT_PRODUCTS.map((p) => (
								<div
									key={p.id}
									style={{
										display: "flex",
										gap: 10,
										alignItems: "center",
										marginBottom: 12,
									}}
								>
									<img
										src={p.img}
										alt={p.title}
										style={{
											width: 48,
											height: 48,
											borderRadius: 6,
											objectFit: "cover",
											flexShrink: 0,
										}}
									/>
									<div>
										<p
											style={{
												fontSize: 12,
												fontWeight: 600,
												color: "#333",
												margin: "0 0 4px",
												lineHeight: 1.3,
											}}
										>
											{p.title}
										</p>
										<StarRating rating={4.5} />
									</div>
								</div>
							))}
						</div>

						{/* Popular Tags */}
						<div
							style={{
								background: "#fff",
								borderRadius: 10,
								padding: "20px",
								boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
							}}
						>
							<h4
								style={{
									fontSize: 16,
									fontWeight: 700,
									marginBottom: 14,
									color: "#1a1a2e",
								}}
							>
								Popular Tags
							</h4>
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: 7,
								}}
							>
								{POPULAR_TAGS.map((tag) => (
									<span
										key={tag}
										style={{
											padding: "5px 12px",
											background: "#f5f5f5",
											borderRadius: 20,
											fontSize: 12,
											color: "#555",
											cursor: "pointer",
											transition: "background 0.15s",
											fontWeight: 500,
										}}
										onMouseEnter={(e) => {
											e.target.style.background =
												"#2a9d5c";
											e.target.style.color = "#fff";
										}}
										onMouseLeave={(e) => {
											e.target.style.background =
												"#f5f5f5";
											e.target.style.color = "#555";
										}}
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</aside>

					{/* Course Grid */}
					<div>
						<div
							style={{
								display: "grid",
								gridTemplateColumns:
									viewMode === "grid"
										? "repeat(2, 1fr)"
										: "1fr",
								gap: 20,
								marginBottom: 32,
							}}
						>
							{SAMPLE_COURSES.map((course) => (
								<CourseCard key={course.id} course={course} />
							))}
						</div>

						{/* Pagination */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: 6,
							}}
						>
							<button
								onClick={() =>
									setCurrentPage((p) => Math.max(1, p - 1))
								}
								style={{
									width: 36,
									height: 36,
									borderRadius: 6,
									border: "1px solid #ddd",
									background: "#fff",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								←
							</button>
							{[1, 2, 3, 4].map((p) => (
								<button
									key={p}
									onClick={() => setCurrentPage(p)}
									style={{
										width: 36,
										height: 36,
										borderRadius: 6,
										border: "none",
										background:
											currentPage === p
												? "#2a9d5c"
												: "#fff",
										color:
											currentPage === p ? "#fff" : "#555",
										fontWeight:
											currentPage === p ? 700 : 400,
										cursor: "pointer",
										fontSize: 14,
										boxShadow:
											currentPage === p
												? "0 2px 8px rgba(42,157,92,0.3)"
												: "0 1px 4px rgba(0,0,0,0.06)",
									}}
								>
									{p}
								</button>
							))}
							<button
								onClick={() =>
									setCurrentPage((p) => Math.min(4, p + 1))
								}
								style={{
									width: 36,
									height: 36,
									borderRadius: 6,
									border: "none",
									background: "#2a9d5c",
									color: "#fff",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								→
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
