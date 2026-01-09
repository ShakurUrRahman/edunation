import { getCourseDetails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getInstructorDashboardData } from "@/lib/dashboard-helper";

const reviews = [
	{
		id: 1,
		student: { name: "John Doe" },
		review: "Nice Course, Thanks for the help",
		rating: 5,
	},
	{
		id: 1,
		student: { name: "John Smilga" },
		review: "Nice Course, Thanks for the help",
		rating: 5,
	},
];

type PageProps = {
	params: Promise<{ courseId: string }>;
};

const ReviewsPage = async ({ params }: PageProps) => {
	const { courseId } = await params;
	const course = await getCourseDetails(courseId);

	console.log(courseId);

	return (
		<div className="p-6">
			<h2>{course?.title}</h2>
			<DataTable columns={columns} data={reviews} />
		</div>
	);
};

export default ReviewsPage;
