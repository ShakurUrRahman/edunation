"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";

export default function CategoriesSection({ categories }) {
	return (
		<section className="container py-24">
			<div className="space-y-4 mb-20 text-center ">
				<p className="inline-flex text-center items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-border text-sm font-medium">
					Categories
				</p>
				<h2 className="text-6xl md:text-5xl font-bold leading-16">
					Explore Top Courses{" "}
					<span className="relative inline-block bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
						Categories
						<svg
							className="absolute -bottom-2 left-0 w-full"
							viewBox="0 0 200 20"
							fill="none"
							preserveAspectRatio="none"
						>
							<defs>
								<linearGradient
									id="lineGradient"
									x1="0%"
									y1="0%"
									x2="100%"
									y2="0%"
								>
									<stop
										offset="0%"
										stopColor="var(--primary)"
									/>
									<stop offset="100%" stopColor="#2dd4bf" />{" "}
									{/* teal-400 */}
								</linearGradient>
							</defs>

							<path
								d="M0 15 Q100 0 200 15"
								stroke="url(#lineGradient)"
								strokeWidth="4"
							/>
						</svg>
					</span>
					<br />
					That Change Yourself
				</h2>{" "}
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
					640: {
						slidesPerView: 1.5,
					},
					768: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 5,
					},
				}}
				modules={[Pagination, Autoplay]}
				className="categories-swiper"
			>
				{categories?.map((category, index) => (
					<SwiperSlide key={index}>
						<div
							className={`category-card
                ${index % 1 === 0 ? "gradient-1" : ""}
                ${index % 2 === 1 ? "gradient-2" : ""}
                ${index % 3 === 2 ? "gradient-3" : ""}
                ${index % 4 === 3 ? "gradient-4" : ""} 
                ${index % 5 === 4 ? "gradient-5" : ""}
              relative`}
						>
							<img
								className="w-24 h-24 bottom-2 right-2 absolute z-0 opacity-80"
								src={`/assets/images/categories/${category.thumbnail}`}
								alt={category?.title}
							/>
							<div className="relative z-10">
								<h3>{category?.title}</h3>
								<p>Explore top courses in this category.</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
