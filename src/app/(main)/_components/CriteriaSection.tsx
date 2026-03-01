import { BookOpen, Users, Video, GraduationCap } from "lucide-react";

export default function CriteriaSection() {
	return (
		<section className="relative bg-primary text-white">
			{/* Top Decorative Edge */}
			<div className="absolute top-0 left-0 w-full h-6 hero rounded-b-[40px]" />

			<div className="container mx-auto px-6 lg:px-12 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
					{/* ITEM */}
					<div className="group flex items-center gap-5 px-6 py-8 justify-center">
						<BookOpen
							size={42}
							className="text-white/80 transition-transform duration-1000 transform group-hover:transform-[rotateY(360deg)]"
						/>
						<div>
							<h3 className="text-3xl font-bold">250+</h3>
							<p className="text-white/80 text-sm mt-1 bg-gradient-to-l from-primary to-accent-blue">
								Our Online Courses
							</p>
						</div>
					</div>

					<div className="group flex items-center gap-5 px-6 py-8 justify-center">
						<Users
							size={42}
							className="text-white/80 transition-transform duration-1000 transform group-hover:transform-[rotateY(360deg)]"
						/>
						<div>
							<h3 className="text-3xl font-bold">1300+</h3>
							<p className="text-white/80 text-sm mt-1 bg-gradient-to-l from-primary to-accent-blue">
								Our Online Students
							</p>
						</div>
					</div>

					<div className="group flex items-center gap-5 px-6 py-8 justify-center">
						<Video
							size={42}
							className="text-white/80 transition-transform duration-1000 transform group-hover:transform-[rotateY(360deg)]"
						/>
						<div>
							<h3 className="text-3xl font-bold">1090+</h3>
							<p className="text-white/80 text-sm mt-1 bg-gradient-to-l from-primary to-accent-blue">
								Our Video Contents
							</p>
						</div>
					</div>

					<div className="group flex items-center gap-5 px-6 py-8 justify-center md:justify-start">
						<GraduationCap
							size={42}
							className="text-white/80 transition-transform duration-1000 transform group-hover:transform-[rotateY(360deg)]"
						/>
						<div>
							<h3 className="text-3xl font-bold">5000+</h3>
							<p className="text-white/80 text-sm mt-1 bg-gradient-to-l from-primary to-accent-blue">
								Our Graduated Students
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Decorative Edge */}
			<div className="absolute bottom-0 left-0 w-full h-6 hero rounded-t-[40px]" />
		</section>
	);
}
