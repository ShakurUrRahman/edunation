import Test from "@/components/Test";
import { Button } from "@/components/ui/button";
import { getCourses } from "@/queries/courses";

export default async function Home() {
	const courses = await getCourses();
	console.log(courses);

	console.log(courses[0]?.instructor?.socialMedia);
	console.log(courses[0]?.testimonials);
	console.log(courses[0]?.modules);

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
			<p>Shakur</p>
			<Button>Click</Button>
			<Test />
		</div>
	);
}
