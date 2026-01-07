import { Presentation } from "lucide-react";
import { UsersRound } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Star } from "lucide-react";

import { getCourseDetailsByInstructor } from "@/queries/courses";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const CourseInstructor = async ({ course }) => {
	const instructor = course?.instructor;

	const fullName = `${instructor?.firstName}  ${instructor?.lastName}`;
	const courseDetailsByInstructor = await getCourseDetailsByInstructor(
		instructor._id.toString()
	);

	// console.log(courseDetailsByInstructor);

	return (
		<div className="bg-gray-50 rounded-md p-8">
			<div className="md:flex md:gap-x-5 mb-8">
				<div className="h-77.5 w-67.5 max-w-full flex-none rounded mb-5 md:mb-0">
					<Image
						src={instructor?.profilePicture}
						alt={fullName}
						className="w-full h-full object-cover rounded"
						width={500}
						height={700}
					/>
				</div>
				<div className="flex-1">
					<div className="max-w-75">
						<h4 className="text-[34px] font-bold leading-12.75">
							{fullName}
						</h4>
						<div className="text-gray-600 font-medium mb-6">
							{instructor?.designation}
						</div>
						<ul className="list space-y-4">
							<li className="flex items-center space-x-3">
								<Presentation className="text-gray-600" />
								<div>
									{courseDetailsByInstructor?.courses?.length}{" "}
									Course(s)
								</div>
							</li>
							<li className="flex space-x-3">
								<UsersRound className="text-gray-600" />
								<div>
									{courseDetailsByInstructor?.enrollments}{" "}
									Student Learned
								</div>
							</li>
							<li className="flex space-x-3">
								<MessageSquare className="text-gray-600" />
								<div>
									{courseDetailsByInstructor?.reviews} Reviews
								</div>
							</li>
							<li className="flex space-x-3">
								<Star className="text-gray-600" />
								<div>
									{courseDetailsByInstructor?.ratings} Average
									Rating
								</div>
							</li>
							<Link
								href={`/instructor-profile/${instructor?._id}`}
								className={cn(buttonVariants({ size: "lg" }))}
							>
								Instructor details
							</Link>
						</ul>
					</div>
				</div>
			</div>
			<p className="text-gray-600">{instructor?.bio}</p>
		</div>
	);
};

export default CourseInstructor;
