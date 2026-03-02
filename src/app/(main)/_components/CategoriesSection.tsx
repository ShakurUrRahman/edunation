"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import Link from "next/link";

export default function CategoriesSection({ categories }) {
	const toSlug = (str: string) =>
		str
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "");

	const BG_COLORS = [
		"bg-cyan-100",
		"bg-amber-100",
		"bg-violet-100",
		"bg-emerald-100",
		"bg-rose-100",
		"bg-fuchsia-100",
	];
	return (
		<section className="hero">
			<div className="container mx-auto px-4 py-12 md:py-24">
				{/* Header Section */}
				<div className="mb-10 md:mb-16 text-center max-w-3xl mx-auto">
					<p className="inline-flex items-center mb-4 md:mb-6 gap-2 px-4 py-2 rounded-full bg-primary/5 backdrop-blur shadow-sm border border-green-200 text-xs md:text-sm font-semibold text-primary">
						📂 Categories
					</p>
					<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
						Explore{" "}
						<span className="relative inline-block bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
							Top Courses
							<svg
								className="absolute -bottom-2 md:-bottom-2 left-0 w-full h-2 md:h-3"
								viewBox="0 0 200 20"
								fill="none"
								preserveAspectRatio="none"
							>
								<path
									d="M0 15 Q100 0 200 15"
									stroke="url(#lineGradientHeader)"
									strokeWidth="6"
									strokeLinecap="round"
								/>
								<defs>
									<linearGradient
										id="lineGradientHeader"
										x1="0%"
										y1="0%"
										x2="100%"
										y2="0%"
									>
										<stop
											offset="0%"
											stopColor="var(--primary)"
										/>
										<stop
											offset="100%"
											stopColor="#2dd4bf"
										/>
									</linearGradient>
								</defs>
							</svg>
						</span>{" "}
						<span className="block mt-2">That Change Yourself</span>
					</h2>
				</div>
				<Swiper
					slidesPerView={1.2}
					spaceBetween={24}
					loop={true}
					grabCursor={true}
					speed={900}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					breakpoints={{
						// Small phones
						480: {
							slidesPerView: 1.5,
							spaceBetween: 20,
						},
						// Tablets
						768: {
							slidesPerView: 2.5,
							spaceBetween: 24,
						},
						// Small Laptops
						1024: {
							slidesPerView: 4,
							spaceBetween: 24,
						},
						// Desktops
						1280: {
							slidesPerView: 5,
							spaceBetween: 30,
						},
					}}
					modules={[Pagination, Autoplay]}
					className="categories-swiper"
				>
					{categories?.map((category, index) => (
						<SwiperSlide key={index}>
							<div
								className={`category-card group relative overflow-hidden rounded-3xl p-6 w-full h-[200px] md:h-[220px] transition-all duration-300 hover:shadow-xl text-gray-600
               ${BG_COLORS[index % BG_COLORS.length]}
              `}
							>
								<div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
								<img
									className="w-20 h-20 md:w-24 md:h-24 bottom-2 right-2 absolute z-0 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
									src={`/assets/images/categories/${category.thumbnail}`}
									alt={category?.title}
								/>
								{/* Content */}
								<div className="relative z-10 flex flex-col h-full">
									<h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
										{category?.title}
									</h3>
									<p className="text-xs md:text-sm text-gray-600 line-clamp-2 pr-10">
										Explore top courses in this category.
									</p>

									<div className="mt-auto">
										<Link
											href={`/courses?category=${toSlug(category.title ?? "")}`}
											className="inline-flex items-center text-xs font-bold text-primary group-hover:gap-2 transition-all"
										>
											View Courses{" "}
											<span className="opacity-0 group-hover:opacity-100 transition-opacity">
												→
											</span>
										</Link>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
