import React from "react";

export default function AboutUsSection() {
	return (
		<section className="py-26 hero">
			<div className="container mx-auto px-6 lg:px-12">
				<div className="grid lg:grid-cols-2 gap-30 items-center">
					{/* LEFT CONTENT */}
					<div className="relative flex justify-center">
						{/* Background soft gradient shape */}
						<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-teal-200/30 rounded-[40px] -z-10 blur-xl scale-105"></div>

						{/* Image Card */}
						<div className="relative rounded-[40px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
							{/* Soft inner overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
							{/* Top Floating Text Box */}
							<div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
								<div className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-white text-sm md:text-base font-semibold tracking-wide animate-fade-in">
									✨ You land in the right place
								</div>
							</div>

							<img
								src="/assets/images/about/about.png"
								alt="About Us"
								className="w-full h-auto object-cover"
							/>

							{/* ✅ Book Image Positioned at Bottom */}
							<div className="absolute bottom-40 left-1/2 w-full -translate-x-1/2 translate-y-1/2 z-20">
								<img
									src="/assets/images/about/book.png"
									alt="Magic Book"
									className="w-full"
								/>
								{/* Glow Light */}
								<div className="absolute left-1/2 bottom-40 -translate-x-1/2 w-full h-full bg-yellow-300/40 blur-3xl rounded-full animate-pulse"></div>{" "}
								<div className="absolute left-1/2 bottom-24 -translate-x-1/2 pointer-events-none">
									{/* Particle 1 */}
									<span className="sparkle delay-0"></span>
									<span className="sparkle delay-1"></span>
									<span className="sparkle delay-2"></span>
									<span className="sparkle delay-3"></span>
									<span className="sparkle delay-4"></span>
								</div>
							</div>
						</div>
					</div>

					{/* RIGHT IMAGE */}
					<div className="space-y-6 mb-20">
						<p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 backdrop-blur shadow-sm border border-green-300 text-sm font-medium">
							Who We Are?
						</p>
						<h2 className="text-6xl md:text-5xl font-bold leading-14 mb-10">
							Empowering Learners Through{" "}
							<span className="relative inline-block bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
								Smart Education
								<svg
									className="absolute -bottom-5 left-0 w-full"
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
											<stop
												offset="100%"
												stopColor="#2dd4bf"
											/>{" "}
											{/* teal-400 */}
										</linearGradient>
									</defs>

									<path
										d="M0 15 Q100 0 200 15"
										stroke="url(#lineGradient)"
										strokeWidth="3"
									/>
								</svg>
							</span>
						</h2>

						<p className="mt-6 text-muted-foreground leading-relaxed">
							We are building a modern learning platform designed
							to help students master real-world skills. Our
							mission is to make high-quality education
							accessible, practical, and career-focused.
						</p>

						{/* Features */}
						<div className="flex justify-between">
							<div className="mt-8 space-y-3">
								<div className="flex items-center gap-3">
									<div className="w-7 h-7 text-xl rounded-full bg-secondary flex items-center justify-center text-white">
										✓
									</div>
									<span className="font-medium text-xl">
										Industry Expert Instructors
									</span>
								</div>

								<div className="flex items-center gap-3">
									<div className="w-7 h-7 text-xl rounded-full bg-secondary flex items-center justify-center text-white">
										✓
									</div>
									<span className="font-medium text-xl">
										Project Based Learning
									</span>
								</div>
							</div>
							<div className="mt-8 space-y-3">
								<div className="flex items-center gap-3">
									<div className="w-7 h-7 text-xl rounded-full bg-secondary flex items-center justify-center text-white">
										✓
									</div>
									<span className="font-medium text-xl">
										Lifetime Access
									</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-7 h-7 text-xl rounded-full bg-secondary flex items-center justify-center text-white">
										✓
									</div>
									<span className="font-medium text-xl">
										Global Standard Contents
									</span>
								</div>
							</div>
						</div>

						{/* CTA */}
						<button className="mt-10 px-6 py-3 rounded-xl bg-primary text-white font-medium shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							Learn More →
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
