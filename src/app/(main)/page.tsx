"";

import { SectionTitle } from "@/components/section-title";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/queries/categories";
import { getCourseList } from "@/queries/courses";

import CourseCard from "./courses/_components/CourseCard";
import HeroSection from "./_components/HeroSection";
import CategoriesSection from "./_components/CategoriesSection";

const HomePage = async () => {
	const courses = await getCourseList();
	const categories = await getCategories();

	return (
		<>
			<HeroSection />
			{/* Categories Section */}
			<CategoriesSection categories={categories} />
			{/* Courses */}

			<section className="py-24 bg-slate-50 hero">
				<div className="container mx-auto px-6 lg:px-12">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						{/* LEFT CONTENT */}
						<div className="relative">
							<div className="rounded-3xl overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-all duration-500">
								<img
									src="/assets/images/about/about.png"
									alt="About Us"
									className="w-full object-cover"
								/>
							</div>

							{/* Decorative Blur Glow */}
							<div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
						</div>

						{/* RIGHT IMAGE */}
						<div className="space-y-4 mb-20">
							<p className="inline-flex text-center items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-border text-sm font-medium">
								Who We Are?
							</p>
							<h2 className="text-6xl md:text-5xl font-bold leading-14 ">
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
								We are building a modern learning platform
								designed to help students master real-world
								skills. Our mission is to make high-quality
								education accessible, practical, and
								career-focused.
							</p>

							{/* Features */}
							<div className="mt-8 space-y-3">
								<div className="flex items-center gap-3">
									<div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs">
										✓
									</div>
									<span className="font-medium">
										Industry Expert Instructors
									</span>
								</div>

								<div className="flex items-center gap-3">
									<div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs">
										✓
									</div>
									<span className="font-medium">
										Project Based Learning
									</span>
								</div>

								<div className="flex items-center gap-3">
									<div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs">
										✓
									</div>
									<span className="font-medium">
										Lifetime Access
									</span>
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
			<section
				id="courses"
				className="container space-y-6   md:py-12 lg:py-24"
			>
				<div className="flex items-center justify-between">
					<SectionTitle>Courses</SectionTitle>
					<Link
						href={"/courses"}
						className=" text-sm font-medium  hover:opacity-80 flex items-center gap-1"
					>
						Browse All <ArrowRightIcon className="h-4 w-4" />
					</Link>
				</div>
				<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
					{courses.map((course) => {
						return <CourseCard key={course.id} course={course} />;
					})}
				</div>
			</section>
		</>
	);
};
export default HomePage;
