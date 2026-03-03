// import { CourseProgress } from "@/components/course-progress";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";
import EnrolledCourseCard from "../../component/enrolled-course-card";
import Link from "next/link";
import { BookOpen } from "lucide-react"; // For the empty state icon

async function EnrolledCourses() {
	const session = await auth();

	if (!session?.user) {
		redirect("/login");
	}

	const loggedInUser = await getUserByEmail(session?.user?.email);
	const enrollments = await getEnrollmentsForUser(loggedInUser?.id);

	return (
		<div className="w-full">
			{/* Header section for better context */}
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-foreground">
					My Courses
				</h2>
				<p className="text-muted-foreground text-sm">
					Continue where you left off
				</p>
			</div>

			{enrollments && enrollments.length > 0 ? (
				/* Responsive Grid:
                   - 1 column on mobile
                   - 2 columns on small/medium desktop (within the 3/4 layout)
                   - 3 columns if the screen is very wide (optional)
                */
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
					{enrollments.map((enrollment) => (
						<Link
							key={enrollment?.id}
							href={`/courses/${enrollment.course._id.toString()}/lesson`}
							className="flex transition-transform duration-200 active:scale-[0.98]"
						>
							<EnrolledCourseCard enrollment={enrollment} />
						</Link>
					))}
				</div>
			) : (
				/* Professional Empty State */
				<div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-primary/20 rounded-2xl bg-muted/5">
					<div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
						<BookOpen className="w-8 h-8 text-primary/60" />
					</div>
					<h3 className="text-lg font-semibold">
						No Enrollments Found
					</h3>
					<p className="text-muted-foreground text-center max-w-[250px] mt-2 mb-6">
						You haven't enrolled in any courses yet. Start learning
						today!
					</p>
					<Link
						href="/courses"
						className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
					>
						Browse Courses
					</Link>
				</div>
			)}
		</div>
	);
}

export default EnrolledCourses;
