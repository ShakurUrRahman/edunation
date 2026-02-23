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
import CriteriaSection from "./_components/CriteriaSection";
import AboutUsSection from "./_components/AboutUsSection";
import CoursesSection from "./_components/CoursesSection";

const HomePage = async () => {
	const courses = await getCourseList();
	const categories = await getCategories();

	return (
		<>
			<HeroSection />
			<CriteriaSection />
			<CategoriesSection categories={categories} />
			<AboutUsSection />
			<CoursesSection courses={courses} categories={categories} />
		</>
	);
};
export default HomePage;
