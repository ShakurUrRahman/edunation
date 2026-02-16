"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn, getAvatarGradient, getInitials } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";
import { Logo } from "./logo";
import Image from "next/image";
import { X } from "lucide-react";
import { Command } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

export function MainNav({ items, children }) {
	const { data: session } = useSession();
	const [loginSession, setLoginSession] = useState(null);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const pathname = usePathname(); // ✅ added
	const [loggedInUser, setLoggedInUser] = useState(null);
	// console.log(session);

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
				// console.log(data);
				setLoggedInUser(data);
			} catch (err) {
				console.log(err);
			}
		}

		fetchMe();
	}, [session]);

	// console.log("Logged in user:", loggedInUser);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			const clickedAvatar = avatarRef.current?.contains(target);

			const clickedRegister = registerRef.current?.contains(target);

			// If click is outside BOTH (or register doesn't exist)
			if (!clickedAvatar && !clickedRegister) {
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
		<>
			<div className="size-14 text-3xl">
				<Logo />
			</div>
			<div>
				{items?.length ? (
					<nav className="hidden gap-6 lg:flex">
						{items?.map((item, index) => {
							const isActive = pathname === item.href; // ✅ check active route
							return isActive ? (
								// ✅ active: colored text, no underline animation, not clickable
								<span
									key={index}
									className="relative flex items-center tracking-wide text-lg font-medium sm:text-sm text-primary/50 cursor-default"
								>
									{item.title}
								</span>
							) : (
								<Link
									key={index}
									href={item.disabled ? "#" : item.href}
									className={cn(
										"relative flex items-center tracking-wide text-lg font-medium sm:text-sm transition-colors text-primary hover:text-primary/80 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-600 after:ease-out hover:after:scale-x-100",
									)}
								>
									{item.title}
								</Link>
							);
						})}
					</nav>
				) : null}

				{showMobileMenu && items && (
					<MobileNav items={items}>{children}</MobileNav>
				)}
			</div>
			<nav className="flex items-center gap-3">
				{!loginSession && (
					<div className="items-center gap-3 hidden lg:flex">
						<Link
							href="/login"
							className={cn(
								buttonVariants({ size: "sm" }),
								"px-4",
							)}
						>
							Login
						</Link>
						<div className="relative" ref={registerRef}>
							<Button
								onClick={handleOnOffRegistrar}
								variant="outline"
								size="sm"
							>
								Register
							</Button>

							<div
								className={cn(
									"absolute right-0 mt-4 w-56 rounded-lg border text-white bg-primary shadow-lg origin-top-right transform transition-all duration-200 ease-out",
									openRegistrar
										? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
										: "scale-95 opacity-0 -translate-y-2 pointer-events-none",
								)}
							>
								<Link
									href="/register/student"
									className="block px-4 py-2 hover:bg-primary-light rounded-t-lg"
									onClick={() => setOpenRegistrar(false)}
								>
									Student
								</Link>
								<Link
									href="/register/instructor"
									className="block px-4 py-2 hover:bg-primary-light rounded-b-lg"
									onClick={() => setOpenRegistrar(false)}
								>
									Instructor
								</Link>
							</div>
						</div>
					</div>
				)}
				<div className="relative" ref={avatarRef}>
					{loginSession && (
						<div className="cursor-pointer" onClick={handleOnOff}>
							<Avatar>
								{loggedInUser?.profilePicture ? (
									<AvatarImage
										src={loggedInUser?.profilePicture}
										alt={loggedInUser?.profilePicture}
									/>
								) : (
									<AvatarFallback
										className={`bg-gradient-to-br ${getAvatarGradient(loggedInUser?.email)} text-white font-semibold`}
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
							"absolute right-0 mt-4 w-56 rounded-lg border text-white bg-primary shadow-lg origin-top-right transform transition-all duration-200 ease-out",
							open
								? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
								: "scale-95 opacity-0 -translate-y-2 pointer-events-none",
						)}
					>
						<Link
							href="/account"
							className="block px-4 py-2 hover:bg-primary-light rounded-t-lg"
							onClick={() => setOpen(false)}
						>
							Profile
						</Link>
						{loggedInUser?.role === "instructor" && (
							<Link
								href="/dashboard"
								className="block px-4 py-2 hover:bg-primary-light"
								onClick={() => setOpen(false)}
							>
								Dashboard
							</Link>
						)}
						<Link
							href="/account/enrolled-courses"
							className="block px-4 py-2 hover:bg-primary-light"
							onClick={() => setOpen(false)}
						>
							My Courses
						</Link>
						<Link
							href="/account/testimonials"
							className={cn(
								"block px-4 py-2 hover:bg-primary-light",
								!loginSession && "rounded-b-lg",
							)}
						>
							Testimonials & Certificates
						</Link>
						{loginSession && (
							<Link
								href="#"
								className="block px-4 py-2 hover:bg-primary-light w-full rounded-b-lg text-left"
								onClick={() => {
									signOut({ callbackUrl: "/" });
								}}
							>
								Logout
							</Link>
						)}
					</div>
				</div>
				<button
					className="flex items-center space-x-2 lg:hidden"
					onClick={() => setShowMobileMenu(!showMobileMenu)}
				>
					{showMobileMenu ? <X /> : <Menu />}
				</button>
			</nav>
		</>
	);
}
