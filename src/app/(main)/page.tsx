import { getCategories } from "@/queries/categories";
import { getCourseList } from "@/queries/courses";
import { getAllTestimonials } from "@/queries/testimonials";

import HeroSection from "./_components/HeroSection";
import CategoriesSection from "./_components/CategoriesSection";
import CriteriaSection from "./_components/CriteriaSection";
import AboutUsSection from "./_components/AboutUsSection";
import CoursesSection from "./_components/CoursesSection";
import TestimonialSection from "./_components/TestimonialSection";

const HomePage = async () => {
	// ── Courses ────────────────────────────────────────────────────────────────
	const courses = (await getCourseList()).map((course) => ({
		id: course.id,
		title: course.title,
		price: course?.price ?? null,
		thumbnail: course?.thumbnail ?? null,

		category: course?.category
			? {
					id: course.category._id?.toString() ?? course.category.id,
					title: course.category.title ?? null,
				}
			: null,

		instructor: course?.instructor
			? {
					id:
						course.instructor._id?.toString() ??
						course.instructor.id,
					firstName: course.instructor.firstName ?? null,
					lastName: course.instructor.lastName ?? null,
				}
			: null,

		modules: (course?.modules ?? []).map((mod) => ({
			id: mod._id?.toString() ?? mod.id,
			title: mod.title ?? null,
			order: mod.order ?? null,
		})),

		testimonials: (course?.testimonials ?? []).map((t) => ({
			id: t._id?.toString() ?? t.id,
			rating: t.rating ?? null,
		})),
	}));

	// ── Categories ─────────────────────────────────────────────────────────────
	const categories = (await getCategories()).map((cat) => ({
		id: cat?.id,
		title: cat?.title,
		description: cat?.description,
		thumbnail: cat?.thumbnail,
	}));

	// ── Testimonials ───────────────────────────────────────────────────────────
	// getAllTestimonials() calls replaceMongoIdInArray → uses .id not ._id
	// user is populated by the query (firstName, lastName, profilePicture)
	const testimonials = (await getAllTestimonials()).map((test) => ({
		id: test.id, // replaceMongoId gives us .id
		content: test.content ?? "",
		rating: test.rating ?? 0,
		createdOn: test.createdOn ?? null,
		user: test.user
			? {
					firstName: test.user.firstName ?? "",
					lastName: test.user.lastName ?? "",
					profilePicture: test.user.profilePicture ?? null,
					designation: test.user.designation ?? null,
				}
			: {
					firstName: "Anonymous",
					lastName: "",
					profilePicture: null,
					designation: null,
				},
	}));

	return (
		<>
			<HeroSection />
			<CriteriaSection />
			<CategoriesSection categories={categories} />
			<AboutUsSection />
			<CoursesSection courses={courses} categories={categories} />
			<TestimonialSection testimonials={testimonials} />
		</>
	);
};

export default HomePage;
