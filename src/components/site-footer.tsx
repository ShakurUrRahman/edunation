"use client";

import { Send, Facebook, Instagram, Linkedin, YoutubeIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="relative bg-white pt-16 md:pt-32 hero">
			<div className="relative md:absolute md:-top-24 left-0 right-0 z-10 container mx-auto px-4">
				<div className="bg-emerald-900 rounded-3xl px-6 py-10 md:px-12 md:py-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
					<h2 className="text-2xl md:text-4xl font-bold text-white text-center lg:text-left max-w-xl leading-tight md:leading-tight">
						Sign Up today to get the latest inspiration & insights
					</h2>

					<div className="w-full max-w-md lg:max-w-xl">
						<form
							className="relative group"
							onSubmit={(e) => e.preventDefault()}
						>
							<input
								type="email"
								placeholder="Enter Your Email Address"
								className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-300 px-6 py-4 md:py-5 pr-16 rounded-2xl outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm md:text-base"
							/>
							<button
								type="submit"
								className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-emerald-900 p-3 rounded-xl transition duration-300 hover:bg-teal-400 hover:text-white hover:scale-105 active:scale-95"
							>
								<Send size={20} />
							</button>
						</form>
					</div>
				</div>
			</div>

			{/* ================= Main Footer ================= */}
			<div className="container mx-auto px-6 pb-16 pt-12 md:pt-24 lg:pt-32">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
					{/* Logo + About */}
					<div className="flex flex-col items-start -mt-[13px]">
						<img
							src="/assets/logo.png"
							alt="EduNation Logo"
							className="w-auto h-12 md:h-16 mb-4 -ml-3"
						/>
						<p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
							Access expert-led courses designed to help you
							succeed in your career, all from the comfort of your
							home.
						</p>

						<button className="px-8 py-3 bg-gradient-to-r from-primary to-teal-400 text-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block hover:font-semibold">
							Contact Us →
						</button>
					</div>

					{/* Useful Links */}
					<div className="lg:pl-8">
						<h4 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2 w-fit">
							Useful Links
						</h4>
						<ul className="space-y-3">
							{[
								"Marketplace",
								"Kindergarten",
								"University",
								"GYM Coaching",
								"Cooking",
							].map((link) => (
								<li key={link}>
									<Link
										href="#"
										className="text-gray-600 text-sm md:text-base transition duration-300  ease-in-out hover:text-primary hover:scale-105 hover:font-semibold inline-block"
									>
										{link}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div className="lg:pl-8">
						<h4 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2 w-fit">
							Our Company
						</h4>
						<ul className="space-y-3">
							{[
								"Contact Us",
								"Become Teacher",
								"Blog",
								"Instructor",
								"Events",
							].map((link) => (
								<li key={link}>
									<Link
										href="#"
										className="text-gray-600 text-sm md:text-base transition duration-300  ease-in-out hover:text-primary hover:scale-105 hover:font-semibold inline-block"
									>
										{link}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className="text-lg font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2 w-fit">
							Get Contact
						</h4>
						<ul className="space-y-4 text-gray-600 text-sm md:text-base">
							<li className="flex flex-col">
								<span className="font-bold text-gray-900">
									Phone:
								</span>
								<span>(+91) 123-456-789</span>
							</li>
							<li className="flex flex-col">
								<span className="font-bold text-gray-900">
									Email:
								</span>
								<span>contact@edunation.com</span>
							</li>
							<li className="flex flex-col">
								<span className="font-bold text-gray-900">
									Location:
								</span>
								<span>North America, USA</span>
							</li>
						</ul>

						<div className="flex gap-4 mt-8">
							{[Facebook, YoutubeIcon, Linkedin, Instagram].map(
								(Icon, idx) => (
									<a
										key={idx}
										href="#"
										className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
									>
										<Icon size={18} />
									</a>
								),
							)}
						</div>
					</div>
				</div>
			</div>

			{/* ================= Bottom Bar ================= */}
			<div className="bg-emerald-900 py-6 text-center text-white text-xs md:text-sm px-4">
				<p>
					Copyright © 2026{" "}
					<span className="font-bold">
						Edu<span className="font-light">Nation</span>
					</span>
					. All Rights Reserved.
				</p>
			</div>
		</footer>
	);
}
