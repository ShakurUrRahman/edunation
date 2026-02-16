import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import SessionProviderWrapper from "@/hooks/useSessionWrapper";

const navLinks = [
	{
		title: "Courses",
		href: "/courses",
	},
	{
		title: "About",
		href: "/about",
	},
	{
		title: "Blog",
		href: "/blog",
	},
	{
		title: "Contact",
		href: "/contact",
	},
];

const MainLayout = ({ children }) => {
	return (
		<div className="min-h-screen flex-col hero">
			<header className="z-40 backdrop-blur-lg fixed top-0 left-0 right-0">
				<SessionProviderWrapper>
					<div className="container flex h-20 items-center justify-between py-6">
						<MainNav items={navLinks} />
					</div>
				</SessionProviderWrapper>
			</header>
			<main className="flex-1 pt-20 flex flex-col">{children}</main>
			<SiteFooter />
		</div>
	);
};
export default MainLayout;
