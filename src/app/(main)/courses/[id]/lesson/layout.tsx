import { CourseProgress } from "@/components/course-progress";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import { Lock } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";
import { CourseSidebar } from "./_components/course-sidebar";

import { getLoggedInUser } from "@/lib/loggedIn-user";
import { redirect } from "next/navigation";

import { hasEnrollmentForCourse } from "@/queries/enrollments";

type PageProps = {
	params: Promise<{ id: string }>;
};

const CourseLayout = async ({ children, params }: PageProps) => {
	const loggedInUser = await getLoggedInUser();
	if (!loggedInUser) {
		redirect("/login");
	}

	const { id } = await params;
	const isEnrolled = await hasEnrollmentForCourse(id, loggedInUser.id);

	if (!isEnrolled) {
		redirect("/courses");
	}

	return (
		<div className="">
			<div className="h-[80px] lg:pl-96 fixed top-15 inset-y-0 w-full z-10">
				<div className="flex lg:hidden p-4 border-b h-full items-center hero shadow-sm relative">
					{/* Course Sidebar For Mobile */}
					<CourseSidebarMobile courseId={id} />
					{/* <NavbarRoutes /> */}
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-12">
				<div className="hidden lg:flex h-full w-96 flex-col inset-y-0 z-50">
					{/* sidebar starts */}
					<CourseSidebar courseId={id} />
					{/* sidebar ends */}
				</div>
				<main className="lg:pl-96 pt-[80px] lg:pt-5 h-full col-span-10 px-4">
					{children}
				</main>
			</div>
		</div>
	);
};
export default CourseLayout;
