// account/_components/ProfilePictureForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, Pencil, UserCircle, X } from "lucide-react";
import { toast } from "sonner";

import { UploadDropzone } from "@/components/file-upload"; // same as ImageForm
import { Button } from "@/components/ui/button";

interface Props {
	initialData: {
		profilePicture?: string | null;
		firstName?: string;
		lastName?: string;
		email: string; // required — used as identifier like your other actions
	};
}

export const ProfilePictureForm = ({ initialData }: Props) => {
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [file, setFile] = useState<File[] | null>(null);
	const [profilePicture, setProfilePicture] = useState<string | null>(
		initialData?.profilePicture ?? null,
	);

	const initials =
		`${initialData?.firstName?.charAt(0) ?? ""}${initialData?.lastName?.charAt(0) ?? ""}`.toUpperCase();

	// ── Upload on file change — same pattern as your ImageForm ───────────────
	useEffect(() => {
		if (!file) return;

		async function upload() {
			setIsUploading(true);
			try {
				const formData = new FormData();
				formData.append("files", file[0]);
				formData.append("email", initialData.email); // ← email as identifier

				const response = await fetch("/api/upload-profile", {
					method: "POST",
					body: formData,
				});

				if (response.ok) {
					const result = await response.json();
					setProfilePicture(result.url);
					toast.success("Profile picture updated");
					setIsEditing(false);
					router.refresh();
				} else {
					const error = await response.text();
					toast.error(error || "Upload failed");
				}
			} catch (e: any) {
				toast.error(e.message ?? "Something went wrong");
			} finally {
				setIsUploading(false);
				setFile(null);
			}
		}

		upload();
	}, [file]);

	return (
		<div className="mt-6 border bg-gray-50 rounded-md p-4">
			{/* Header */}
			<div className="font-medium flex items-center justify-between mb-4">
				Profile Picture
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setIsEditing((v) => !v)}
				>
					{isEditing ? (
						<>
							<X className="h-4 w-4 mr-1" /> Cancel
						</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-1" />
							{profilePicture ? "Change" : "Add"}
						</>
					)}
				</Button>
			</div>

			{/* Display mode */}
			{!isEditing && (
				<div className="flex items-center gap-4">
					{profilePicture ? (
						<div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary/20 shrink-0">
							<Image
								src={profilePicture}
								alt="Profile picture"
								fill
								className="object-cover"
							/>
							{/* Camera overlay on hover */}
							<div
								className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
								onClick={() => setIsEditing(true)}
							>
								<Camera className="w-6 h-6 text-white" />
							</div>
						</div>
					) : (
						// Initials fallback — same as your Avatar component
						<div
							className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20 cursor-pointer hover:bg-primary/20 transition-colors shrink-0"
							onClick={() => setIsEditing(true)}
						>
							{initials ? (
								<span className="text-2xl font-bold text-primary">
									{initials}
								</span>
							) : (
								<UserCircle className="w-12 h-12 text-primary/40" />
							)}
						</div>
					)}
					<p className="text-sm text-muted-foreground">
						{profilePicture
							? "Click the photo or press Change to update"
							: "No profile picture uploaded yet"}
					</p>
				</div>
			)}

			{/* Upload mode */}
			{isEditing && (
				<div>
					{isUploading ? (
						<div className="flex items-center justify-center h-32 text-sm text-muted-foreground gap-3">
							<span className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
							Uploading to Cloudinary...
						</div>
					) : (
						<>
							<UploadDropzone onUpload={(f) => setFile(f)} />
							<p className="text-xs text-muted-foreground mt-3">
								Square image recommended. Face will be
								auto-cropped to 400×400. Max 5MB.
							</p>
						</>
					)}
				</div>
			)}
		</div>
	);
};
