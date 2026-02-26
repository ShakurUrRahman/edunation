"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SearchBox = () => {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="relative h-9">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
			<Input
				type="text"
				placeholder="Search Keywords..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="
          h-9
          w-52
          pl-8
          pr-3
          bg-white
          border border-gray-200
          rounded-md
          text-sm
          font-medium
          text-gray-600
          placeholder:text-gray-400
          shadow-sm
          hover:border-gray-300
          focus:border-[#2a9d5c]
          focus-visible:ring-0
          focus-visible:ring-offset-0
          transition-colors
          duration-200
          outline-none
        "
			/>
		</div>
	);
};

export default SearchBox;
