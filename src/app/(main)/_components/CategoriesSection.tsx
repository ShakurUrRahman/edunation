"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function CategoriesSection({ categories }) {
	console.log(categories);

	return (
		<section className="py-16 container">
			<div className="space-y-4 mb-10 text-center ">
				<p className="inline-flex text-center items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-border text-sm font-medium">
					Categories
				</p>

				<h2 className="text-3xl md:text-4xl font-bold">
					Explore Top Courses{" "}
					<span className="relative inline-block">
						Categories
						<svg
							className="absolute -bottom-2 left-0 w-full"
							viewBox="0 0 200 20"
							fill="none"
							preserveAspectRatio="none"
						>
							<path
								d="M0 15 Q100 0 200 15"
								stroke="currentColor"
								strokeWidth="4"
								className="text-primary"
							/>
						</svg>
					</span>
				</h2>
			</div>
			<Swiper
				slidesPerView={1.2}
				spaceBetween={24}
				centeredSlides={false}
				loop={true}
				grabCursor={true}
				speed={900} // smooth slow animation
				autoplay={{
					delay: 1000,
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
				className=""
			>
				<div className="mb-12">
					{categories?.map((category, index) => (
						<SwiperSlide key={index}>
							<div
								className={`h-36 rounded-2xl p-6 text-white  transition-all duration-500 hover:scale-105 bg-linear-to-br
							${index % 4 === 0 ? "from-indigo-500 to-purple-600" : ""}
							${index % 4 === 1 ? "from-pink-500 to-rose-500" : ""}
							${index % 4 === 2 ? "from-emerald-500 to-teal-600" : ""}
							${index % 4 === 3 ? "from-orange-500 to-amber-500" : ""}
						`}
							>
								<h3 className="text-xl font-semibold text-accent-orange">
									{category?.title}
								</h3>
								<p className="mt-3 text-sm ">
									Explore top courses in this category.
								</p>
							</div>
						</SwiperSlide>
					))}
				</div>
			</Swiper>
		</section>
	);
}
