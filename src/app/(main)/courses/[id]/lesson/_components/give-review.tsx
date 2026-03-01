// _components/give-review.tsx  (course sidebar)
"use client";

import { useState } from "react";
import { MessageSquarePlus, CheckCircle } from "lucide-react";
import { ReviewModal } from "./review-modal";

interface Props {
	courseId: string;
	hasReviewed: boolean; // passed from server component (CourseSidebar)
}

export const GiveReview = ({ courseId, hasReviewed, loggedInUser }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => !hasReviewed && setOpen(true)}
				disabled={hasReviewed}
				className={`
          w-full flex items-center justify-center gap-2
          py-2.5 mt-3 rounded-lg text-sm font-semibold
          border transition-colors duration-200
          ${
				hasReviewed
					? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
					: "bg-white border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
			}
        `}
			>
				{hasReviewed ? (
					<>
						<CheckCircle className="w-4 h-4" /> Review Submitted
					</>
				) : (
					<>
						<MessageSquarePlus className="w-4 h-4" /> Give Review
					</>
				)}
			</button>

			{/* Modal only mounts when user hasn't reviewed yet */}
			{!hasReviewed && (
				<ReviewModal
					open={open}
					setOpen={setOpen}
					courseId={courseId}
				/>
			)}
		</>
	);
};
