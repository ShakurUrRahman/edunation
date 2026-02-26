import React from "react";

export default function StarRatingFilter({ rating }) {
	return (
		<div className="flex gap-0.5">
			{[1, 2, 3, 4, 5].map((s) => (
				<svg
					key={s}
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill={
						s <= Math.floor(rating)
							? "#f5a623"
							: s - 0.5 <= rating
								? "url(#half)"
								: "#ddd"
					}
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient id="half">
							<stop offset="50%" stopColor="#113722" />
							<stop offset="50%" stopColor="#113722" />
						</linearGradient>
					</defs>
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			))}
		</div>
	);
}
