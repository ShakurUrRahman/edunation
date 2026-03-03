"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
	children: React.ReactNode; // CourseSidebar passed from server layout
}

export const CourseSidebarMobile = ({ children }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors shrink-0"
			>
				<Menu className="w-4 h-4" />
			</button>

			<AnimatePresence>
				{open && (
					<>
						<motion.div
							key="backdrop"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm"
							onClick={() => setOpen(false)}
						/>
						<motion.div
							key="drawer"
							initial={{ x: "-100%" }}
							animate={{ x: 0 }}
							exit={{ x: "-100%" }}
							transition={{
								duration: 0.3,
								ease: [0.32, 0.72, 0, 1],
							}}
							className="fixed top-0 left-0 bottom-0 z-[160] w-80 bg-white shadow-2xl flex flex-col"
						>
							<div className="flex items-center justify-between px-4 h-14 border-b shrink-0">
								<span className="font-bold text-sm text-gray-800">
									Course Content
								</span>
								<button
									onClick={() => setOpen(false)}
									className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
								>
									<X className="w-4 h-4" />
								</button>
							</div>
							<div className="flex-1 overflow-hidden">
								{children}{" "}
								{/* ← server component renders here safely */}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};
