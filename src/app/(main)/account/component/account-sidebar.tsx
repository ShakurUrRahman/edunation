"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Camera, UploadCloud } from "lucide-react"; // Added icons
import Menu from "./account-menu";
import { Input } from "@/components/ui/input";
import { getAvatarGradient, getInitials } from "@/lib/utils";

interface Props {
	user: {
		email: string;
		firstName: string;
		lastName: string;
		profilePicture?: string | null;
	};
}

const AccountSidebar = ({ user }: Props) => {
	const router = useRouter();
	const [file, setFile] = useState<FileList | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [profilePicture, setProfilePicture] = useState<string | null>(
		user?.profilePicture ?? null,
	);

	useEffect(() => {
		if (!file || file.length === 0) return;

		async function upload() {
			setIsUploading(true);
			try {
				const formData = new FormData();
				formData.append("files", file[0]);
				formData.append("email", user.email);

				const response = await fetch("/api/upload-profile", {
					method: "POST",
					body: formData,
				});

				if (response.ok) {
					const result = await response.json();
					setProfilePicture(result.url);
					toast.success("Profile picture updated");
					router.refresh();
				} else {
					const error = await response.text();
					toast.error(error || "Upload failed");
				}
			} catch (e: any) {
				toast.error(e.message ?? "Something went wrong");
			} finally {
				setIsUploading(false);
			}
		}

		upload();
	}, [file, user.email, router]);

	const fullName = `${user.firstName} ${user.lastName}`;

	return (
		<div className="w-full lg:w-1/4 ">
			<div className="relative">
				<div className="p-6 rounded-lg shadow-lg hero border border-primary/20">
					<div className="profile-pic text-center mb-5">
						<Input
							id="pro-img"
							name="profile-image"
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) =>
								e.target.files && setFile(e.target.files)
							}
						/>

						<div className="relative group mx-auto size-28">
							{/* Loading overlay */}
							{isUploading && (
								<div className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm ring-4 ring-slate-50 dark:ring-slate-800">
									<Loader2 className="w-8 h-8 text-primary animate-spin" />
								</div>
							)}

							{/* Avatar Container */}
							<div className="relative size-28 overflow-hidden rounded-full ring-4 ring-slate-50 dark:ring-slate-800 shadow-md">
								{profilePicture ? (
									<Image
										src={profilePicture}
										className="object-cover transition-transform duration-500 group-hover:scale-110"
										alt={fullName}
										fill
									/>
								) : (
									<div
										className={`size-full flex items-center justify-center
                                            bg-gradient-to-br ${getAvatarGradient(user.email)}
                                            text-white text-3xl font-semibold`}
									>
										{getInitials(
											user.firstName,
											user.lastName,
										)}
									</div>
								)}

								{/* The Hover/Upload Overlay */}
								<label
									htmlFor="pro-img"
									className="absolute inset-0 cursor-pointer bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white"
								>
									<Camera className="w-6 h-6 mb-1" />
									<span className="text-[10px] font-medium uppercase tracking-wider">
										Update
									</span>
								</label>
							</div>

							{/* Floating Icon Badge (Visible on mobile/desktop as a hint) */}
							<label
								htmlFor="pro-img"
								className="absolute bottom-1 right-1 size-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-background cursor-pointer shadow-lg hover:bg-primary/90 transition-colors z-20"
							>
								<UploadCloud className="w-4 h-4" />
							</label>
						</div>

						<div className="mt-4">
							<h5 className="text-lg font-bold truncate">
								{fullName}
							</h5>
							<p className="text-sm text-muted-foreground truncate">
								{user.email}
							</p>
						</div>
					</div>

					<div className="border-t border-gray-100 dark:border-gray-800 pt-2">
						<Menu />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSidebar;
