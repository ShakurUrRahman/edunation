import Link from "next/link";

import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks/use-lock-body";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function MobileNav({ items, children, onClose }) {
	useLockBody();

	const { data: session } = useSession();

	const [loginSession, setLoginSession] = useState(null);

	if (session?.error === "RefreshAccessTokenError") {
		redirect("/login");
	}

	useEffect(() => {
		setLoginSession(session);
	}, [session]);

	return (
		<div className="fixed inset-0 top-[72px] z-50 lg:hidden px-4">
			{/* Animated Backdrop */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
				className="absolute inset-0 bg-black/20 backdrop-blur-sm"
			/>

			{/* Animated Menu Card */}
			<motion.div
				initial={{ opacity: 0, y: -20, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: -20, scale: 0.95 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
				className="relative z-20 w-full mt-2 rounded-3xl bg-white p-6 shadow-2xl border border-white/50"
			>
				<nav className="flex flex-col gap-1">
					{items.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.05 }} // Staggered entrance
						>
							<Link
								href={item.href}
								onClick={onClose}
								className="block w-full p-3 text-lg font-semibold text-gray-800 hover:bg-primary/5 rounded-xl transition-colors"
							>
								{item.title}
							</Link>
						</motion.div>
					))}
				</nav>

				{/* Auth Section */}
				{!loginSession && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="mt-6 pt-6 border-t flex flex-col gap-3"
					>
						<Link
							href="/login"
							onClick={onClose}
							className="w-full py-4 text-center bg-primary text-white rounded-2xl font-bold"
						>
							Login
						</Link>
						<Link
							href="/register/student"
							onClick={onClose}
							className="w-full py-4 text-center border border-gray-200 rounded-2xl font-semibold"
						>
							Get Started
						</Link>
					</motion.div>
				)}
			</motion.div>
		</div>
	);
}
