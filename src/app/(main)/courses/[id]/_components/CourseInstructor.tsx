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
		<div className="p-6 border border-primary rounded-2xl shadow-sm">
			<h2 className="text-2xl font-bold mb-8">Instructor</h2>

			<div className="grid md:grid-cols-3 gap-10">
				{/* LEFT SIDE */}
				<div className="flex flex-col items-center text-center">
					{instructorPersonalDetails?.profilePicture ? (
						<Image
							src={instructorPersonalDetails.profilePicture}
							alt={fullName}
							width={160}
							height={160}
							className="w-36 h-36 rounded-full object-cover border"
						/>
					) : (
						<div
							className={`w-36 h-36 flex items-center justify-center rounded-full text-white text-3xl font-bold bg-gradient-to-br ${getAvatarGradient(
								instructorPersonalDetails?.email,
							)}`}
						>
							{getInitials(
								instructorPersonalDetails?.firstName,
								instructorPersonalDetails?.lastName,
							)}
						</div>
					)}

					{/* Social Icons */}
					<div className="flex gap-3 mt-6">
						<SocialButton icon={<Facebook size={16} />} />
						<SocialButton icon={<Twitter size={16} />} />
						<SocialButton icon={<Instagram size={16} />} />
						<SocialButton icon={<Linkedin size={16} />} />
					</div>
				</div>

				{/* RIGHT SIDE */}
				<div className="md:col-span-2 space-y-6">
					{/* Name & Designation */}
					<div>
						<h3 className="text-2xl font-semibold text-gray-800">
							{fullName}
						</h3>
						{instructorPersonalDetails?.designation && (
							<p className="text-sm text-primary mt-1">
								{instructorPersonalDetails.designation}
							</p>
						)}
						{instructorPersonalDetails?.bio && (
							<p className="text-gray-600 text-sm leading-relaxed">
								{instructorPersonalDetails.bio.slice(0, 350)}
							</p>
						)}
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
						className={cn(buttonVariants({ size: "lg" }), "w-fit")}
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
		<div className="bg-gray-50 rounded-2xl p-4 border flex flex-col items-center text-center">
			<div className="text-primary mb-2">{icon}</div>
			<div className="text-lg font-semibold text-gray-800">{value}</div>
			<div className="text-xs text-gray-500 mt-1">{label}</div>
		</div>
	);
};

const SocialButton = ({ icon }) => {
	return (
		<button className="w-9 h-9 flex items-center justify-center border rounded-xl hover:bg-primary hover:text-white transition-all duration-200">
			{icon}
		</button>
	);
};

export default InstructorCard;
