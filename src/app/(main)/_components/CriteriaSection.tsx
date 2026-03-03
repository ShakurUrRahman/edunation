import { BookOpen, Users, Video, GraduationCap } from "lucide-react";

export default function CriteriaSection() {
	const stats = [
		{ icon: BookOpen, count: "250+", label: "Online Courses" },
		{ icon: Users, count: "1300+", label: "Online Students" },
		{ icon: Video, count: "1090+", label: "Video Contents" },
		{ icon: GraduationCap, count: "5000+", label: "Graduated Students" },
	];

	return (
		<section className="relative bg-primary text-white overflow-hidden">
			{/* Top Decorative Edge */}
			<div className="absolute top-0 left-0 w-full h-6 hero rounded-b-[40px]" />

			<div className="container mx-auto px-6 py-8 md:py-20">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-4">
					{stats.map((stat, index) => (
						<div
							key={index}
							className={`group flex items-center gap-5 px-6 py-8 justify-center lg:justify-start transition-all duration-300
                     /* Mobile/Tablet Border Logic */
                     border-b border-white/10 sm:border-b-0
                     ${index % 2 === 0 ? "sm:border-r border-white/10" : ""} 
                     /* Desktop Border Logic */
                     lg:border-r lg:last:border-r-0 border-white/10`}
						>
							<div className="relative">
								<stat.icon
									size={42}
									className="text-white/80 transition-transform duration-700 group-hover:[transform:rotateY(360deg)]"
								/>
								{/* Subtle glow effect on hover */}
								<div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
							</div>

							<div>
								<h3 className="text-3xl md:text-4xl font-black tracking-tight text-white">
									{stat.count}
								</h3>
								<p className="text-white/70 text-sm font-medium mt-1 leading-tight">
									{stat.label}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom Decorative Edge */}
			<div className="absolute bottom-0 left-0 w-full h-6 hero rounded-t-[40px]" />
		</section>
	);
}
