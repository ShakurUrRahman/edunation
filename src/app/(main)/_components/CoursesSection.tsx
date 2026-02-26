"use client";

import Link from "next/link";
import CourseCard from "../courses/_components/CourseCard";
import { ArrowRightIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { useEffect, useRef, useState } from "react";

export default function CoursesSection({ courses, categories }) {
	const [activeTab, setActiveTab] = useState("All");
	const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
	const tabsRef = useRef({});

	useEffect(() => {
		const activeEl = tabsRef.current[activeTab];
		if (activeEl) {
			const rect = activeEl.getBoundingClientRect();
			const parentRect = activeEl.parentElement.getBoundingClientRect();
			setUnderlineStyle({
				left: rect.left - parentRect.left,
				width: rect.width,
			});
		}
	}, [activeTab]);

	return (
		<section className="hero">
			<div className="py-26">
				<div className="container mx-auto px-6">
					{/* Section Header */}
					<div className="mb-16 text-center">
						<p className="inline-flex items-center mb-6 gap-2 px-4 py-2 rounded-full bg-primary/5 backdrop-blur shadow-sm border border-green-200 text-sm font-medium">
							Popular Courses
						</p>
						<h2 className="text-6xl md:text-5xl font-bold leading-16">
							Highly Rated{" "}
							<span className="relative inline-block bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
								Skill Development
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
											/>
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
							Programs Today
						</h2>
					</div>

					{/* ✅ Single Tabs wrapper — value + onValueChange both here */}
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full"
					>
						{/* Tabs Header */}
						<div className="relative flex mx-auto justify-center mb-12">
							<TabsList className="relative flex justify-center bg-transparent p-0 space-x-8">
								{/* All Courses Tab */}
								<TabsTrigger
									value="All"
									ref={(el) => (tabsRef.current["All"] = el)}
									className="relative px-4 pb-4 text-base font-semibold text-muted-foreground data-[state=active]:text-black"
								>
									All Courses
								</TabsTrigger>

								{/* Category Tabs */}
								{categories.slice(0, 3).map((cat) => (
									<TabsTrigger
										key={cat.id}
										value={cat.id}
										ref={(el) =>
											(tabsRef.current[cat.id] = el)
										}
										className="relative px-4 py-4 text-base font-semibold text-muted-foreground data-[state=active]:text-black"
									>
										{cat.title}
									</TabsTrigger>
								))}

								{/* SVG Underline */}
								<span
									className="absolute -bottom-1 h-3 transition-all duration-300"
									style={{
										left: underlineStyle.left,
										width: underlineStyle.width,
									}}
								>
									<svg
										className="w-full h-full"
										viewBox="0 0 200 20"
										fill="none"
										preserveAspectRatio="none"
									>
										<defs>
											<linearGradient
												id="tabLineGradient"
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
										<path
											d="M0 15 Q100 0 200 15"
											stroke="url(#tabLineGradient)"
											strokeWidth="3"
										/>
									</svg>
								</span>
							</TabsList>
						</div>

						{/* All Courses */}
						<TabsContent value="All">
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
								{courses.slice(0, 3).map((course) => (
									<CourseCard
										key={course.id}
										course={course}
									/>
								))}
							</div>
						</TabsContent>

						{/* Category Based Courses */}
						{categories.map((cat) => {
							const filteredCourses = courses
								.filter(
									(course) => course?.category?.id === cat.id,
								)
								.slice(0, 3);

							return (
								<TabsContent key={cat.id} value={cat.id}>
									{filteredCourses.length > 0 ? (
										<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
											{filteredCourses.map((course) => (
												<CourseCard
													key={course.id}
													course={course}
												/>
											))}
										</div>
									) : (
										<div className="text-center py-24 flex flex-col items-center gap-3">
											<div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl">
												📚
											</div>
											<p className="text-muted-foreground text-sm">
												No courses found in{" "}
												<span className="font-semibold text-primary">
													{cat.title}
												</span>
											</p>
										</div>
									)}
								</TabsContent>
							);
						})}
					</Tabs>

					{/* View All Button */}
					<div className="text-center mt-16">
						<Link
							href="/courses"
							className="px-8 py-3 bg-gradient-to-r from-primary to-teal-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block hover:font-bold"
						>
							View All Courses
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
