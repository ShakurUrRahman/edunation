import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button, buttonVariants } from "@/components/ui/button";
import { EnrollCourse } from "@/components/enroll-course";

const CourseCard = ({ course }) => {
	return (
		<div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
			<Link key={course.id} href={`/courses/${course.id}`}>
				<div className="relative">
					<img
						src={course?.thumbnail}
						alt={course?.title}
						className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
					/>
					<div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
						Best Seller
					</div>
				</div>

				<div className="p-6">
					<h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition">
						{course?.title}
					</h3>
					{course?.category?.title}
					<p className="text-gray-500 text-sm mb-4">
						Learn modern web development from scratch with
						real-world projects.
					</p>
					<span>{course?.modules?.length} Chapters</span>
				</div>
			</Link>
			<div className="flex items-center justify-between">
				<span className="text-primary font-bold">
					{formatPrice(course?.price)}
				</span>
				<EnrollCourse asLink={true} courseId={course.id} />
			</div>
		</div>
	);
};

export default CourseCard;
