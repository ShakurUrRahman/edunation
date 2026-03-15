"use client";

import { Logo } from "@/components/logo";
import { MobileSidebar } from "./mobile-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, User, BookMarked, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getAvatarGradient, getInitials } from "@/lib/utils";

const dropdownVariants = {
	hidden: { opacity: 0, y: -8, scale: 0.96 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.18, ease: "easeOut" },
	},
	exit: {
		opacity: 0,
		y: -8,
		scale: 0.96,
		transition: { duration: 0.14, ease: "easeIn" },
	},
};

export const Navbar = () => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [open, setOpen] = useState(false);
	const avatarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		async function fetchMe() {
			try {
				const res = await fetch("/api/me");
				const data = await res.json();
				setLoggedInUser(data);
			} catch (e) {
				console.error(e);
			}
		}
		fetchMe();
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!avatarRef.current?.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="p-4 border-b h-full flex items-center bg-white shadow-sm hero">
			<MobileSidebar />
			<div className="flex items-center justify-end w-full">
				<div className="relative" ref={avatarRef}>
					{/* Avatar trigger */}
					<div
						className="cursor-pointer ring-2 ring-primary/20 rounded-full hover:ring-primary transition-all"
						onClick={() => setOpen((prev) => !prev)}
					>
						<Avatar>
							{loggedInUser?.profilePicture ? (
								<AvatarImage
									src={loggedInUser.profilePicture}
								/>
							) : (
								<AvatarFallback
									className={`bg-gradient-to-br ${getAvatarGradient(loggedInUser?.email)} text-white`}
								>
									{getInitials(
										loggedInUser?.firstName,
										loggedInUser?.lastName,
									)}
								</AvatarFallback>
							)}
						</Avatar>
					</div>

					{/* Dropdown */}
					<AnimatePresence>
						{open && (
							<motion.div
								variants={dropdownVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								className="absolute right-0 mt-6 w-56 rounded-2xl bg-white border border-gray-100 shadow-2xl z-50 overflow-hidden p-1.5"
							>
								{/* User info */}
								{loggedInUser && (
									<div className="px-3 py-2.5 mb-1 border-b border-gray-100">
										<p className="text-[13px] font-bold text-gray-800 truncate">
											{loggedInUser.firstName}{" "}
											{loggedInUser.lastName}
										</p>
										<p className="text-[11px] text-gray-400 truncate">
											{loggedInUser.email}
										</p>
									</div>
								)}

								{/* Profile */}
								<Link
									href="/account"
									onClick={() => setOpen(false)}
									className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors group"
								>
									<User className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
									Profile
								</Link>

								{/* My Courses */}
								<Link
									href="/account/enrolled-courses"
									onClick={() => setOpen(false)}
									className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors group"
								>
									<BookMarked className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
									My Courses
								</Link>

								<div className="my-1 border-t border-gray-100" />

								{/* Logout */}
								<button
									onClick={() =>
										signOut({ callbackUrl: "/" })
									}
									className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors group"
								>
									<LogOut className="w-4 h-4 text-red-400" />
									Logout
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};
