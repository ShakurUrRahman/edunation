import StarRatingFilter from "./StarRatingFilter";

const RECENT_PRODUCTS = [
	{
		id: 1,
		title: "Powerstroke Engines Turbo Air Products",
		img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&h=60&fit=crop",
	},
	{
		id: 2,
		title: "Powerstroke Engines Turbo Air Products",
		img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=60&h=60&fit=crop",
	},
	{
		id: 3,
		title: "Powerstroke Engines Turbo Air Products",
		img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=60&fit=crop",
	},
	{
		id: 4,
		title: "Powerstroke Engines Turbo Air Products",
		img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=60&h=60&fit=crop",
	},
];

export default function RecentCourses({ recentProducts = RECENT_PRODUCTS }) {
	return (
		<div className="bg-white rounded-xl p-5 mb-5 shadow-sm">
			<h4 className="text-base font-bold mb-3.5 text-[#1a1a2e]">
				Recent Courses
			</h4>
			{recentProducts.map((p) => (
				<div key={p.id} className="flex gap-2.5 items-center mb-3">
					<img
						src={p.img}
						alt={p.title}
						className="w-12 h-12 rounded-md object-cover shrink-0"
					/>
					<div>
						<p className="text-xs font-semibold text-gray-700 mb-1 leading-snug">
							{p.title}
						</p>
						<StarRatingFilter rating={4.5} />
					</div>
				</div>
			))}
		</div>
	);
}
