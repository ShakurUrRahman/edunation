// dashboard/_components/preview-video-form.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil, Video, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateCourse } from "@/app/actions/course";

// ── Schema ─────────────────────────────────────────────────────────────────
const formSchema = z.object({
	preview_video_url: z
		.string()
		.url({ message: "Please enter a valid URL" })
		.optional()
		.or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
	initialData: { preview_video_url?: string };
	courseId: string;
}

// ── Component ──────────────────────────────────────────────────────────────
export const PreviewVideoForm = ({ initialData, courseId }: Props) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			preview_video_url: initialData?.preview_video_url ?? "",
		},
	});

	const onSubmit = (values: FormValues) => {
		startTransition(async () => {
			try {
				await updateCourse(courseId, {
					preview_video_url: values.preview_video_url ?? "",
				});
				toast.success("Preview video updated");
				setIsEditing(false);
				router.refresh();
			} catch {
				toast.error("Something went wrong");
			}
		});
	};

	// Detect YouTube / Vimeo for a small preview
	const url = initialData?.preview_video_url ?? "";
	const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
	const youtubeId = isYouTube
		? url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1]
		: null;

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				<span>Preview Video URL</span>
				<Button
					onClick={() => setIsEditing((v) => !v)}
					variant="ghost"
					size="sm"
				>
					{isEditing ? (
						<>
							<X className="h-4 w-4 mr-1" /> Cancel
						</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-1" /> Edit
						</>
					)}
				</Button>
			</div>

			{/* Display mode */}
			{!isEditing && (
				<div className="mt-2">
					{url ? (
						<>
							{/* YouTube embed preview */}
							{youtubeId ? (
								<div className="aspect-video rounded-md overflow-hidden mt-2">
									<iframe
										src={`https://www.youtube.com/embed/${youtubeId}`}
										className="w-full h-full"
										allowFullScreen
										title="Preview video"
									/>
								</div>
							) : (
								<div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
									<Video className="h-4 w-4 text-primary shrink-0" />
									<a
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										className="truncate underline hover:text-primary"
									>
										{url}
									</a>
								</div>
							)}
						</>
					) : (
						<p className="text-sm text-slate-500 italic mt-2">
							No preview video URL set
						</p>
					)}
				</div>
			)}

			{/* Edit mode */}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="preview_video_url"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="https://youtube.com/watch?v=..."
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Paste a YouTube, Vimeo, or any video URL
										for the course preview
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Button
								type="submit"
								size="sm"
								disabled={isPending}
							>
								{isPending ? "Saving..." : "Save"}
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};
