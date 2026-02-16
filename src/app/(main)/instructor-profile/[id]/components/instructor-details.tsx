import { getAvatarGradient, getInitials } from "@/lib/utils";
import {
	ArrowRightIcon,
	MessageSquare,
	Presentation,
	Star,
	UsersRound,
} from "lucide-react";

const InstructorDetails = ({
	courseDetailsByInstructor,
	instructorDetails,
}) => {
	const hasProfilePicture = instructorDetails?.profilePicture;

	return (
		<div className="col-span-12 lg:col-span-4 ">
			<div className="p-6 shadow hero border border-primary/40 rounded-lg">
				<div className="mb-6">
					<div className="w-36 h-36 rounded-full  mb-5 mx-auto overflow-hidden">
						{hasProfilePicture ? (
							<img
								src={instructorDetails?.profilePicture}
								alt="Instructor"
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							<div
								className={`w-full h-full flex items-center justify-center text-white text-3xl font-bold bg-gradient-to-br ${getAvatarGradient(
									instructorDetails?.email,
								)}`}
							>
								{getInitials(
									instructorDetails?.firstName,
									instructorDetails?.lastName,
								)}
							</div>
						)}
					</div>

					<div>
						<h4 className="text-xl lg:text-2xl text-center">
							{instructorDetails?.firstName}{" "}
							{instructorDetails?.lastName}
						</h4>
						<div className="text-gray-600 font-medium mb-6 text-sm text-center">
							{instructorDetails?.designation}
						</div>
						<ul className=" items-center gap-3 flex-wrap text-sm text-gray-600 font-medium grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 md:grid-cols-4">
							<li className="flex items-center space-x-3">
								<Presentation className="text-gray-600 w-4" />
								<div>
									{courseDetailsByInstructor?.courses
										?.length > 1
										? courseDetailsByInstructor?.courses
												?.length + " Courses"
										: courseDetailsByInstructor?.courses
												?.length + " Course"}
								</div>
							</li>
							<li className="flex items-center space-x-3">
								<UsersRound className="text-gray-600 w-4" />
								<div>
									{courseDetailsByInstructor?.enrollments > 1
										? courseDetailsByInstructor?.enrollments +
											" Students"
										: courseDetailsByInstructor?.enrollments ===
											  1
											? "1 Student"
											: "No Students"}
								</div>
							</li>
							<li className="flex items-center space-x-3">
								<MessageSquare className="text-gray-600 w-4" />
								<div>
									{courseDetailsByInstructor?.reviews === 0
										? "No Reviews"
										: courseDetailsByInstructor?.reviews ===
											  1
											? "1 Review"
											: courseDetailsByInstructor?.reviews +
												" Reviews"}
								</div>
							</li>
							<li className="flex items-center space-x-3">
								<Star className="text-gray-600 w-4" />
								<div>
									{courseDetailsByInstructor?.ratings === 0
										? "No Ratings"
										: courseDetailsByInstructor?.ratings ===
											  1
											? "1 Average Rating"
											: courseDetailsByInstructor?.ratings +
												" Average Ratings"}
								</div>
							</li>
						</ul>
					</div>
				</div>
				<p className="text-gray-600 text-xs leading-[1.8]">
					{instructorDetails?.bio
						? instructorDetails?.bio
						: "No bio available."}
				</p>
			</div>
		</div>
	);
};

export default InstructorDetails;
