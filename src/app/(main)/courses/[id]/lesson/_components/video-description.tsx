"use client";

import QuizModal from "./quiz-modal";

function VideoDescription({ description }) {
	return (
		<div className="mt-4">
			{description && (
				<p className="text-gray-700 dark:text-gray-300">
					{description}
				</p>
			)}
		</div>
	);
}

export default VideoDescription;
