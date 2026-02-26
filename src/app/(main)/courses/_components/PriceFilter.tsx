"use client";

import { useState, useRef } from "react";

export default function PriceFilter({
	minPrice,
	maxPrice,
	appliedRange,
	onApply,
}) {
	const [draft, setDraft] = useState<[number, number]>(appliedRange);

	const isDirty =
		draft[0] !== appliedRange[0] || draft[1] !== appliedRange[1];

	const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = Math.min(Number(e.target.value), draft[1] - 1);
		setDraft([val, draft[1]]);
	};

	const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = Math.max(Number(e.target.value), draft[0] + 1);
		setDraft([draft[0], val]);
	};

	const handleReset = () => {
		const reset: [number, number] = [minPrice, maxPrice];
		setDraft(reset);
		onApply(reset);
	};

	// Track fill % for the colored range between thumbs
	const minPct = ((draft[0] - minPrice) / (maxPrice - minPrice)) * 100;
	const maxPct = ((draft[1] - minPrice) / (maxPrice - minPrice)) * 100;

	return (
		<div className="bg-white rounded-xl p-5 mb-5 shadow-sm">
			<h4 className="text-base font-bold mb-5 text-[#1a1a2e]">
				Price Filter
			</h4>

			{/* Dual range track */}
			<div className="relative h-1.5 mb-5">
				{/* Gray base track */}
				<div className="absolute inset-0 rounded-full bg-gray-200" />

				{/* Green fill between the two thumbs */}
				<div
					className="absolute top-0 h-full rounded-full bg-primary"
					style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
				/>

				{/* Min thumb */}
				<input
					type="range"
					min={minPrice}
					max={maxPrice}
					value={draft[0]}
					onChange={handleMin}
					className="
            absolute inset-0 w-full h-full
            appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-primary
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:relative
            [&::-webkit-slider-thumb]:z-20
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-primary
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer
          "
					style={{ zIndex: draft[0] > maxPrice - 10 ? 5 : 3 }}
				/>

				{/* Max thumb */}
				<input
					type="range"
					min={minPrice}
					max={maxPrice}
					value={draft[1]}
					onChange={handleMax}
					className="
            absolute inset-0 w-full h-full
            appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-primary
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-primary
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer
          "
					style={{ zIndex: 4 }}
				/>
			</div>

			{/* Price labels */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-1 text-xs text-gray-500">
					<span className="text-gray-400">Min:</span>
					<span className="font-semibold text-[#1a1a2e]">
						${draft[0]}
					</span>
				</div>
				<div className="h-px w-4 bg-gray-300" />
				<div className="flex items-center gap-1 text-xs text-gray-500">
					<span className="text-gray-400">Max:</span>
					<span className="font-semibold text-[#1a1a2e]">
						${draft[1]}
					</span>
				</div>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-2">
				<button
					onClick={() => onApply(draft)}
					disabled={!isDirty}
					className="
            flex-1 bg-primary hover:bg-primary/90
            disabled:opacity-50 disabled:cursor-not-allowed
            text-white border-none rounded-md
            py-2 text-sm font-semibold
            cursor-pointer transition-colors duration-200
          "
				>
					Apply
				</button>

				{(appliedRange[0] !== minPrice ||
					appliedRange[1] !== maxPrice) && (
					<button
						onClick={handleReset}
						className="
              px-3 py-2 text-xs font-semibold
              border border-gray-200 rounded-md
              text-gray-400 hover:text-red-400 hover:border-red-200
              bg-transparent cursor-pointer
              transition-colors duration-200
            "
					>
						Reset
					</button>
				)}
			</div>
		</div>
	);
}
