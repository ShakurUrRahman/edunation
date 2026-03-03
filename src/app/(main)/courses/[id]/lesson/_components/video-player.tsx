"use client";

export const VideoPlayer = ({}) => {
	return (
		<div className="w-full max-w-5xl mx-auto px-0 sm:px-4">
			<div className="relative aspect-video w-full overflow-hidden rounded-xl md:rounded-2xl border border-primary/20 shadow-lg bg-black">
				<iframe
					className="absolute inset-0 w-full h-full"
					src="https://www.youtube.com/embed/666K4aizIu8?si=hgMgYujVVL4R8Dr_"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				></iframe>
			</div>
			{/* Optional Shadow Accent to match your "hero" cards */}
			<div className="mt-4 h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm"></div>
		</div>
	);
};
