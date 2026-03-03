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

			{/* Play Button */}
			<div className="absolute inset-0 flex items-center justify-center">
				{/* Outer pulse ring */}
				<div className="relative flex items-center justify-center">
					{/* Animated pulse rings */}
					<span className="absolute inline-flex h-20 w-20 md:h-24 md:w-24 rounded-full bg-white/20 animate-ping" />
					<span className="absolute inline-flex h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/10 animate-ping [animation-delay:300ms]" />

					{/* Main button */}
					<div
						className="
      relative z-10
      w-14 h-14 md:w-18 md:h-18
      rounded-full
      bg-gradient-to-br from-white via-white to-white/80
      flex items-center justify-center
      shadow-[0_0_0_4px_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.4)]
      group-hover:shadow-[0_0_0_6px_rgba(42,157,92,0.4),0_12px_40px_rgba(0,0,0,0.5)]
      group-hover:scale-110 group-active:scale-95
      transition-all duration-300
    "
					>
						{/* Triangle play icon — sharper than lucide Play */}
						<svg
							viewBox="0 0 24 24"
							className="w-6 h-6 md:w-7 md:h-7 ml-1 text-primary drop-shadow-sm"
							fill="currentColor"
						>
							<polygon points="6,3 20,12 6,21" />
						</svg>
					</div>
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
