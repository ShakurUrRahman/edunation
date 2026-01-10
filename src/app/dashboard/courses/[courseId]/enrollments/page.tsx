import {
	ENROLLMENT_DATA,
	getInstructorDashboardData,
} from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getCourseDetails } from "@/queries/courses";

type PageProps = {
	params: Promise<{ courseId: string }>;
};

const EnrollmentsPage = async ({ params }: PageProps) => {
	const { courseId } = await params;
	const course = await getCourseDetails(courseId);
	const enrollments = await getInstructorDashboardData(ENROLLMENT_DATA);

	const enrollmentForCourse = enrollments.filter(
		(enrollment) => enrollment?.course.toString() == courseId
	);

	const enrollmentData = enrollmentForCourse.map((enrollment) => ({
		id: enrollment.id,
		studentEmail: enrollment.studentEmail,
		studentName: enrollment.studentName,
		enrollmentDate: enrollment.enrollment_date,
		progress: enrollment.progress,
		quizMark: enrollment.quizMark,
	}));

	console.log(enrollments);

	return (
		<div className="p-6">
			<h2>{course?.title}</h2>
			<DataTable columns={columns} data={enrollmentData} />
		</div>
	);
};

export default EnrollmentsPage;
