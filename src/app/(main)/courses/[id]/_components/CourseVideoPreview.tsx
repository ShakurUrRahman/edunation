"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
	thumbnail?: string;
	title: string;
	previewUrl?: string;
}

const DEFAULT_VIDEO = "https://www.youtube.com/watch?v=NpEaa2P7qZI";

function getEmbedUrl(url: string) {
	try {
		const videoId = url.includes("watch?v=")
			? url.split("watch?v=")[1].split("&")[0] // Handle additional URL params
			: url.includes("youtu.be/")
				? url.split("youtu.be/")[1].split("?")[0]
				: null;

		if (!videoId) return null;
		return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
	} catch {
		return null;
	}
}

export default function CourseVideoPreview({
	thumbnail,
	title,
	previewUrl,
}: Props) {
	const [playing, setPlaying] = useState(false);

	const finalUrl = previewUrl || DEFAULT_VIDEO;
	const embedUrl = getEmbedUrl(finalUrl);

	// Container styles to ensure consistency between placeholder and iframe
	const containerClasses = cn(
		"relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-6 shadow-lg",
		!playing && "cursor-pointer group ring-1 ring-white/10",
	);

	if (playing && embedUrl) {
		return (
			<div className={containerClasses}>
				<iframe
					src={embedUrl}
					title={title}
					className="w-full h-full border-0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		);
	}

	return (
		<div className={containerClasses} onClick={() => setPlaying(true)}>
			{thumbnail ? (
				<Image
					src={thumbnail}
					alt={title}
					fill
					priority
					className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			) : (
				<div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
			)}

			{/* Overlay Gradient for better visibility of UI elements */}
			<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

			{/* Play Button - Responsive Scaling */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 group-active:scale-95 transition-transform duration-300">
					<Play className="w-5 h-5 md:w-7 md:h-7 text-primary fill-primary ml-1" />
				</div>
			</div>

			{/* Badge - Adjusted for mobile */}
			<div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
				<span className="bg-black/60 backdrop-blur-md text-white text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-md border border-white/10">
					{previewUrl ? "Preview this course" : "Sample Video"}
				</span>
			</div>
		</div>
	);
}
