import type { Metadata } from "next";
import { Jost, League_Spartan, Open_Sans } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${jost.variable}
					${openSans.variable} 
					${spartan.variable}`}
			>
				{children}
				<Toaster position="bottom-right" richColors />
			</body>
		</html>
	);
}
