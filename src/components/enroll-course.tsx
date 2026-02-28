"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, GraduationCap } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";
import React from "react";

interface EnrollCourseProps {
	asLink?: boolean;
	courseId: string;
}

export const EnrollCourse = (React.FC<EnrollCourseProps> = ({
	asLink,
	courseId,
}) => {
	const formAction = async (data) => {
		const { url } = await createCheckoutSession(data);
		window.location.assign(url);
	};

	return (
		<>
			<form action={formAction}>
				<input type="hidden" name="courseId" value={courseId} />

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
						className="w-full h-12 bg-primary hover:opacity-90 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
					>
						<GraduationCap className="w-5 h-5 " />
						Enroll Now
					</Button>
				)}
			</form>
		</>
	);
});
