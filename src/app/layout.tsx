import type { Metadata } from "next";
import { Jost, League_Spartan, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { log } from "console";
import { dbConnect } from "@/service/mongo";
import ScrollToTopButton from "@/components/scroll-to-top-button";

/* Google Fonts */
const jost = Jost({
	subsets: ["latin"],
	variable: "--ed-ff-jost",
	display: "swap",
});

const openSans = Open_Sans({
	subsets: ["latin"],
	variable: "--ed-ff-body",
	display: "swap",
});

const spartan = League_Spartan({
	subsets: ["latin"],
	variable: "--ed-ff-heading",
	display: "swap",
});

export const metadata: Metadata = {
	title: "EduNation - Learn Anything, Anywhere",
	description: "Empowering Education Through Technology",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	await dbConnect();

	return (
		<html lang="en">
			<body
				className={`${jost.variable}
					${openSans.variable} 
					${spartan.variable}`}
			>
				{children}
				<ScrollToTopButton />
				<Toaster position="top-center" richColors />
			</body>
		</html>
	);
}
