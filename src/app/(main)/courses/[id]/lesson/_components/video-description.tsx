"use client";

import QuizModal from "./quiz-modal";

const VideoDescription = ({ description }) => {
	return (
		<div className="mt-4 w-full">
			{description && (
				<div
					/* 1. 'prose' ensures standard HTML tags (p, h1, li) look good.
					   2. 'max-w-none' allows it to fill the container width.
					   3. 'overflow-x-auto' prevents wide tables/code from breaking the layout.
					   4. 'prose-sm md:prose-base' scales text for mobile vs desktop.
					*/
					className="prose prose-sm md:prose-base max-w-none dark:prose-invert 
					           prose-img:rounded-xl prose-img:shadow-md 
					           prose-headings:font-bold prose-headings:text-foreground
					           text-muted-foreground leading-relaxed overflow-x-auto"
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			)}

			{/* If you intend to use QuizModal here, ensure it's wrapped in a responsive container too */}
			<div className="mt-8 flex justify-center md:justify-start">
				{/* <QuizModal /> */}
			</div>
		</div>
	);
};

export default VideoDescription;
