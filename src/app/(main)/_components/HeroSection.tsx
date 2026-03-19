"use client";

import { Facebook, Instagram, Linkedin, Users, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HeroSection() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setProgress(60);
		}, 200);
		return () => clearTimeout(timer);
	}, []);

	return (
		<section className="relative overflow-hidden">
			{/* Background Decoration */}
			<div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent hidden lg:block" />

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-12 md:py-20">
					{/* LEFT CONTENT */}
					<div className="space-y-6 md:space-y-8 text-center lg:text-left order-1">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs md:text-sm font-bold text-primary animate-fade-in">
							🚀 15,000+ Students Learning Worldwide
						</div>

						{/* Heading */}
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-gray-900">
							Master{" "}
							<span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
								In-Demand Skills
							</span>{" "}
							For Your{" "}
							<span className="relative inline-block text-primary">
								Future
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
							</span>
						</h1>

						{/* Subtext */}
						<p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
							Join thousands of learners building real-world
							skills through structured courses, expert
							mentorship, and hands-on projects.
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
							<Link
								href="/courses"
								className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 text-center font-bold"
							>
								Start Learning Free →
							</Link>

							<Link
								href="/courses"
								className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-gray-100 bg-white hover:bg-gray-50 transition-all duration-300 text-center font-bold text-gray-700"
							>
								Explore Courses
							</Link>
						</div>

						{/* Social Proof */}
						<div className="pt-6 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
							<div className="flex -space-x-2">
								{/* Placeholder for small student avatars if you have them, otherwise keeping your icons */}
								<div className="flex gap-3">
									<Facebook className="w-6 h-6 text-blue-600 hover:scale-110 transition-transform" />
									<Youtube className="w-6 h-6 text-red-600 hover:scale-110 transition-transform" />
									<Linkedin className="w-6 h-6 text-blue-700 hover:scale-110 transition-transform" />
									<Instagram className="w-6 h-6 text-pink-500 hover:scale-110 transition-transform" />
								</div>
							</div>
							<div className="h-4 w-px bg-gray-200 hidden sm:block" />
							<p className="text-sm font-semibold text-gray-500">
								⭐⭐⭐⭐⭐{" "}
								<span className="text-gray-900">4.9/5</span>{" "}
								from 2,000+ Reviews
							</p>
						</div>
					</div>

					{/* RIGHT VISUAL SECTION */}
					<div className="relative flex justify-center lg:justify-end items-center order-2 lg:order-2 px-4 md:px-0">
						<div className="relative w-full ">
							{/* Glow Background */}
							<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full blur-3xl transform scale-110" />

							{/* Main Image */}
							<Image
								src="/hero-student.png"
								alt="Hero student"
								width={612}
								height={407}
								priority // add this ONLY for above-the-fold images (hero)
								sizes="(max-width: 768px) 100vw, 50vw"
								loading="eager"
							/>

							{/* Floating Card 1: UI/UX (Hides on very small mobile) */}
							<div className="absolute -top-4 right-48 md:top-10 md:right-3 bg-gradient-to-r from-indigo-600 to-purple-500 p-4 rounded-2xl shadow-xl text-white z-20 animate-bounce-slow ">
								<p className="font-bold text-[10px] md:text-sm">
									UI/UX Design Masterclass
								</p>
								<p className="text-[8px] md:text-xs text-white/80">
									1,200 Students
								</p>
							</div>

							{/* Floating Card 2: Progress */}
							<div className="absolute bottom-16 -right-4 md:-bottom-8 md:-right-8 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-2xl z-20 w-40 md:w-52 border border-white/20">
								<p className="text-[10px] px-1 md:text-sm font-bold text-gray-800">
									Your Progress
								</p>
								<div className="w-full px-1 h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
									<div
										className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
										style={{ width: `${progress}%` }}
									/>
								</div>
								<p className="text-[8px] px-1 md:text-xs mt-1 font-bold text-primary">
									{progress}% Complete
								</p>
							</div>

							{/* Floating Card 3: Mentorship (Hidden on mobile) */}
							<div className="absolute bottom-24 -left-4 md:bottom-52 md:-left-2 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-2xl shadow-2xl w-48 z-20 hidden sm:block border border-white/20">
								<div className="flex items-center gap-3">
									<div className="relative">
										<div className="p-2 bg-primary/10 rounded-lg">
											<Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
										</div>
										<span className="absolute -top-1 -right-1 flex h-3 w-3">
											<span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
											<span className="relative rounded-full h-3 w-3 bg-green-500"></span>
										</span>
									</div>
									<div>
										<p className="text-[10px] md:text-sm font-bold text-gray-800">
											Live Mentor
										</p>
										<p className="text-[8px] md:text-xs text-gray-500">
											Every Week
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
