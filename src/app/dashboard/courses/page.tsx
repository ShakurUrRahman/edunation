import {
	COURSE_DATA,
	getInstructorDashboardData,
} from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export const dynamic = "force-dynamic";

const CoursesPage = async () => {
	const courses = await getInstructorDashboardData(COURSE_DATA);

	const courseList = courses.map((course) => ({
		id: course._id.toString(),
		title: course.title,
		description: course.description,
		price: course.price,
		active: course.active,
	}));

	// console.log(courses);

	return (
		<div className="p-6">
			<DataTable columns={columns} data={courseList} />
		</div>
	);
};

export default CoursesPage;
