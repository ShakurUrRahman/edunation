import { SectionTitle } from "@/components/section-title";
import { getCourseDetailsByInstructor } from "@/queries/courses";
import Courses from "./components/courses";
import InstructorDetails from "./components/instructor-details";
import { getUserByEmail, getUserDetailsById } from "@/queries/users";
import { auth } from "@/auth";

type PageProps = {
	params: Promise<{ id: string }>;
};

const InstructorProfile = async ({ params }: PageProps) => {
	const { id } = await params;
	const instructorDetails = await getUserDetailsById(id);
	const coursesOfInstructor = await getCourseDetailsByInstructor(id);

	const courseDetailsByInstructor = JSON.parse(
		JSON.stringify(coursesOfInstructor),
	);

	const session = await auth();
	const loggedInUser = await getUserByEmail(session?.user?.email);

	return (
		/* Min-height screen and responsive padding.
		   Added overflow-x-hidden to prevent layout shift on small devices.
		*/
		<section
			id="instructor-profile"
			className="relative py-8 lg:py-12 min-h-screen overflow-x-hidden mb-6 md:mb-32"
		>
			<div className="container mx-auto px-4">
				{/* Grid System:
				   1. Stacks vertically on mobile (cols-12 + col-span-12)
				   2. Sidebar (InstructorDetails) takes 4 cols on lg screens
				   3. Main Content (Courses) takes 8 cols on lg screens
				*/}
				<div className="grid grid-cols-12 gap-y-10 lg:gap-x-12 items-start">
					{/* Left Column: Instructor Info Sidebar */}
					<div className="col-span-12 lg:col-span-4">
						<InstructorDetails
							courseDetailsByInstructor={
								courseDetailsByInstructor
							}
							instructorDetails={instructorDetails}
						/>
					</div>

					{/* Right Column: Courses List */}
					<div className="col-span-12 lg:col-span-8">
						<div className="flex flex-col">
							{/* Heading adjustments for mobile:
							   Center text on mobile, left-align on desktop
							*/}
							<div className="mb-8 text-center lg:text-left">
								<SectionTitle className="text-2xl md:text-3xl font-bold">
									Courses
								</SectionTitle>
								<p className="text-muted-foreground text-sm mt-1">
									Explore all courses taught by{" "}
									{instructorDetails?.firstName}
								</p>
							</div>

							<div className="w-full">
								<Courses
									courses={courseDetailsByInstructor?.courses}
									loggedInUser={loggedInUser}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default InstructorProfile;
