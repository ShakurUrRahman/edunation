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
		<div className="min-h-screen hero">
			<SessionProviderWrapper>
				<div className="flex items-center justify-between py-6">
					<MainNav items={navLinks} />
				</div>
			</SessionProviderWrapper>
			<main className="pt-24">{children}</main>
			<SiteFooter />
		</div>
	);
};
export default MainLayout;
