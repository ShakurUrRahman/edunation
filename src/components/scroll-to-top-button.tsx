"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			onClick={scrollToTop}
			className={`
        fixed bottom-6 right-6 z-50
        p-3 rounded-full w-12 h-12
        bg-gradient-to-r from-primary to-teal-400
        text-white shadow-lg
        transition-all duration-300
        hover:scale-110
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
		>
			<ArrowUp className="w-6 h-6" />
		</button>
	);
}
