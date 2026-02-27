"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Props {
	thumbnail?: string;
	title: string;
	previewUrl?: string;
}

const DEFAULT_VIDEO = "https://www.youtube.com/watch?v=NpEaa2P7qZI"; // placeholder

function getEmbedUrl(url: string) {
	try {
		const videoId = url.includes("watch?v=")
			? url.split("watch?v=")[1]
			: url.includes("youtu.be/")
				? url.split("youtu.be/")[1]
				: null;

		if (!videoId) return null;

		return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
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

	if (playing && embedUrl) {
		return (
			<div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-6">
				<iframe
					src={embedUrl}
					title={title}
					className="w-full h-full"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		);
	}

	return (
		<div
			className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-900 mb-6 cursor-pointer group"
			onClick={() => setPlaying(true)}
		>
			{thumbnail && (
				<Image
					src={thumbnail}
					alt={title}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
				/>
			)}

			<div className="absolute inset-0 flex items-center justify-center">
				<div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
					<Play className="w-6 h-6 text-primary fill-primary ml-1" />
				</div>
			</div>

			{!previewUrl && (
				<span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
					Preview Video
				</span>
			)}
		</div>
	);
}
