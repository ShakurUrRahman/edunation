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
