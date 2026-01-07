import { CourseProgress } from "@/components/course-progress";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import {
	getCourseDetails,
	getCourseDetailsByInstructor,
} from "@/queries/courses";

import Courses from "./components/courses";
import InstructorDetails from "./components/instructor-details";
import { getUserDetailsById } from "@/queries/users";

type PageProps = {
	params: Promise<{ id: string }>;
};

const InstructorProfile = async ({ params }: PageProps) => {
	const { id } = await params;
	const instructorDetails = await getUserDetailsById(id);
	const courseDetailsByInstructor = await getCourseDetailsByInstructor(id);

	console.log(instructorDetails);

	return (
		<section
			id="categories"
			className="space-y-6  py-6  lg:py-12 min-h-screen"
		>
			<div className="container grid grid-cols-12 lg:gap-x-8 gap-y-8">
				{/* Instructor Info */}
				<InstructorDetails
					courseDetailsByInstructor={courseDetailsByInstructor}
					instructorDetails={instructorDetails}
				/>
				{/* Courses */}
				<div className="col-span-12 lg:col-span-8">
					<div>
						<SectionTitle className="mb-6">Courses</SectionTitle>
						<Courses courses={courseDetailsByInstructor?.courses} />
					</div>
				</div>
			</div>
		</section>
	);
};
export default InstructorProfile;
