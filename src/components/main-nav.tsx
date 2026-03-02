"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn, getAvatarGradient, getInitials } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function MainNav({ items, children }) {
	const { data: session } = useSession();
	const [loginSession, setLoginSession] = useState(null);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const pathname = usePathname();
	const [loggedInUser, setLoggedInUser] = useState(null);

	if (session?.error === "RefreshAccessTokenError") {
		redirect("/login");
	}

	const [open, setOpen] = useState(false);
	const [openRegistrar, setOpenRegistrar] = useState(false);
	const avatarRef = useRef<HTMLDivElement>(null);
	const registerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setLoginSession(session);

		async function fetchMe() {
			try {
				const response = await fetch("/api/me");
				const data = await response.json();
				setLoggedInUser(data);
			} catch (err) {
				console.log(err);
			}
		}

		fetchMe();
	}, [session]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				!avatarRef.current?.contains(target) &&
				!registerRef.current?.contains(target)
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
		if (!openRegistrar) {
			setOpen((prev) => !prev);
		} else {
			setOpenRegistrar(false);
			setOpen((prev) => !prev);
		}
	};

	const handleOnOffRegistrar = () => {
		if (!open) {
			setOpenRegistrar((prev) => !prev);
		} else {
			setOpen(false);
			setOpenRegistrar((prev) => !prev);
		}
	};

	return (
		<header className="fixed top-0 left-0 right-0 w-full z-[100] px-4 container">
			<div className="mt-4 md:mt-6 flex items-center justify-between rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg px-4 md:px-6 py-3">
				{/* LEFT SIDE */}
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

				{/* RIGHT SIDE */}
				<div className="flex items-center gap-2 md:gap-3">
					{!loginSession && (
						<div className="hidden lg:flex items-center gap-3">
							<Link
								href="/login"
								className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-primary to-accent-blue text-white shadow-md hover:scale-105 transition-all"
							>
								Login
							</Link>

							<div className="relative" ref={registerRef}>
								<Button
									onClick={handleOnOffRegistrar}
									className="rounded-full px-5 py-2 text-sm font-medium backdrop-blur-md border border-white/40 hover:scale-105 transition-all"
								>
									Register
								</Button>
								{/* Desktop Register Dropdown remains the same */}
							</div>
						</div>
					)}

					{/* AVATAR (Visible on all screens if logged in) */}
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
							{/* Account Dropdown */}
							<div
								className={cn(
									"absolute right-0 mt-6 w-56 rounded-2xl bg-white border shadow-xl transition-all duration-300 z-50",
									open
										? "opacity-100 translate-y-0"
										: "opacity-0 -translate-y-2 pointer-events-none",
								)}
							>
								<Link
									href="/account"
									className="block px-5 py-3 text-sm hover:bg-primary/5"
									onClick={() => setOpen(false)}
								>
									Profile
								</Link>
								<button
									className="w-full text-left px-5 py-3 text-sm text-red-500 hover:bg-red-50"
									onClick={() =>
										signOut({ callbackUrl: "/" })
									}
								>
									Logout
								</button>
							</div>
						</div>
					)}

					{/* MOBILE MENU BUTTON (Only lg:hidden) */}
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
				{showMobileMenu && (
					<MobileNav
						items={items}
						loginSession={loginSession}
						onClose={() => setShowMobileMenu(false)}
					/>
				)}
			</AnimatePresence>
		</header>
	);
}
