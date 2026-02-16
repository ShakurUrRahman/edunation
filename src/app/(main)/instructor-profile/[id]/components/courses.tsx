import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { getCategoryDetails } from "@/queries/categories";
import { EnrollCourse } from "@/components/enroll-course";

const Courses = ({ courses }) => {
	return (
		<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
			{courses.map((course) => {
				return (
					<div
						key={course._id}
						className="group hover:shadow-sm transition overflow-hidden p-3 h-full hero border border-primary/40 rounded-lg"
					>
						<Link href={`/courses/${course._id}`}>
							<div className="relative w-full aspect-video rounded-md overflow-hidden">
								<Image
									src={course.thumbnail}
									alt={course.title}
									className="object-cover"
									fill
								/>
							</div>
							<div className="flex flex-col pt-2">
								<div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
									{course.title}
								</div>
								<p className="text-xs text-muted-foreground">
									{course.category.title}
								</p>
								<div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
									<div className="flex items-center gap-x-1 text-slate-500">
										<div>
											<BookOpen className="w-4" />
										</div>
										<span>
											{course.modules?.length} Chapters
										</span>
									</div>
								</div>

								{/* <CourseProgress
                          size="sm"
                          value={80}
                          variant={110 === 100 ? "success" : ""}
                        /> */}
							</div>
						</Link>
						<div className="flex items-center justify-between mt-4">
							<p className="text-md md:text-sm font-medium text-slate-700">
								{formatPrice(course.price)}
							</p>

							<EnrollCourse
								asLink={true}
								courseId={course._id.toString()}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Courses;
