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
		<header className="fixed top-0 left-0 right-0 w-full container z-50">
			<div className="mt-6 flex items-center justify-between rounded-2xl bg-white/45 backdrop-blur-lg border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-6 py-3">
				{/* LEFT SIDE */}
				<div className="flex items-center gap-10">
					<Link href="/">
						<img src="/logo.png" className="h-12 w-auto mt-1" />
					</Link>

					{items?.length ? (
						<nav className="hidden gap-2 lg:flex">
							{items.map((item, index) => {
								const isActive = pathname === item.href;

								return (
									<Link
										key={index}
										href={item.disabled ? "#" : item.href}
										className={cn(
											"px-4 py-2  rounded-full text-sm font-medium transition-all duration-300",
											isActive
												? "bg-gradient-to-r from-primary to-accent-blue text-white shadow-md"
												: "text-foreground/70 hover:text-foreground hover:bg-gray-400/20",
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
				<div className="flex items-center gap-3">
					{!loginSession && (
						<div className="items-center gap-3 hidden lg:flex">
							{/* LOGIN */}
							<Link
								href="/login"
								className="px-5 py-2 text-sm font-medium rounded-full 
                  bg-gradient-to-r from-primary to-accent-blue 
                  text-white shadow-md hover:shadow-lg 
                  transition-all duration-300 hover:scale-105"
							>
								Login
							</Link>

							{/* REGISTER */}
							<div className="relative" ref={registerRef}>
								<Button
									onClick={handleOnOffRegistrar}
									className="rounded-full px-5 py-2 text-sm font-medium
                  backdrop-blur-md border border-white/40 hover:scale-105 transition-all duration-300"
								>
									Register
								</Button>

								<div
									className={cn(
										"absolute right-0 mt-8 w-60 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-300",
										openRegistrar
											? "opacity-100 translate-y-0"
											: "opacity-0 -translate-y-2 pointer-events-none",
									)}
								>
									<Link
										href="/register/student"
										className="block px-5 py-3 text-sm hover:bg-primary/10 transition-colors"
										onClick={() => setOpenRegistrar(false)}
									>
										Student
									</Link>
									<Link
										href="/register/instructor"
										className="block px-5 py-3 text-sm hover:bg-primary/10 transition-colors"
										onClick={() => setOpenRegistrar(false)}
									>
										Instructor
									</Link>
								</div>
							</div>
						</div>
					)}

					{/* AVATAR */}
					<div className="relative" ref={avatarRef}>
						{loginSession && (
							<div
								className="cursor-pointer ring-2 ring-primary/20 rounded-full hover:ring-primary transition-all"
								onClick={handleOnOff}
							>
								<Avatar>
									{loggedInUser?.profilePicture ? (
										<AvatarImage
											src={loggedInUser?.profilePicture}
											alt=""
										/>
									) : (
										<AvatarFallback
											className={`bg-gradient-to-br ${getAvatarGradient(
												loggedInUser?.email,
											)} text-white font-semibold`}
										>
											{getInitials(
												loggedInUser?.firstName,
												loggedInUser?.lastName,
											)}
										</AvatarFallback>
									)}
								</Avatar>
							</div>
						)}

						<div
							className={cn(
								"absolute right-0 mt-8 w-60 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-300",
								open
									? "opacity-100 translate-y-0"
									: "opacity-0 -translate-y-2 pointer-events-none",
							)}
						>
							<Link
								href="/account"
								className="block px-5 py-3 text-sm hover:bg-primary/10 transition-colors"
								onClick={() => setOpen(false)}
							>
								Profile
							</Link>

							{loggedInUser?.role === "instructor" && (
								<Link
									href="/dashboard"
									className="block px-5 py-3 text-sm hover:bg-primary/10 transition-colors"
									onClick={() => setOpen(false)}
								>
									Dashboard
								</Link>
							)}

							<Link
								href="/account/enrolled-courses"
								className="block px-5 py-3 text-sm hover:bg-primary/10 transition-colors"
								onClick={() => setOpen(false)}
							>
								My Courses
							</Link>

							<Link
								href="/account/testimonials"
								className="block px-5 py-3 text-sm hover:bg-primary/10 transition-colors"
							>
								Testimonials & Certificates
							</Link>

							<button
								className="w-full text-left px-5 py-3 text-sm hover:bg-primary/10 transition-colors"
								onClick={() => signOut({ callbackUrl: "/" })}
							>
								Logout
							</button>
						</div>
					</div>

					{/* MOBILE MENU BUTTON */}
					<button
						className="flex items-center space-x-2 lg:hidden"
						onClick={() => setShowMobileMenu(!showMobileMenu)}
					>
						{showMobileMenu ? <X /> : <Menu />}
					</button>
				</div>
			</div>

			{showMobileMenu && items && (
				<MobileNav items={items}>{children}</MobileNav>
			)}
		</header>
	);
}
