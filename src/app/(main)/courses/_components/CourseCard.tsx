import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Eye } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { EnrollCourse } from "@/components/enroll-course";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CourseCard = ({ course, loggedInUser }) => {
	const router = useRouter();
	return (
		<div className="group relative hero rounded-2xl overflow-hidden border border-primary shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
			{/* Thumbnail */}
			<div className="relative overflow-hidden">
				<Link href={`/courses/${course.id}`}>
					<Image
						src={course?.thumbnail}
						alt={course?.title}
						width={500}
						height={300}
						className="w-full h-52 object-cover transition duration-500 group-hover:scale-110"
					/>
				</Link>

				{/* Category Badge */}
				<div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium shadow-sm">
					{course?.category?.title}
				</div>

				{/* Preview Button (overlay) */}
				<Link
					href={`/courses/${course.id}`}
					className="absolute inset-0 flex items-center justify-center 
					bg-black/50 opacity-0 group-hover:opacity-100 
					transition duration-300"
				>
					<span className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:scale-105 transition">
						<Eye className="h-4 w-4" />
						Preview
					</span>
				</Link>
			</div>

			{/* Content */}
			<Link
				href={`/courses/${course.id}`}
				className="block p-5 space-y-3"
			>
				<h3 className="text-xl font-semibold leading-snug line-clamp-2 group-hover:text-primary transition">
					{course?.title}
				</h3>

				<div className="flex mb-8 items-center text-xs text-muted-foreground gap-2">
					<BookOpen className="h-4 w-4" />
					<span>{course?.modules?.length || 0} Chapters</span>
				</div>
				<div className="">
					<button className="mt-2  px-4 py-2 w-full bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition">
						See Course Details
					</button>
				</div>
			</Link>

			{/* Footer */}
			<div className="flex items-center justify-between px-5 pb-8 pt-2 border-t border-border/50">
				<span className="text-lg font-bold text-primary">
					{formatPrice(course?.price)}
				</span>

				{!loggedInUser ? (
					<Button
						type="submit"
						variant="ghost"
						className="text-xs text-sky-700 h-7 gap-1"
						onClick={() =>
							router.push(
								`/signin?redirect=/courses/${course?.id}`,
							)
						}
					>
						Enroll
						<ArrowRight className="w-3" />
					</Button>
				) : (
					<EnrollCourse asLink={true} courseId={course.id} />
				)}
			</div>
		</div>
	);
};

export default CourseCard;
