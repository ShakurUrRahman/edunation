import { Send, Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="relative hero pt-32">
			{/* ================= Newsletter Section ================= */}
			<div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl mb-10">
				<div className="bg-emerald-900 rounded-3xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
					<h2 className="text-3xl md:text-4xl font-bold text-white max-w-xl">
						Sign Up today to get the latest inspiration & insights
					</h2>

					<div className="flex items-center bg-white rounded-xl overflow-hidden w-full md:w-[400px]">
						<input
							type="email"
							placeholder="Enter Your Email Address"
							className="flex-1 px-4 py-3 outline-none text-sm"
						/>
						<button className="bg-emerald-800 p-3 text-white hover:bg-emerald-700 transition">
							<Send size={18} />
						</button>
					</div>
				</div>
			</div>

			{/* ================= Main Footer ================= */}
			<div className="container mx-auto px-6 pb-20">
				<div className="grid md:grid-cols-4 gap-12">
					{/* Logo + About */}
					<div>
						<h3 className="text-2xl font-bold text-emerald-900 mb-4">
							Edu<span className="text-black">Nation</span>
						</h3>
						<p className="text-gray-600 leading-relaxed mb-6">
							Access expert-led courses designed to help you
							succeed in your career, all from the comfort of your
							home.
						</p>

						<button className="bg-emerald-900 text-white px-6 py-3 rounded-full hover:bg-emerald-800 transition">
							Contact Us →
						</button>
					</div>

					{/* Useful Links */}
					<div>
						<h4 className="text-xl font-semibold mb-6">
							Useful Links
						</h4>
						<ul className="space-y-3 text-gray-600">
							<li>
								<Link href="#">Marketplace</Link>
							</li>
							<li>
								<Link href="#">Kindergarten</Link>
							</li>
							<li>
								<Link href="#">University</Link>
							</li>
							<li>
								<Link href="#">GYM Coaching</Link>
							</li>
							<li>
								<Link href="#">Cooking</Link>
							</li>
						</ul>
					</div>

					{/* Company */}
					<div>
						<h4 className="text-xl font-semibold mb-6">
							Our Company
						</h4>
						<ul className="space-y-3 text-gray-600">
							<li>
								<Link href="#">Contact Us</Link>
							</li>
							<li>
								<Link href="#">Become Teacher</Link>
							</li>
							<li>
								<Link href="#">Blog</Link>
							</li>
							<li>
								<Link href="#">Instructor</Link>
							</li>
							<li>
								<Link href="#">Events</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className="text-xl font-semibold mb-6">
							Get Contact
						</h4>
						<ul className="space-y-3 text-gray-600">
							<li>
								<strong>Phone:</strong> (+91) 123-456-789
							</li>
							<li>
								<strong>Email:</strong> educeet@gmail.com
							</li>
							<li>
								<strong>Location:</strong> North America, USA
							</li>
						</ul>

						<div className="flex gap-4 mt-6">
							<Facebook className="cursor-pointer hover:text-emerald-800 transition" />
							<Instagram className="cursor-pointer hover:text-emerald-800 transition" />
							<Linkedin className="cursor-pointer hover:text-emerald-800 transition" />
						</div>
					</div>
				</div>
			</div>

			{/* ================= Bottom Bar ================= */}
			<div className="bg-emerald-900 py-4 text-center text-white text-sm">
				Copyright © 2026{" "}
				<span className="text-yellow-300">EduNation</span> All Rights
				Reserved
			</div>
		</footer>
	);
}
