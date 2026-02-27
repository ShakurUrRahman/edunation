"use client";

import { useState } from "react";
import StarRatingFilter from "./StarRatingFilter";

const RATING_OPTIONS = [5, 4, 3, 2, 1];
const ratingCounts = { 5: "09", 4: "04", 3: "93", 2: "02", 1: "01" };

export default function AverageRatingFilter() {
	const [selectedRatings, setSelectedRatings] = useState([]);

	return (
		<div className="bg-white rounded-xl p-5 mb-5 shadow-sm">
			<h4 className="text-base font-bold mb-3 text-[#1a1a2e]">
				Average Rating
			</h4>
			{RATING_OPTIONS.map((r) => (
				<label
					key={r}
					className="flex items-center gap-2 cursor-pointer mb-1.5"
				>
					<input
						type="checkbox"
						checked={selectedRatings.includes(r)}
						onChange={() =>
							setSelectedRatings((prev) =>
								prev.includes(r)
									? prev.filter((x) => x !== r)
									: [...prev, r],
							)
						}
						className="accent-primary"
					/>
					<StarRatingFilter rating={r} />
					<span className="text-xs text-gray-400">
						({ratingCounts[r]})
					</span>
				</label>
			))}
		</div>
	);
}
