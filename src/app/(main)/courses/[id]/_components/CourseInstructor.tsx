"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn, getAvatarGradient, getInitials } from "@/lib/utils";
import {
	Star,
	Users,
	BookOpen,
	Facebook,
	Linkedin,
	Instagram,
	Twitter,
	InstagramIcon,
	LinkedinIcon,
	FacebookIcon,
} from "lucide-react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

interface InstructorProps {
	name: string;
	role: string;
	image: string;
	rating: number;
	reviews: number;
	students: string;
	courses: number;
	description: string;
}

const InstructorCard = ({ instructorDetails, instructorPersonalDetails }) => {
	return (
		<div className="bg-gray-50 border rounded-2xl p-8">
			<h2 className="text-xl font-semibold mb-6">Instructor</h2>

			<div className="flex flex-col md:flex-row gap-8">
				{/* Image */}
				{instructorPersonalDetails?.profilePicture ? (
					<Image
						src={instructorPersonalDetails?.profilePicture}
						alt={fullName}
						className="w-40 h-40 rounded-full object-cover"
						width={500}
						height={700}
					/>
				) : (
					<div
						className={cn(
							"w-40 h-40 rounded-full object-cover",
							getAvatarGradient(instructorPersonalDetails?.email),
						)}
					>
						{getInitials(
							instructorDetails?.firstName,
							instructorDetails?.lastName,
						)}
					</div>
				)}

				{/* Content */}
				<div className="flex-1">
					{/* Name & Role */}
					<h3 className="text-2xl font-semibold text-gray-800">
						{instructorPersonalDetails.firstName}{" "}
						{instructorPersonalDetails.lastName}
					</h3>

					{/* Stats */}
					<div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-600">
						{/* <div className="flex items-center gap-1">
							<Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
							<span>({reviews}) Reviewed</span>
						</div>

						<div className="flex items-center gap-1">
							<Users className="w-4 h-4" />
							<span>{students} Students</span>
						</div>

						<div className="flex items-center gap-1">
							<BookOpen className="w-4 h-4" />
							<span>{courses} Courses</span>
						</div> */}
					</div>

					{/* Description */}
					<p className="text-gray-600 mt-5 leading-relaxed text-sm">
						{instructorPersonalDetails?.bio}
					</p>

					{/* Social + Button */}
					<div className="flex flex-wrap items-center justify-between mt-6 gap-4">
						{/* Social Icons */}
						<div className="flex gap-3">
							<button className="w-9 h-9 flex items-center justify-center border rounded-md hover:bg-primary hover:text-white transition">
								<FacebookIcon size={16} />
							</button>
							<button className="w-9 h-9 flex items-center justify-center border rounded-md hover:bg-primary hover:text-white transition">
								<Twitter size={14} />
							</button>
							<button className="w-9 h-9 flex items-center justify-center border rounded-md hover:bg-primary hover:text-white transition">
								<InstagramIcon size={16} />
							</button>
							<button className="w-9 h-9 flex items-center justify-center border rounded-md hover:bg-primary hover:text-white transition">
								<LinkedinIcon size={16} />
							</button>
						</div>

						{/* See Details Button */}
						<Link
							href={`/instructor-profile/${instructorPersonalDetails?._id}`}
							className={cn(buttonVariants({ size: "lg" }))}
						>
							Instructor details
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InstructorCard;
