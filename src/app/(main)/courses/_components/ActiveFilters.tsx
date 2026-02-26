"use client";

import { X } from "lucide-react";

const ActiveFilters = ({
	selectedCategories,
	setSelectedCategories,
	categories,
	removeFilter,
}) => {
	if (!selectedCategories || selectedCategories.length === 0) return null;

	return (
		<div className="flex items-center gap-2 flex-wrap mb-4">
			{selectedCategories.map((catId) => {
				// catId is a string id — look it up in categories array to get the title
				const label =
					categories.find((c) => c.id === catId)?.title ?? catId;

				return (
					<span
						key={catId}
						className="
              inline-flex items-center gap-1
              bg-[#e8f4f0] text-primary
              rounded-full px-3 py-1
              text-xs font-semibold
              border border-primary/20
              transition-all duration-150
            "
					>
						{label}
						<button
							onClick={() => removeFilter(catId)}
							className="
                ml-0.5 flex items-center justify-center
                w-4 h-4 rounded-full
                bg-primary/15 hover:bg-primary hover:text-white
                text-primary cursor-pointer
                border-none p-0
                transition-colors duration-150
              "
							aria-label={`Remove ${label} filter`}
						>
							<X className="w-2.5 h-2.5" />
						</button>
					</span>
				);
			})}
		</div>
	);
};

export default ActiveFilters;
