// app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";
import { getCourseDetailsByInstructor } from "@/queries/courses";
import { formatPrice } from "@/lib/formatPrice";
import DashboardClient from "./_components/dashboard-client";

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
	const session = await auth();
	if (!session?.user) redirect("/login");

	const instructor = await getUserByEmail(session.user.email);
	if (instructor?.role !== "instructor") redirect("/login");

	// Basic stats
	const stats = await getCourseDetailsByInstructor(instructor.id);

	// Expanded data for charts
	const expanded = await getCourseDetailsByInstructor(instructor.id, true);

	// ── Per-course breakdown for the bar chart ─────────────────────────────
	const courseBreakdown = expanded.courses.map((course) => {
		const courseEnrollments = expanded.enrollments.filter(
			(e) => e.course?.toString() === course._id?.toString(),
		);
		const courseReviews = expanded.reviews.filter(
			(r) => r.courseId?.toString() === course._id?.toString(),
		);
		const avgRating =
			courseReviews.length > 0
				? courseReviews.reduce((s, r) => s + r.rating, 0) /
					courseReviews.length
				: 0;

		return {
			id: course._id?.toString(),
			title:
				course.title?.length > 20
					? course.title.slice(0, 20) + "…"
					: course.title,
			fullTitle: course.title,
			enrollments: courseEnrollments.length,
			revenue: courseEnrollments.length * (course.price ?? 0),
			rating: parseFloat(avgRating.toFixed(1)),
			price: course.price ?? 0,
			active: course.active,
			thumbnail: course.thumbnail ?? null,
		};
	});

	// ── Recent enrollments (last 6) ────────────────────────────────────────
	const recentEnrollments = expanded.enrollments
		.sort(
			(a, b) =>
				new Date(b.enrolledAt ?? b.createdAt ?? 0).getTime() -
				new Date(a.enrolledAt ?? a.createdAt ?? 0).getTime(),
		)
		.slice(0, 6)
		.map((e) => ({
			id: e._id?.toString(),
			courseId: e.course?.toString(),
			courseTitle:
				courseBreakdown.find((c) => c.id === e.course?.toString())
					?.fullTitle ?? "Course",
			enrolledAt: e.enrolledAt ?? e.createdAt ?? null,
		}));

	// ── Rating distribution ────────────────────────────────────────────────
	const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
		star,
		count: expanded.reviews.filter((r) => Math.round(r.rating) === star)
			.length,
	}));

	return (
		<DashboardClient
			instructor={{
				name: `${instructor.firstName} ${instructor.lastName}`,
				email: instructor.email,
				avatar: instructor.profilePicture ?? null,
				designation: instructor.designation ?? "Instructor",
			}}
			stats={{
				totalCourses: stats.courses.length,
				totalEnrollments: stats.enrollments,
				totalRevenue: stats.revenue,
				totalReviews: stats.reviews,
				avgRating: stats.ratings,
			}}
			courseBreakdown={courseBreakdown}
			recentEnrollments={recentEnrollments}
			ratingDist={ratingDist}
		/>
	);
};

export default DashboardPage;
