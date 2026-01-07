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
	return (
		<div className="col-span-12 lg:col-span-4 ">
			<div className="p-6 shadow hero border border-primary/40 rounded-lg">
				<div className="mb-6">
					<div className="w-36 h-36 rounded-full  mb-5 mx-auto overflow-hidden">
						<img
							src={instructorDetails?.profilePicture}
							alt=""
							className="w-full h-full object-cover rounded"
						/>
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
									{courseDetailsByInstructor?.courses?.length}
									+ Courses
								</div>
							</li>
							<li className="flex items-center space-x-3">
								<UsersRound className="text-gray-600 w-4" />
								<div>
									{courseDetailsByInstructor?.enrollments}+
									Students
								</div>
							</li>
							<li className="flex items-center space-x-3">
								<MessageSquare className="text-gray-600 w-4" />
								<div>
									{courseDetailsByInstructor?.reviews}+
									Reviews
								</div>
							</li>
							<li className="flex items-center space-x-3">
								<Star className="text-gray-600 w-4" />
								<div>
									{courseDetailsByInstructor?.ratings} Average
									Rating
								</div>
							</li>
						</ul>
					</div>
				</div>
				<p className="text-gray-600 text-xs leading-[1.8]">
					{instructorDetails?.bio}
				</p>
			</div>
		</div>
	);
};

export default InstructorDetails;
