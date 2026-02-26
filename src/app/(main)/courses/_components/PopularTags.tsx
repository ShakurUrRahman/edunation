"use client";

import { useState } from "react";

const POPULAR_TAGS = [
	"Business",
	"Education",
	"Students",
	"Art",
	"Mission",
	"School",
	"Tech",
	"Development",
	"UI/UX Design",
	"Kutest",
];

interface PopularTagsProps {
	selectedTags?: string[];
	onTagChange?: (tags: string[]) => void;
}

export default function PopularTags({
	selectedTags: externalTags,
	onTagChange,
}: PopularTagsProps) {
	const [internalTags, setInternalTags] = useState<string[]>([]);

	// Use external state if provided, otherwise use internal
	const selectedTags = externalTags ?? internalTags;

	const toggleTag = (tag: string) => {
		const updated = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];

		if (onTagChange) {
			onTagChange(updated);
		} else {
			setInternalTags(updated);
		}
	};

	return (
		<div className="bg-white rounded-xl p-5 shadow-sm">
			<h4 className="text-base font-bold mb-3.5 text-[#1a1a2e]">
				Popular Tags
			</h4>
			<div className="flex flex-wrap gap-1.5">
				{POPULAR_TAGS.map((tag) => {
					const isActive = selectedTags.includes(tag);
					return (
						<button
							key={tag}
							onClick={() => toggleTag(tag)}
							className={`
                px-3 py-1 rounded-full text-xs font-medium
                border cursor-pointer
                transition-all duration-150
                ${
					isActive
						? "bg-primary text-white border-primary shadow-sm shadow-primary/25"
						: "bg-gray-100 text-gray-500 border-transparent hover:bg-[#e8f4f0] hover:text-primary hover:border-primary/30"
				}
              `}
							aria-pressed={isActive}
						>
							{tag}
						</button>
					);
				})}
			</div>

			{/* Clear all — only shown when tags are selected */}
			{selectedTags.length > 0 && (
				<button
					onClick={() => {
						if (onTagChange) onTagChange([]);
						else setInternalTags([]);
					}}
					className="mt-3 text-xs text-gray-400 hover:text-secondary transition-colors duration-150 cursor-pointer underline underline-offset-2"
				>
					Clear all ({selectedTags.length})
				</button>
			)}
		</div>
	);
}
