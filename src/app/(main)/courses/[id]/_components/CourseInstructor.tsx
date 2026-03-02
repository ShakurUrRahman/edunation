"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn, getAvatarGradient, getInitials } from "@/lib/utils";
import {
	Star,
	Users,
	BookOpen,
	MessageSquare,
	Facebook,
	Linkedin,
	Instagram,
	Twitter,
} from "lucide-react";

const InstructorCard = ({ instructorDetails, instructorPersonalDetails }) => {
	const fullName = `${instructorPersonalDetails?.firstName ?? ""} ${
		instructorPersonalDetails?.lastName ?? ""
	}`;

	return (
		<div className="p-5 md:p-8 border border-primary/20 rounded-3xl shadow-sm bg-white">
			<h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-gray-900">
				Instructor
			</h2>

			<div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
				{/* LEFT SIDE: Profile & Socials */}
				<div className="flex flex-col items-center text-center shrink-0">
					<div className="relative group">
						{instructorPersonalDetails?.profilePicture ? (
							<Image
								src={instructorPersonalDetails.profilePicture}
								alt={fullName}
								width={160}
								height={160}
								className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
							/>
						) : (
							<div
								className={`w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full text-white text-3xl font-bold shadow-md bg-gradient-to-br ${getAvatarGradient(
									instructorPersonalDetails?.email,
								)}`}
							>
								{getInitials(
									instructorPersonalDetails?.firstName,
									instructorPersonalDetails?.lastName,
								)}
							</div>
						)}
					</div>

					{/* Social Icons - Hidden on very small screens or made smaller */}
					<div className="flex gap-2.5 mt-5">
						<SocialButton icon={<Facebook size={16} />} />
						<SocialButton icon={<Twitter size={16} />} />
						<SocialButton icon={<Instagram size={16} />} />
						<SocialButton icon={<Linkedin size={16} />} />
					</div>
				</div>

				{/* RIGHT SIDE: Info & Stats */}
				<div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6 w-full">
					<div>
						<h3 className="text-2xl md:text-3xl font-bold text-gray-800">
							{fullName}
						</h3>
						{instructorPersonalDetails?.designation && (
							<p className="text-base font-medium text-primary mt-1">
								{instructorPersonalDetails.designation}
							</p>
						)}
						{instructorPersonalDetails?.bio && (
							<p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4 max-w-2xl">
								{instructorPersonalDetails.bio.slice(0, 350)}...
							</p>
						)}
					</div>

					{/* Stats Grid - 2 columns on mobile, 4 on desktop */}
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
						<StatItem
							icon={<BookOpen size={18} />}
							value={instructorDetails?.courses?.length ?? 0}
							label="Courses"
						/>
						<StatItem
							icon={<Users size={18} />}
							value={instructorDetails?.enrollments?.length ?? 0}
							label="Students"
						/>
						<StatItem
							icon={<MessageSquare size={18} />}
							value={instructorDetails?.reviews?.length ?? 0}
							label="Reviews"
						/>
						<StatItem
							icon={<Star size={18} />}
							value={instructorDetails?.ratings ?? "N/A"}
							label="Rating"
						/>
					</div>

					{/* CTA Button */}
					<Link
						href={`/instructor-profile/${instructorPersonalDetails?._id}`}
						className={cn(
							buttonVariants({ size: "lg" }),
							"w-full md:w-fit rounded-xl font-bold shadow-lg shadow-primary/10 transition-all active:scale-95",
						)}
					>
						View Full Profile
					</Link>
				</div>
			</div>
		</div>
	);
};

/* ---------- Reusable Components ---------- */

const StatItem = ({ icon, value, label }) => {
	return (
		<div className="bg-gray-50/50 rounded-2xl p-3 md:p-4 border border-gray-100 flex flex-col items-center text-center transition-colors hover:bg-white hover:border-primary/20">
			<div className="text-primary mb-1 md:mb-2 bg-primary/5 p-2 rounded-lg">
				{icon}
			</div>
			<div className="text-base md:text-lg font-bold text-gray-800 tabular-nums">
				{value}
			</div>
			<div className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-wider">
				{label}
			</div>
		</div>
	);
};

const SocialButton = ({ icon }) => {
	return (
		<button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 text-gray-500">
			{icon}
		</button>
	);
};

export default InstructorCard;
