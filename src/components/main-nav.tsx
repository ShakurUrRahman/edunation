"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn, getAvatarGradient, getInitials } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import {
	Menu,
	X,
	GraduationCap,
	BookOpen,
	LogOut,
	User,
	LayoutDashboard,
	BookMarked,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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

export function MainNav({ items, children }) {
	const { data: session } = useSession();
	const [loginSession, setLoginSession] = useState(null);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const pathname = usePathname();
	const [loggedInUser, setLoggedInUser] = useState(null);

	if (session?.error === "RefreshAccessTokenError") redirect("/login");

	const [open, setOpen] = useState(false);
	const [openRegistrar, setOpenRegistrar] = useState(false);
	const avatarRef = useRef<HTMLDivElement>(null);
	const registerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setLoginSession(session);
		async function fetchMe() {
			try {
				const res = await fetch("/api/me");
				const data = await res.json();
				setLoggedInUser(data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchMe();
	}, [session]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const t = e.target as Node;
			if (
				!avatarRef.current?.contains(t) &&
				!registerRef.current?.contains(t)
			) {
				setOpen(false);
				setOpenRegistrar(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleOnOff = () => {
		setOpenRegistrar(false);
		setOpen((prev) => !prev);
	};

	const handleOnOffRegistrar = () => {
		setOpen(false);
		setOpenRegistrar((prev) => !prev);
	};

	return (
		<header className="fixed top-0 left-0 right-0 w-full z-[100] px-4 container">
			<div className="mt-4 md:mt-6 flex items-center justify-between rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg px-4 md:px-6 py-3">
				{/* LEFT — logo + nav */}
				<div className="flex items-center gap-4 lg:gap-10">
					<Link href="/" className="shrink-0">
						<img
							src="/logo.png"
							className="h-8 md:h-12 w-auto"
							alt="Logo"
						/>
					</Link>

					{items?.length ? (
						<nav className="hidden lg:flex gap-2">
							{items.map((item, index) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={index}
										href={item.disabled ? "#" : item.href}
										className={cn(
											"px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
											isActive
												? "bg-gradient-to-r from-primary to-accent-blue text-white shadow-md"
												: "text-foreground/70 hover:text-foreground hover:bg-gray-400/10",
										)}
									>
										{item.title}
									</Link>
								);
							})}
						</nav>
					) : null}
				</div>

				{/* RIGHT — auth buttons / avatar */}
				<div className="flex items-center gap-2 md:gap-3">
					{/* ── Logged OUT ─────────────────────────────────────── */}
					{!loginSession && (
						<div className="hidden lg:flex items-center gap-3">
							{/* Login */}
							<Link
								href="/login"
								className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-primary to-accent-blue text-white shadow-md hover:scale-105 transition-all"
							>
								Login
							</Link>

							{/* Register dropdown */}
							<div className="relative" ref={registerRef}>
								<Button
									onClick={handleOnOffRegistrar}
									className="rounded-full px-5 py-2 text-sm font-medium backdrop-blur-md border border-white/40 hover:scale-105 transition-all"
								>
									Register
								</Button>

								<AnimatePresence>
									{openRegistrar && (
										<motion.div
											variants={dropdownVariants}
											initial="hidden"
											animate="visible"
											exit="exit"
											className="absolute right-0 mt-3 w-52 rounded-2xl bg-white border border-gray-100 shadow-2xl z-50 overflow-hidden p-1.5"
										>
											<p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
												Register as
											</p>

											<Link
												href="/register/student"
												onClick={() =>
													setOpenRegistrar(false)
												}
												className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors group"
											>
												<span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
													<GraduationCap className="w-4 h-4 text-primary" />
												</span>
												<div>
													<p className="font-semibold text-[13px]">
														Student
													</p>
													<p className="text-[11px] text-gray-400">
														Learn new skills
													</p>
												</div>
											</Link>

											<Link
												href="/register/instructor"
												onClick={() =>
													setOpenRegistrar(false)
												}
												className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors group"
											>
												<span className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
													<BookOpen className="w-4 h-4 text-amber-500" />
												</span>
												<div>
													<p className="font-semibold text-[13px]">
														Instructor
													</p>
													<p className="text-[11px] text-gray-400">
														Teach & earn
													</p>
												</div>
											</Link>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>
					)}

					{/* ── Logged IN — avatar + dropdown ─────────────────── */}
					{loginSession && (
						<div className="relative" ref={avatarRef}>
							<div
								className="cursor-pointer ring-2 ring-primary/20 rounded-full hover:ring-primary transition-all scale-90 md:scale-100"
								onClick={handleOnOff}
							>
								<Avatar>
									{loggedInUser?.profilePicture ? (
										<AvatarImage
											src={loggedInUser?.profilePicture}
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

							<AnimatePresence>
								{open && (
									<motion.div
										variants={dropdownVariants}
										initial="hidden"
										animate="visible"
										exit="exit"
										className="absolute right-0 mt-3 w-56 rounded-2xl bg-white border border-gray-100 shadow-2xl z-50 overflow-hidden p-1.5"
									>
										{/* User info header */}
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

										{/* Dashboard — instructors only */}
										{loggedInUser?.role ===
											"instructor" && (
											<Link
												href="/dashboard"
												onClick={() => setOpen(false)}
												className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors group"
											>
												<LayoutDashboard className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
												Dashboard
											</Link>
										)}

										{/* My Courses */}
										<Link
											href="/account/enrolled-courses"
											onClick={() => setOpen(false)}
											className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors group"
										>
											<BookMarked className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
											My Courses
										</Link>

										{/* Divider */}
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
					)}

					{/* MOBILE MENU BUTTON */}
					<button
						className="p-2 lg:hidden"
						onClick={() => setShowMobileMenu(!showMobileMenu)}
					>
						<motion.div
							animate={
								showMobileMenu ? { rotate: 90 } : { rotate: 0 }
							}
							transition={{ duration: 0.2 }}
						>
							{showMobileMenu ? (
								<X size={24} />
							) : (
								<Menu size={24} />
							)}
						</motion.div>
					</button>
				</div>
			</div>

			<AnimatePresence>
				{showMobileMenu && items && (
					<MobileNav
						items={items}
						onClose={() => setShowMobileMenu(false)}
					>
						{children}
					</MobileNav>
				)}
			</AnimatePresence>
		</header>
	);
}
