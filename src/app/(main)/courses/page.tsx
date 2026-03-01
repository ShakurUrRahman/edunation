import { getCategories } from "@/queries/categories";
import CoursesClient from "./_components/CoursesClient";
import { getCourseList } from "@/queries/courses";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";

export default async function CoursesPage() {
	const session = await auth();

	const loggedInUser = await getUserByEmail(session?.user?.email);

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
		<div className="container mt-24 mb-48">
			<CoursesClient
				courses={courses}
				categories={categories}
				loggedInUser={loggedInUser}
			/>
		</div>
	);
}
