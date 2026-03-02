import React from "react";

export default function AboutUsSection() {
	const features = [
		"Industry Expert Instructors",
		"Lifetime Access",
		"Project Based Learning",
		"Global Standard Contents",
		"24/7/30/365 Support",
		"Harvard/MIT Qualified Mentors",
	];

	return (
		<section className="py-16 md:py-24 lg:py-32 overflow-hidden bg-white">
			<div className="container mx-auto px-6 lg:px-12">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* LEFT CONTENT: IMAGE COMPOSITION */}
					<div className="relative order-2 lg:order-1">
						{/* Background soft gradient shape */}
						<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-teal-200/30 rounded-[40px] -z-10 blur-3xl scale-110"></div>

						<div className="relative rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl">
							{/* Floating Badge */}
							<div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-30 w-full px-4 text-center">
								<div className="inline-block px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-xl text-white text-xs md:text-base font-bold tracking-wide">
									✨ You land in the right place
								</div>
							</div>

							<img
								src="/assets/images/about/about.png"
								alt="About Us"
								className="w-full h-auto object-cover min-h-[300px]"
							/>

							{/* Book Image & Glow - Adjusted for responsiveness */}
							<div className="absolute bottom-24 left-1/2 w-full -translate-x-1/2 translate-y-1/2 z-20">
								<img
									src="/assets/images/about/book.png"
									alt="Magic Book"
									className="w-full"
								/>
								{/* Glow Light */}
								<div className="absolute left-1/2 bottom-40 -translate-x-1/2 w-full h-full bg-yellow-300/40 blur-[60px] md:blur-[100px] rounded-full animate-pulse"></div>{" "}
								<div className="absolute left-1/2 bottom-28 -translate-x-1/2 pointer-events-none">
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

					{/* RIGHT CONTENT: TEXT & FEATURES */}
					<div className="order-1 lg:order-2 text-center lg:text-left">
						<p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 backdrop-blur shadow-sm border border-green-300 text-sm font-semibold text-primary mb-6">
							Who We Are?
						</p>

						<h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
							Empowering Learners Through{" "}
							<span className="relative inline-block bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
								Smart Education
								<svg
									className="absolute -bottom-2 md:-bottom-2 left-0 w-full h-2 md:h-4"
									viewBox="0 0 200 20"
									fill="none"
									preserveAspectRatio="none"
								>
									<path
										d="M0 15 Q100 0 200 15"
										stroke="url(#aboutLineGradient)"
										strokeWidth="6"
										strokeLinecap="round"
									/>
									<defs>
										<linearGradient
											id="aboutLineGradient"
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
						</h2>

						<p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
							We are building a modern learning platform designed
							to help students master real-world skills. Our
							mission is to make high-quality education
							accessible, practical, and career-focused.
						</p>

						{/* Features Grid */}
						<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
							{features.map((feature, idx) => (
								<div
									key={idx}
									className="flex items-center gap-3 group"
								>
									<div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
										<span className="text-xs md:text-sm font-bold">
											✓
										</span>
									</div>
									<span className="font-semibold text-sm md:text-base text-gray-800 text-left">
										{feature}
									</span>
								</div>
							))}
						</div>

						{/* CTA */}
						<div className="mt-12">
							<button className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 active:scale-95">
								Learn More →
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
