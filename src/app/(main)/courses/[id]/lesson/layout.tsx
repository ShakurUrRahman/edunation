import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";
import { CourseSidebar } from "./_components/course-sidebar";
import { getLoggedInUser } from "@/lib/loggedIn-user";
import { redirect } from "next/navigation";
import { hasEnrollmentForCourse } from "@/queries/enrollments";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type PageProps = {
	children: React.ReactNode;
	params: Promise<{ id: string }>;
};

const CourseLayout = async ({ children, params }: PageProps) => {
	const loggedInUser = await getLoggedInUser();
	if (!loggedInUser) redirect("/login");

	const { id } = await params;
	const isEnrolled = await hasEnrollmentForCourse(id, loggedInUser.id);
	if (!isEnrolled) redirect("/courses");

	return (
		<div className="h-full">
			{/* ── Hide the main site nav on this page only ─────────────────
			    Injects a style tag that sets the site header to display:none.
			    Works because the header is a <header> tag in MainNav.        */}
			<style>{`
				body > div > header,footer,
				header.fixed { display: none !important; }
			`}</style>

			{/* ── Mobile top bar ───────────────────────────────────────────── */}
			<div className="lg:hidden flex fixed top-0 inset-x-0 z-[100] h-14 bg-white border-b shadow-sm">
				<Link
					href={`/courses/${id}`}
					className="flex pl-3 items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
				</Link>
				<div className="flex items-center gap-3 px-4 h-full">
					{/* Pass CourseSidebar as children — server component stays server-side */}
					<CourseSidebarMobile>
						<CourseSidebar courseId={id} />
					</CourseSidebarMobile>

					<span className="font-semibold text-sm text-gray-700 truncate">
						Course Content
					</span>
				</div>
			</div>

			{/* ── Desktop top bar (replaces main nav) ──────────────────────── */}
			<div className="hidden lg:flex fixed top-0 inset-x-0 z-[100] h-[60px] bg-white/80 backdrop-blur-md border-b shadow-sm items-center px-6 gap-4">
				<Link
					href={`/courses/${id}`}
					className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Course
				</Link>

				{/* Logo */}
				<div className="flex-1 flex justify-center">
					<Link href="/">
						<img
							src="/logo.png"
							className="h-8 w-auto"
							alt="Logo"
						/>
					</Link>
				</div>
			</div>

			{/* ── Desktop sidebar ───────────────────────────────────────────── */}
			<div
				className="hidden lg:flex flex-col fixed left-0 z-[90] w-80 border-r bg-white"
				style={{ top: "60px", bottom: 0 }}
			>
				<CourseSidebar courseId={id} />
			</div>

			{/* ── Main content ──────────────────────────────────────────────── */}
			<main className="lg:pl-80 pt-14 lg:pt-[60px] min-h-screen bg-gray-50/50">
				<div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
					{children}
				</div>
			</main>
		</div>
	);
};

export default CourseLayout;
