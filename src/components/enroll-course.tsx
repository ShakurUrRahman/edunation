"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";
import React, { useTransition } from "react";

interface EnrollCourseProps {
	asLink?: boolean;
	courseId: string;
}

export const EnrollCourse: React.FC<EnrollCourseProps> = ({
	asLink,
	courseId,
}) => {
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (formData: FormData) => {
		const { url } = await createCheckoutSession(formData);
		window.location.assign(url);
	};

	const formAction = (formData: FormData) => {
		startTransition(() => {
			handleSubmit(formData);
		});
	};

	return (
		<form action={formAction}>
			<input type="hidden" name="courseId" value={courseId} />

			{asLink ? (
				<Button
					type="submit"
					variant="ghost"
					className="text-xs text-amber-50 h-7 gap-1"
				>
					{isPending ? (
						<>
							<span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
							Processing...
						</>
					) : (
						<>
							<GraduationCap className="w-5 h-5" />
							Enroll Now
						</>
					)}
					<ArrowRight className="w-3" />
				</Button>
			) : (
				<Button
					type="submit"
					disabled={isPending}
					className="w-full h-12 bg-primary hover:opacity-90 disabled:opacity-70 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-95"
				>
					{isPending ? (
						<>
							<span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
							Processing...
						</>
					) : (
						<>
							<GraduationCap className="w-5 h-5" />
							Enroll Now
						</>
					)}
				</Button>
			)}
		</form>
	);
};
