"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
	{ label: "Price: Low to High", value: "price-asc" },
	{ label: "Price: High to Low", value: "price-desc" },
	{ label: "Latest", value: "latest" },
	{ label: "Popular", value: "popular" },
];

const SortCourse = () => {
	return (
		<Select>
			<SelectTrigger
				className="
          h-9
          w-[180px]
          gap-2
          bg-white
          border border-gray-200
          rounded-md
          px-3
          text-sm
          font-semibold
          text-gray-600
          shadow-sm
          hover:border-gray-300
          hover:bg-gray-50
          focus:ring-0
          focus:ring-offset-0
          focus:border-[#2a9d5c]
          transition-colors
          duration-200
          [&>svg:last-child]:hidden
        "
			>
				<ArrowUpDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
				<SelectValue placeholder="Sort By" />
			</SelectTrigger>

			<SelectContent
				position="popper"
				side="bottom"
				sideOffset={6}
				avoidCollisions={false}
				className="
          min-w-[180px]
          rounded-xl
          border border-gray-100
          shadow-xl
          p-1
          bg-white
        "
			>
				{SORT_OPTIONS.map((option) => (
					<SelectItem
						key={option.value}
						value={option.value}
						className="
              cursor-pointer
              rounded-md
              text-sm
              text-gray-600
              font-medium
              px-3
              py-2
              focus:bg-[#e8f4f0]
              focus:text-[#2a9d5c]
              data-[state=checked]:text-[#2a9d5c]
              data-[state=checked]:font-semibold
              transition-colors
              duration-150
            "
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SortCourse;
