"use client";

import {
	ArrowBigLeft,
	ArrowLeft,
	ArrowLeftSquare,
	ArrowRight,
	Play,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useRef } from "react";

const testimonials = [
	{
		id: 1,
		name: "Bill Lancaster",
		role: "Founder & CEO UIPainter",
		image: "/student1.jpg",
		date: "Jan 12, 2026",
		text: "Educeet transformed my learning journey! The platform is intuitive, the courses are top-notch, and the support is exceptional. I've gained real skills and confidence.",
	},
	{
		id: 2,
		name: "Roddi San",
		role: "Founder & CEO UIPainter",
		image: "/student2.jpg",
		date: "Jan 12, 2026",
		text: "Educeet transformed my learning journey! The platform is intuitive, the courses are top-notch, and the support is exceptional. I've gained real skills and confidence.",
	},
	{
		id: 3,
		name: "Bill Lancaster",
		role: "Founder & CEO UIPainter",
		image: "/student1.jpg",
		date: "Jan 12, 2026",
		text: "Educeet transformed my learning journey! The platform is intuitive, the courses are top-notch, and the support is exceptional. I've gained real skills and confidence.",
	},
	{
		id: 4,
		name: "Roddi San",
		role: "Founder & CEO UIPainter",
		image: "/student2.jpg",
		date: "Jan 12, 2026",
		text: "Educeet transformed my learning journey! The platform is intuitive, the courses are top-notch, and the support is exceptional. I've gained real skills and confidence.",
	},
];

export default function TestimonialSection() {
	const swiperRef = useRef(null);

	return (
		<section className="relative pt-24 pb-36 overflow-hidden">
			{/* Background Gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#435d99] via-secondary to-[#843b65]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(88, 140, 224, 0.3),transparent_40%)]" />

			<div className="relative container mx-auto px-6">
				<div className="mb-16 text-center ">
					<p className="inline-flex items-center text-gray-50 mb-6 gap-2 px-4 py-2 rounded-full bg-primary/5 backdrop-blur shadow-sm border border-green-200 text-sm font-medium">
						Testimonials
					</p>
					<h2 className="text-6xl md:text-5xl font-bold leading-16 text-gray-200">
						Our Learners Say About{" "}
						<span className="relative inline-block text-primary">
							Edu<span className="font-light">Nation</span>
							<svg
								className="absolute -bottom-2 left-0 w-full "
								viewBox="0 0 200 20"
								fill="none"
								preserveAspectRatio="none"
							>
								<defs>
									<linearGradient
										id="heroGradient"
										x1="0%"
										y1="0%"
										x2="100%"
										y2="100%"
									>
										<stop
											offset="0%"
											stopColor="var(--color-hero-light)"
										/>
										<stop
											offset="50%"
											stopColor="var(--color-background)"
										/>
										<stop
											offset="100%"
											stopColor="var(--color-hero-gradient)"
										/>
									</linearGradient>
								</defs>

								<path
									d="M0 15 Q100 0 200 15"
									stroke="url(#heroGradient)"
									strokeWidth="4"
									strokeLinecap="round"
								/>
							</svg>
						</span>
						’s
						<br /> Impact and Value
					</h2>
				</div>

				{/* Cards Wrapper */}
				<div className="relative px-8">
					{/* Left Arrow */}
					<button
						onClick={() => swiperRef.current?.slidePrev()}
						className="hidden cursor-pointer text-white md:flex absolute left-2 top-2/5 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-teal-400 backdrop-blur-md border  items-center justify-center border-white hover:shadow-xl transition-all duration-300 hover:scale-105"
					>
						<ArrowLeft size={20} />
					</button>

					{/* Swiper */}
					<Swiper
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						slidesPerView={1}
						spaceBetween={24}
						loop={true}
						grabCursor={true}
						speed={900}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						pagination={{ clickable: true }}
						breakpoints={{
							768: {
								slidesPerView: 2,
							},
						}}
						modules={[Pagination, Autoplay]}
						className="mySwiper !pb-10"
					>
						{testimonials.map((t) => (
							<SwiperSlide key={t.id}>
								<div className="bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden  border border-primary">
									<div className="flex flex-col md:flex-row">
										{/* Image */}
										<div className="relative md:w-1/3">
											<img
												src="/assets/images/about/about.png"
												alt={t.name}
												className="h-full w-full object-cover min-h-[180px]"
											/>
											<button className="absolute inset-0 flex items-center justify-center">
												<div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
													<Play className="text-green-600" />
												</div>
											</button>
										</div>

										{/* Content */}
										<div className="p-8 md:w-2/3">
											<h3 className="text-xl font-semibold text-gray-900">
												{t.name}
											</h3>
											<p className="text-sm text-gray-500 mb-4">
												{t.role}
											</p>
											<p className="text-gray-600 leading-relaxed mb-6">
												{t.text}
											</p>
											<div className="flex justify-between items-center text-gray-400 text-sm">
												<span className="text-5xl leading-none">
													"
												</span>
												<span>{t.date}</span>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Right Arrow */}
					<button
						onClick={() => swiperRef.current?.slideNext()}
						className="hidden cursor-pointer text-white md:flex absolute right-2 top-2/5 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-teal-400 backdrop-blur-md border border-white items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-105"
					>
						<ArrowRight size={20} />
					</button>
				</div>
			</div>
		</section>
	);
}
