"use client";

import { useState } from "react";
import ActiveFilters from "./ActiveFilters";

export default function CategoryFilter({
	toggleCategory,
	categories,
	selectedCategories,
}) {
	return (
		<>
			<div className="bg-white rounded-xl p-5 mb-5 shadow-sm">
				<h4 className="text-base font-bold mb-3.5 text-[#1a1a2e]">
					Category
				</h4>

				<ul className="m-0 p-0 list-none">
					{categories.map((cat) => {
						const active = selectedCategories.includes(cat.id);
						return (
							<li
								key={cat.id}
								onClick={() => toggleCategory(cat.id)}
								className={`
                  flex items-center justify-between
                  px-3 py-2.5 rounded-md mb-1
                  cursor-pointer text-sm
                  transition-colors duration-150 select-none
                  ${
						active
							? "bg-primary text-white font-semibold"
							: "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
					}
                `}
							>
								{/* Title from real data */}
								<span>{cat.title}</span>

								{/* Thumbnail thumbnail as a small icon if available, otherwise omit count badge */}
								{cat.thumbnail ? (
									<img
										src={`/assets/images/categories/${cat.thumbnail}`}
										alt={cat.title}
										className={`w-5 h-5 rounded object-cover ${active ? "opacity-90" : "opacity-60"}`}
									/>
								) : null}
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
}
