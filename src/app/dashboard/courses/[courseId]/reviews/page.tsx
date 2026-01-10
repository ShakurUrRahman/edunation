import { getCourseDetails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import {
	getInstructorDashboardData,
	REVIEW_DATA,
} from "@/lib/dashboard-helper";
import { StarRating } from "@/components/star-rating";

type PageProps = {
	params: Promise<{ courseId: string }>;
};

const ReviewsPage = async ({ params }: PageProps) => {
	const { courseId } = await params;
	const course = await getCourseDetails(courseId);
	const reviews = await getInstructorDashboardData(REVIEW_DATA);

	const reviewDataForCourse = reviews.filter(
		(review) => review?.courseId.toString() == courseId
	);

	const reviewData = reviewDataForCourse.map((review) => ({
		id: review.id,
		content: review.content,
		rating: review.rating,
		studentName: review.studentName,
	}));

	// console.log(reviewDataForCourse);

	return (
		<div className="p-6">
			<h2>{course?.title}</h2>
			<DataTable columns={columns} data={reviewData} />
		</div>
	);
};

export default ReviewsPage;
