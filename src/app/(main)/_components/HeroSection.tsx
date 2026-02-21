"use client";

import {
	Facebook,
	FacebookIcon,
	Instagram,
	Linkedin,
	LinkedinIcon,
	Users,
	Youtube,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HeroSection() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setProgress(60);
		}, 200); // small delay for smooth start
	}, []);

	return (
		<section className=" relative overflow-hidden">
			{/* Background Glow */}

			<div className="container min-h-[90vh] flex items-center">
				<div className="grid lg:grid-cols-2 gap-16 items-center w-full py-20">
					{/* LEFT CONTENT */}
					<div className="space-y-6 animate-slide-up">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-border text-sm font-medium">
							🚀 15,000+ Students Learning Worldwide
						</div>
						{/* Heading */}
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
							Master{" "}
							<span className="bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent">
								In
								<span className="bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent mx-1 hyphen-animate">
									-
								</span>
								Demand Skills
							</span>{" "}
							For Your{" "}
							<span className="relative inline-block bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
								Future
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
										strokeWidth="7"
									/>
								</svg>
							</span>
						</h1>
						{/* Subtext */}
						<p className="text-muted-foreground text-lg max-w-xl">
							Join thousands of learners building real-world
							skills through structured courses, expert
							mentorship, and hands-on projects.
						</p>
						{/* CTA Buttons */}

						<div className="flex flex-wrap gap-4">
							<Link
								href="/courses"
								className="px-6 py-3 rounded-lg bg-primary text-primary-foreground shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block"
							>
								Start Learning Free →
							</Link>

							<Link
								href="/courses"
								className="px-6 py-3 rounded-lg border border-border bg-white/60 backdrop-blur hover:bg-muted transition-all duration-300 inline-block"
							>
								Explore Courses
							</Link>
						</div>
						{/* Social Proof */}
						<div className="flex items-center gap-4 pt-4">
							<div className="flex space-x-4">
								<Facebook className="w-10 h-10 text-blue-600" />
								<Youtube className="w-10 h-10 text-gray-200 fill-red-600" />
								<Linkedin className="w-10 h-10 text-blue-700" />
								<Instagram className="w-10 h-10 text-pink-500" />
							</div>
							<p className="text-sm text-muted-foreground">
								⭐⭐⭐⭐⭐ 4.9/5 from 2,000+ Reviews
							</p>
						</div>
					</div>
					{/* RIGHT VISUAL SECTION */}
					<div className="relative flex justify-end items-center ">
						{/* Main Visual Wrapper */}
						<div className="relative ">
							{/* Glow Background */}
							<div className="absolute inset-0 bg-gradient-to-br from-lime-300/20 to-accent-blue/20 rounded-[30%] blur-3xl scale-110 z-0" />

							{/* Main Image */}
							<img
								src="/hero-student.png"
								alt="Student Learning"
								className="relative w-full object-contain drop-shadow-2xl"
							/>

							{/* Floating Card - Top Left */}
							<div className="absolute top-10 left-16 bg-gradient-to-r from-indigo-500 to-purple-300 p-4 rounded-xl shadow-lg w-56 text-white">
								<p className="font-semibold text-sm">
									UI/UX Design Masterclass
								</p>
								<p className="text-xs text-white/80">
									1,200 Students
								</p>
							</div>

							{/* Floating Card - Bottom Right */}
							<div className="absolute bottom-48 -right-16 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-card w-56">
								<p className="text-sm font-medium">
									Your Progress
								</p>

								<div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
									<div
										className="h-2 bg-primary rounded-full transition-all duration-1000 ease-out"
										style={{ width: `${progress}%` }}
									></div>
								</div>

								<p className="text-xs mt-1 text-muted-foreground">
									{progress}% Complete
								</p>
							</div>

							{/* Floating Card - Middle Left */}
							<div className="absolute bottom-28 -left-20 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-card w-56">
								<div className="flex items-center justify-between gap-3">
									<div>
										<p className="text-sm font-medium">
											Live Mentorship
										</p>
										<p className="text-xs text-muted-foreground">
											Every Week
										</p>
									</div>

									{/* Icon with Live Dot */}
									<div className="relative">
										<Users className="w-6 h-6 text-primary" />

										{/* Green Live Dot */}
										<span className="absolute -top-1 -right-1 flex h-3 w-3">
											<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
											<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
										</span>
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
