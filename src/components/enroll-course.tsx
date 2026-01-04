"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";
import React from "react";

interface CourseData {
	id: string;
	title?: string;
	price?: number;
}

interface EnrollCourseProps {
	asLink?: boolean;
	courseData: CourseData;
}

export const EnrollCourse = (React.FC<EnrollCourseProps> = ({
	asLink,
	courseData,
}) => {
	const formAction = async (data) => {
		const { url } = await createCheckoutSession(data);
		window.location.assign(url);
	};

	return (
		<>
			<form action={formAction}>
				<input type="hidden" name="courseId" value={courseData?.id} />
				<input
					type="hidden"
					name="courseName"
					value={courseData?.title}
				/>
				<input
					type="hidden"
					name="coursePrice"
					value={courseData?.price}
				/>
				{asLink ? (
					<Button
						type="submit"
						variant="ghost"
						className="text-xs text-sky-700 h-7 gap-1"
					>
						Enroll
						<ArrowRight className="w-3" />
					</Button>
				) : (
					<Button
						type="submit"
						className={cn(buttonVariants({ size: "lg" }))}
					>
						Enroll Now
					</Button>
				)}
			</form>
		</>
	);
});
