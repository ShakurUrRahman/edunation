"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface SearchBoxProps {
	onSearch: (query: string) => void;
	debounceMs?: number;
}

const SearchBox = ({ onSearch, debounceMs = 400 }: SearchBoxProps) => {
	const [inputValue, setInputValue] = useState("");

	// Debounce: only call onSearch after user stops typing for debounceMs
	useEffect(() => {
		const timer = setTimeout(() => {
			onSearch(inputValue.trim());
		}, debounceMs);

		// Clear previous timer on every keystroke
		return () => clearTimeout(timer);
	}, [inputValue, debounceMs]);

	const handleClear = () => {
		setInputValue("");
		onSearch("");
	};

	return (
		<div className="relative h-9">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none z-10" />

			<Input
				type="text"
				placeholder="Search Keywords..."
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className="
          h-9 w-52
          pl-8 pr-8
          bg-white
          border border-gray-200 rounded-md
          text-sm font-medium text-gray-600
          placeholder:text-gray-400
          shadow-sm
          hover:border-gray-300
          focus:border-[#2a9d5c]
          focus-visible:ring-0
          focus-visible:ring-offset-0
          transition-colors duration-200
          outline-none
        "
			/>

			{/* Clear button — only visible when there's input */}
			{inputValue && (
				<button
					onClick={handleClear}
					className="
            absolute right-2.5 top-1/2 -translate-y-1/2
            h-4 w-4 rounded-full
            flex items-center justify-center
            bg-gray-200 hover:bg-gray-300
            text-gray-500 hover:text-gray-700
            transition-colors duration-150
            cursor-pointer border-none p-0
          "
					aria-label="Clear search"
				>
					<X className="h-2.5 w-2.5" />
				</button>
			)}
		</div>
	);
};

export default SearchBox;
