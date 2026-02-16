"use client";

import QuizModal from "./quiz-modal";

const VideoDescription = ({ description }) => {
	// console.log(description);

	return (
		<div className="mt-4 ">
			{description && (
				<div dangerouslySetInnerHTML={{ __html: description }} />
			)}
		</div>
	);
};

export default VideoDescription;
