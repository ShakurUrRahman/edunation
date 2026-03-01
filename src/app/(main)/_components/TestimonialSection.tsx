// components/TestimonialSection.tsx
// Usage (server component parent):
//   const testimonials = await getAllTestimonials(); // fetch all or featured
//   <TestimonialSection testimonials={testimonials} />

"use client";

import { ArrowLeft, ArrowRight, Play, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";

// ── Types matching your Testimonial schema ────────────────────────────────────
interface TestimonialUser {
	firstName: string;
	lastName: string;
	profilePicture?: string;
	designation?: string; // optional — "Founder & CEO" etc.
}

interface Testimonial {
	id: string;
	content: string; // your schema field (not "text" or "comment")
	rating: number;
	user: TestimonialUser;
	createdOn?: string;
}

interface Props {
	testimonials: Testimonial[];
}

// ── Star row ──────────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
	return (
		<div className="flex gap-0.5 mb-3">
			{[1, 2, 3, 4, 5].map((s) => (
				<Star
					key={s}
					className="w-4 h-4"
					fill={s <= Math.round(rating) ? "#f5a623" : "transparent"}
					stroke={s <= Math.round(rating) ? "#f5a623" : "#d1d5db"}
					strokeWidth={1.5}
				/>
			))}
		</div>
	);
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TestimonialsSection({ testimonials }: Props) {
	const swiperRef = useRef<any>(null);

	// Graceful empty state
	if (!testimonials || testimonials.length === 0) {
		return null;
	}

	return (
		<section className="relative pt-24 pb-36 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#435d99] via-secondary to-[#843b65]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(88,140,224,0.3),transparent_40%)]" />

			<div className="relative container mx-auto px-6">
				{/* Heading */}
				<div className="mb-16 text-center">
					<p className="inline-flex items-center text-gray-50 mb-6 gap-2 px-4 py-2 rounded-full bg-primary/5 backdrop-blur shadow-sm border border-green-200 text-sm font-medium">
						Testimonials
					</p>
					<h2 className="text-5xl md:text-6xl font-bold leading-tight text-gray-200">
						Our Learners Say About{" "}
						<span className="relative inline-block text-primary">
							Edu<span className="font-light">Nation</span>
							<svg
								className="absolute -bottom-2 left-0 w-full"
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
						's
						<br /> Impact and Value
					</h2>
				</div>

				{/* Carousel */}
				<div className="relative px-8">
					{/* Left arrow */}
					<button
						onClick={() => swiperRef.current?.slidePrev()}
						className="hidden cursor-pointer text-white md:flex absolute left-2 top-2/5 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-teal-400 backdrop-blur-md border border-white items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-105"
					>
						<ArrowLeft size={20} />
					</button>

					<Swiper
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						slidesPerView={1}
						spaceBetween={24}
						loop={testimonials.length > 1}
						grabCursor={true}
						speed={900}
						autoplay={{ delay: 3000, disableOnInteraction: false }}
						pagination={{ clickable: true }}
						breakpoints={{ 768: { slidesPerView: 2 } }}
						modules={[Pagination, Autoplay]}
						className="mySwiper !pb-10"
					>
						{testimonials.map((t) => {
							const fullName = `${t.user.firstName} ${t.user.lastName}`;
							const initials = `${t.user.firstName.charAt(0)}${t.user.lastName.charAt(0)}`;
							const dateStr = t.createdOn
								? new Date(t.createdOn).toLocaleDateString(
										"en-US",
										{
											month: "short",
											day: "numeric",
											year: "numeric",
										},
									)
								: "";

							return (
								<SwiperSlide key={t.id}>
									<div className="bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-primary h-full">
										<div className="flex flex-col md:flex-row h-full">
											{/* Avatar / image panel */}
											<div className="relative md:w-1/3 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center min-h-[180px]">
												{t.user.profilePicture ? (
													<img
														src={
															t.user
																.profilePicture
														}
														alt={fullName}
														className="h-full w-full object-cover"
													/>
												) : (
													// Fallback — initials avatar
													<div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
														<span className="text-2xl font-bold text-primary">
															{initials}
														</span>
													</div>
												)}
												{/* Decorative play overlay — purely cosmetic */}
												<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
													<div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
														<Play className="text-primary" />
													</div>
												</div>
											</div>

											{/* Content */}
											<div className="p-8 md:w-2/3 flex flex-col justify-between">
												<div>
													<h3 className="text-xl font-semibold text-gray-900 mb-0.5">
														{fullName}
													</h3>
													{t.user.designation && (
														<p className="text-sm text-gray-500 mb-3">
															{t.user.designation}
														</p>
													)}

													{/* Stars from real rating */}
													<Stars rating={t.rating} />

													{/* content is the schema field */}
													<p className="text-gray-600 leading-relaxed">
														{t.content}
													</p>
												</div>

												{/* Footer row */}
												<div className="flex justify-between items-center text-gray-400 text-sm mt-6">
													<span className="text-5xl leading-none font-serif">
														"
													</span>
													{dateStr && (
														<span>{dateStr}</span>
													)}
												</div>
											</div>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>

					{/* Right arrow */}
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
