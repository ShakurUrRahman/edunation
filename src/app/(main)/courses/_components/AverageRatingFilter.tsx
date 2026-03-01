"use client";

import StarRatingFilter from "./StarRatingFilter";

const RATING_OPTIONS = [5, 4, 3, 2, 1];

interface Props {
	selectedRatings: number[];
	setSelectedRatings: (updater: (prev: number[]) => number[]) => void;
	// Live counts derived from courses — passed from CoursesClient
	ratingCounts?: Record<number, number>;
}

export default function AverageRatingFilter({
	selectedRatings,
	setSelectedRatings,
	ratingCounts = {},
}: Props) {
	const toggle = (r: number) =>
		setSelectedRatings((prev) =>
			prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r],
		);

	return (
		<div className="bg-white rounded-xl p-5 mb-5 shadow-sm">
			<h4 className="text-base font-bold mb-3 text-[#1a1a2e]">
				Average Rating
			</h4>
			{RATING_OPTIONS.map((r) => {
				const count = ratingCounts[r] ?? 0;
				return (
					<label
						key={r}
						className="flex items-center gap-2 cursor-pointer mb-1.5"
					>
						<input
							type="checkbox"
							checked={selectedRatings.includes(r)}
							onChange={() => toggle(r)}
							className="accent-primary"
						/>
						<StarRatingFilter rating={r} />
						<span className="text-xs text-gray-400">
							({String(count).padStart(2, "0")})
						</span>
					</label>
				);
			})}
		</div>
	);
}
