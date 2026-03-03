import { getAvatarGradient, getInitials } from "@/lib/utils";
import {
	MessageSquare,
	Presentation,
	Star,
	UsersRound,
	UserCheck,
} from "lucide-react";

const InstructorDetails = ({
	courseDetailsByInstructor,
	instructorDetails,
}) => {
	const hasProfilePicture = instructorDetails?.profilePicture;
	const fullName = `${instructorDetails?.firstName} ${instructorDetails?.lastName}`;

	return (
		<div className="col-span-12 lg:col-span-4 h-full">
			<div className="p-6 sm:p-8 hero  shadow-lg border border-primary/20 rounded-lg transition-all duration-300 hover:shadow-xl h-full">
				<div className="mb-6">
					{/* Profile Image with Ring Detail */}
					<div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full mb-5 mx-auto p-1 ring-4 ring-primary/10 shadow-md">
						<div className="w-full h-full rounded-full overflow-hidden">
							{hasProfilePicture ? (
								<img
									src={instructorDetails?.profilePicture}
									alt={fullName}
									className="w-full h-full object-cover"
								/>
							) : (
								<div
									className={`w-full h-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold bg-gradient-to-br ${getAvatarGradient(
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
						{/* Verification Badge style icon */}
						<div className="absolute bottom-2 right-2 bg-primary text-white p-1.5 rounded-full border-2 border-card shadow-sm">
							<UserCheck size={16} />
						</div>
					</div>

					<div className="text-center">
						<h4 className="text-xl md:text-2xl font-bold text-foreground mb-1">
							{fullName}
						</h4>
						<div className="text-primary font-bold text-xs uppercase tracking-widest mb-6">
							{instructorDetails?.designation || "Instructor"}
						</div>

						{/* Responsive Stats Grid */}
						<ul className="grid grid-cols-2 gap-4 text-sm text-muted-foreground font-medium text-left">
							<li className="flex items-center space-x-2.5 p-2 rounded-xl bg-primary/5 border border-primary/5">
								<Presentation className="text-primary w-4 h-4 shrink-0" />
								<span className="truncate">
									{courseDetailsByInstructor?.courses
										?.length || 0}{" "}
									Courses
								</span>
							</li>
							<li className="flex items-center space-x-2.5 p-2 rounded-xl bg-primary/5 border border-primary/5">
								<UsersRound className="text-primary w-4 h-4 shrink-0" />
								<span className="truncate">
									{courseDetailsByInstructor?.enrollments ||
										0}{" "}
									Students
								</span>
							</li>
							<li className="flex items-center space-x-2.5 p-2 rounded-xl bg-primary/5 border border-primary/5">
								<MessageSquare className="text-primary w-4 h-4 shrink-0" />
								<span className="truncate">
									{courseDetailsByInstructor?.reviews || 0}{" "}
									Reviews
								</span>
							</li>
							<li className="flex items-center space-x-2.5 p-2 rounded-xl bg-primary/5 border border-primary/5">
								<Star className="text-primary w-4 h-4 shrink-0" />
								<span className="truncate">
									{courseDetailsByInstructor?.ratings || 0}{" "}
									Rating
								</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="space-y-3 pt-4 border-t border-primary/10">
					<h5 className="text-sm font-bold uppercase tracking-tighter text-foreground/70">
						About Instructor
					</h5>
					<p className="text-muted-foreground text-sm leading-relaxed italic">
						{instructorDetails?.bio
							? `"${instructorDetails?.bio}"`
							: "No bio available."}
					</p>
				</div>
			</div>
		</div>
	);
};

export default InstructorDetails;
