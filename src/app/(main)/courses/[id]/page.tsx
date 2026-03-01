import { notFound } from "next/navigation";
import CourseHeroBanner from "./_components/CourseHeroBanner";
import CourseDetailsClient from "./_components/CourseDetailsClient";
import {
	getCourseDetails,
	getCourseDetailsByInstructor,
} from "@/queries/courses";
import { getCourseList } from "@/queries/courses";
import { getUserByEmail, getUserDetailsById } from "@/queries/users";
import { auth } from "@/auth";
import { hasEnrollmentForCourse } from "@/queries/enrollments";

type PageProps = {
	params: Promise<{ id: string }>;
};

const SingleCoursePage = async ({ params }: PageProps) => {
	const { id } = await params;
	const rawCourse = await getCourseDetails(id);
	const rawInstructorDetails = await getCourseDetailsByInstructor(
		rawCourse.instructor._id.toString(),
		true,
	);
	const rawInstructorPersonalDetails = await getUserDetailsById(
		rawCourse.instructor._id.toString(),
	);
	// console.log(rawInstructorPersonalDetails);
	if (!rawCourse) notFound();

	// Convert MongoDB objects (ObjectIds/Dates) into plain strings/numbers
	const course = JSON.parse(JSON.stringify(rawCourse));
	const instructorDetails = JSON.parse(JSON.stringify(rawInstructorDetails));
	const instructorPersonalDetails = JSON.parse(
		JSON.stringify(rawInstructorPersonalDetails),
	);

	const session = await auth();

	const loggedInUser = await getUserByEmail(session?.user?.email);

	const hasEnrollment = await hasEnrollmentForCourse(
		course?.id,
		loggedInUser?.id,
	);

	// Related: same instructor, different course
	const allCourses = await getCourseList();
	// const relatedCourses = allCourses.filter(
	// 	(c: any) =>
	// 		c.instructor?._id?.toString() ===
	// 			course.instructor?._id?.toString() && c.id !== course.id,
	// );

	return (
		<>
			<CourseDetailsClient
				course={course}
				instructorDetails={instructorDetails}
				instructorPersonalDetails={instructorPersonalDetails}
				hasEnrollment={hasEnrollment}
				loggedInUser={loggedInUser}
				// relatedCourses={relatedCourses}
			/>
		</>
	);
};

export default SingleCoursePage;
