"use client";

import { ArrowLeft, ArrowRight, Frame, Play, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";

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
		<section className="relative pt-12 pb-8 md:pt-24 md:pb-36 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#435d99] via-secondary to-[#843b65]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(88,140,224,0.3),transparent_40%)]" />

			<div className="relative container mx-auto px-6">
				{/* Heading */}
				<div className="mb-16 text-center">
					<p className="inline-flex items-center mb-4 md:mb-6 gap-2 px-4 py-2 rounded-full bg-primary/5 backdrop-blur shadow-sm border border-green-200 text-xs md:text-sm font-medium">
						Testimonials
					</p>
					<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
						Our Learners <br /> Say About{" "}
						<span className="relative inline-block bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
							<span className="font-bold">Edu</span>
							<span className="font-light">Nation</span>
							<svg
								className="absolute -bottom-2 md:-bottom-2 left-0 w-full h-2 md:h-4"
								viewBox="0 0 200 20"
								fill="none"
								preserveAspectRatio="none"
							>
								<path
									d="M0 15 Q100 0 200 15"
									stroke="url(#lineGradientCourses)"
									strokeWidth="6"
									strokeLinecap="round"
								/>
								<defs>
									<linearGradient
										id="lineGradientCourses"
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
						className="hidden cursor-pointer text-white md:flex absolute left-2 top-1/3 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-teal-400 backdrop-blur-md border border-white items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-105"
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
						breakpoints={{
							640: {
								slidesPerView: 1.5,
							},
							768: {
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 2,
							},
						}}
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
								<SwiperSlide key={t.id} className="h-full pb-4">
									<div className="group bg-white/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-primary/20 h-full shadow-sm hover:shadow-xl transition-all duration-500 relative">
										<div className="flex flex-col md:flex-row h-fit">
											{/* Avatar / Image Panel */}
											<div className="relative md:w-5/12 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent flex items-center justify-center min-h-[220px] overflow-hidden">
												{t.user.profilePicture ? (
													<img
														src={
															t.user
																.profilePicture
														}
														alt={fullName}
														className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
													/>
												) : (
													<div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-primary/10">
														<span className="text-3xl font-black text-primary">
															{initials}
														</span>
													</div>
												)}
											</div>

											{/* Content Area */}
											<div className="p-8 md:w-7/12 flex flex-col relative">
												<div className="relative z-10">
													<div className="flex justify-between items-start mb-4">
														<div>
															<h3 className="text-xl font-bold text-gray-900 leading-tight">
																{fullName}
															</h3>
															{t.user
																.designation && (
																<p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">
																	{
																		t.user
																			.designation
																	}
																</p>
															)}
														</div>
													</div>

													<div className="mb-4">
														<Stars
															rating={t.rating}
														/>
													</div>

													<p className="text-gray-600 leading-relaxed text-sm md:text-base italic relative z-10">
														"
														{t.content.length > 100
															? t.content.slice(
																	0,
																	100,
																) + "…"
															: t.content}
														"
													</p>
												</div>

												{/* Redesigned Bottom Right Section */}
												<div className="mt-auto pt-6 flex justify-between items-end">
													<div className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
														{dateStr && (
															<span>
																Verified Review
																• {dateStr}
															</span>
														)}
													</div>

													{/* Animated Shape & Quote Symbol */}
													<div className="relative md:hidden lg:block">
														{/* The Animated Ring */}
														<div className="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-150 opacity-20 group-hover:block hidden"></div>

														{/* The Shape Container */}
														<div className="relative w-14 h-14 bg-primary text-white flex items-center justify-center rounded-br-[1.5rem] rounded-tl-3xl shadow-lg shadow-primary/30 transform group-hover:-rotate-12 transition-transform duration-500">
															<span className="text-4xl font-serif mt-4">
																”
															</span>

															{/* Extra CSS accent dots */}
															<div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full"></div>
															<div className="absolute top-4 right-3 w-1 h-1 bg-white/20 rounded-full"></div>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Subtle CSS top-border gradient line */}
										<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>

					{/* Right arrow */}
					<button
						onClick={() => swiperRef.current?.slideNext()}
						className="hidden cursor-pointer text-white md:flex absolute right-2 top-1/3 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-teal-400 backdrop-blur-md border border-white items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-105"
					>
						<ArrowRight size={20} />
					</button>
				</div>
			</div>
		</section>
	);
}
