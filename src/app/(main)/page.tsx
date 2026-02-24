import { getCategories } from "@/queries/categories";
import { getCourseList } from "@/queries/courses";

import HeroSection from "./_components/HeroSection";
import CategoriesSection from "./_components/CategoriesSection";
import CriteriaSection from "./_components/CriteriaSection";
import AboutUsSection from "./_components/AboutUsSection";
import CoursesSection from "./_components/CoursesSection";
import { id } from "date-fns/locale";
import { describe } from "zod/v4/core";
import TestimonialSection from "./_components/TestimonialSection";

const HomePage = async () => {
	const courses = (await getCourseList()).map((course) => ({
		id: course.id,
		title: course.title,
		price: course?.price ?? null,
		thumbnail: course?.thumbnail ?? null,

		category: course?.category
			? {
					id: course.category._id?.toString(),
					title: course.category.title ?? null,
				}
			: null,

		instructor: course?.instructor
			? {
					id: course.instructor._id?.toString(),
					name: course.instructor.name ?? null,
					avatar: course.instructor.avatar ?? null,
				}
			: null,

		modules: (course?.modules ?? []).map((mod) => ({
			id: mod._id?.toString(),
			title: mod.title ?? null,
			order: mod.order ?? null,
		})),

		testimonials: (course?.testimonials ?? []).map((t) => ({
			id: t._id?.toString(),
			content: t.content ?? null,
			rating: t.rating ?? null,
		})),
	}));
	// console.log(categories);
	const categories = (await getCategories()).map((cat) => ({
		id: cat?.id,
		title: cat?.title,
		description: cat?.description,
		thumbnail: cat?.thumbnail,
	}));

	return (
		<>
			<HeroSection />
			<CriteriaSection />
			<CategoriesSection categories={categories} />
			<AboutUsSection />
			<CoursesSection courses={courses} categories={categories} />
			<TestimonialSection />
		</>
	);
};
export default HomePage;
