// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { SectionTitle } from "@/components/section-title";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import { CheckCheck } from "lucide-react";
// import { Presentation } from "lucide-react";
// import { UsersRound } from "lucide-react";
// import { Star } from "lucide-react";
// import { MessageSquare } from "lucide-react";
// import { BookCheck } from "lucide-react";
// import { Clock10 } from "lucide-react";
// import { Radio } from "lucide-react";
// import {
// 	Carousel,
// 	CarouselContent,
// 	CarouselItem,
// 	CarouselNext,
// 	CarouselPrevious,
// } from "@/components/ui/carousel";
// import {
// 	Accordion,
// 	AccordionContent,
// 	AccordionItem,
// 	AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Video } from "lucide-react";
// import { NotepadText } from "lucide-react";
// import { FileQuestion } from "lucide-react";
// import { PlayCircle } from "lucide-react";
// import { SquarePlay } from "lucide-react";
// import { Tv } from "lucide-react";
// import { StickyNote } from "lucide-react";
// import { BookOpen } from "lucide-react";
// // import { CourseProgress } from "@/components/course-progress";
// import { ArrowRight } from "lucide-react";
// import { formatPrice } from "@/lib/formatPrice";
// import { getCourseDetails } from "@/queries/courses";
// import CourseDetailsIntro from "./_components/CourseDetailsIntro";
// import CourseDetails from "./_components/CourseDetails";
// import Testimonials from "./_components/Testimonials";
// import RelatedCourses from "./_components/RelatedCourses";
// import { replaceMongoIdInArray } from "@/lib/convertData";

// type PageProps = {
// 	params: Promise<{ id: string }>;
// };

// const SingleCoursePage = async ({ params }: PageProps) => {
// 	const { id } = await params;
// 	const course = await getCourseDetails(id);

// 	console.log("Course details:", course);

// 	return (
// 		<>
// 			<CourseDetailsIntro course={course} />
// 			<CourseDetails course={course} />
// 			{/* Testimonials */}
// 			{course?.testimonials && (
// 				<Testimonials
// 					testimonials={replaceMongoIdInArray(course?.testimonials)}
// 				/>
// 			)}
// 			{/* Related Course */}
// 			<RelatedCourses />
// 			{/* Authors */}
// 			{/* https://avatars.githubusercontent.com/u/1416832?v=4 */}
// 			{/* https://avatars.githubusercontent.com/u/3633137?v=4 */}
// 		</>
// 	);
// };
// export default SingleCoursePage;

// app/(main)/courses/[courseId]/page.tsx

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
	console.log(rawInstructorPersonalDetails);
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
				// relatedCourses={relatedCourses}
			/>
		</>
	);
};

export default SingleCoursePage;
