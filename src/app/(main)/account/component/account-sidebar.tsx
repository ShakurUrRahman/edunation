"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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

	// ── Same useEffect pattern as ImageForm ──────────────────────────────────
	useEffect(() => {
		if (!file || file.length === 0) return;

		async function upload() {
			setIsUploading(true);
			try {
				const formData = new FormData();
				formData.append("files", file[0]);
				formData.append("email", user.email); // email as identifier like your actions

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
	}, [file]);

	const fullName = `${user.firstName} ${user.lastName}`;

	return (
		<div className="lg:w-1/4 md:px-3">
			<div className="relative">
				<div className="p-6 rounded-lg shadow hero border border-primary/40">
					<div className="profile-pic text-center mb-5">
						{/* Hidden file input — same id as before */}
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

						<div>
							{/* Loading overlay */}
							{isUploading && (
								<div className="relative size-28 mx-auto mb-1">
									<div className="size-28 rounded-full bg-gray-200 flex items-center justify-center ring-4 ring-slate-50">
										<Loader2 className="w-8 h-8 text-primary animate-spin" />
									</div>
								</div>
							)}

							{/* Avatar — hidden while uploading */}
							{!isUploading &&
								(profilePicture ? (
									<div className="relative size-28 mx-auto">
										<Image
											src={profilePicture}
											className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800 object-cover"
											id="profile-banner"
											alt={fullName}
											width={112}
											height={112}
										/>
										{/* Clicking avatar opens file picker */}
										<label
											htmlFor="pro-img"
											className="absolute inset-0 cursor-pointer rounded-full hover:bg-black/20 transition-colors flex items-center justify-center"
											title="Change photo"
										/>
									</div>
								) : (
									<div className="relative mx-auto w-fit">
										<div
											className={`size-28 rounded-full flex items-center justify-center
                        bg-linear-to-br ${getAvatarGradient(user.email)}
                        text-white text-3xl font-semibold shadow ring-4 ring-slate-50 dark:ring-slate-800`}
										>
											{getInitials(
												user.firstName,
												user.lastName,
											)}
										</div>
										<label
											htmlFor="pro-img"
											className="absolute inset-0 cursor-pointer"
											title="Upload photo"
										/>
									</div>
								))}

							<div className="mt-4">
								<h5 className="text-lg font-semibold">
									{fullName}
								</h5>
								<p className="text-slate-400">{user.email}</p>
								{/* Small hint */}
								<p className="text-xs text-slate-400 mt-1 cursor-pointer hover:text-primary transition-colors">
									<label
										htmlFor="pro-img"
										className="cursor-pointer"
									>
										Click photo to change
									</label>
								</p>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-100 dark:border-gray-700">
						<Menu />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSidebar;

// ── Server wrapper — keeps auth + data fetching server-side ──────────────────
// Save this as a separate file e.g. AccountSidebarServer.tsx
// and use it in your layout instead of the old AccountSidebar

/*
import { auth }           from "@/auth";
import { redirect }       from "next/navigation";
import { getUserByEmail } from "@/queries/users";
import AccountSidebar     from "./AccountSidebar";

const AccountSidebarServer = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const loggedInUser = await getUserByEmail(session.user.email);

  return (
    <AccountSidebar
      user={{
        email:          loggedInUser.email,
        firstName:      loggedInUser.firstName,
        lastName:       loggedInUser.lastName,
        profilePicture: loggedInUser.profilePicture ?? null,
      }}
    />
  );
};

export default AccountSidebarServer;
*/
