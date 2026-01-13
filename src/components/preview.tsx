"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
	ssr: false,
});

export const Preview = ({ value }) => {
	return <ReactQuill theme="bubble" readOnly value={value} />;
};
