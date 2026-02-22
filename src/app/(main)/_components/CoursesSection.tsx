import Link from "next/link";
import CourseCard from "../courses/_components/CourseCard";
import { ArrowRightIcon } from "lucide-react";

export default function Courses({ courses }) {
	return (
		<section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">
			<div className="container mx-auto px-6">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="text-4xl font-bold mb-4">
						Explore Our{" "}
						<span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
							Top Courses
						</span>
					</h2>
					<p className="text-gray-600">
						Upgrade your skills with industry-focused courses
						designed to help you grow faster.
					</p>
				</div>

				{/* Filter Tabs */}
				<div className="flex justify-center gap-4 mb-12 flex-wrap">
					<button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium shadow-md">
						All
					</button>
					<button className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium transition">
						Design
					</button>
					<button className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium transition">
						Marketing
					</button>
					<button className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium transition">
						Development
					</button>
				</div>

				{/* Course Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
					{/* Course Card */}
					{courses.slice(0, 6).map((course) => (
						<CourseCard key={course.id} course={course} />
					))}
					{/* Add more CourseCards as needed */}
				</div>

				{/* View All Button */}
				<div className="text-center mt-16">
					<button className="px-8 py-3 bg-gradient-to-r from-primary to-teal-400 text-white rounded-full shadow-lg hover:scale-105 transition duration-300">
						View All Courses
					</button>
				</div>
			</div>
		</section>
	);
}
