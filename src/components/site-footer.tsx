import {
	Send,
	Facebook,
	Instagram,
	Linkedin,
	ArrowUp,
	YoutubeIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="relative hero pt-32">
			{/* ================= Newsletter Section ================= */}
			<div className="absolute -top-20 left-1/2 -translate-x-1/2  container">
				<div className="bg-emerald-900 rounded-3xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
					<h2 className="text-3xl md:text-4xl font-bold text-white max-w-xl leading-12">
						Sign Up today to get the latest inspiration & insights
					</h2>

					<div className="w-full max-w-xl">
						<div className="relative">
							<input
								type="email"
								placeholder="Enter Your Email Address"
								className="
        w-full
        bg-gray-200
        text-gray-700
        placeholder:text-gray-500
        px-6
        py-4
        pr-20
        rounded-2xl
        outline-none
        text-sm
      "
							/>

							<button
								className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        bg-emerald-900
        text-white
        p-3
        rounded-xl
        transition
        duration-300
        hover:bg-emerald-800
        hover:scale-105
      "
							>
								<Send size={18} />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* ================= Main Footer ================= */}
			<div className="container mx-auto px-6 pb-20 mt-16 mb-10">
				<div className="grid md:grid-cols-4 gap-12">
					{/* Logo + About */}
					<div>
						<img
							src="/assets/logo.png"
							alt="EduNation Logo"
							className="w-auto h-16 mb-4 -ml-3"
						/>
						<p className="text-gray-600 leading-relaxed mb-6">
							Access expert-led courses designed to help you
							succeed in your career, all from the comfort of your
							home.
						</p>

						<button className=" text-white px-6 py-3 rounded-full hover:shadow-xl hover:transition-all duration-400 hover:scale-105 bg-gradient-to-r from-primary to-teal-400 hover:font-bold">
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
								<Link
									className="inline-block text-muted-foreground transition duration-300 ease-in-out hover:text-primary hover:scale-105 hover:font-semibold"
									href="#"
								>
									Marketplace
								</Link>
							</li>
							<li>
								<Link
									className="inline-block text-muted-foreground transition duration-300 ease-in-out hover:text-primary hover:scale-105 hover:font-semibold"
									href="#"
								>
									Kindergarten
								</Link>
							</li>
							<li>
								<Link
									className="inline-block text-muted-foreground transition duration-300 ease-in-out hover:text-primary hover:scale-105 hover:font-semibold"
									href="#"
								>
									University
								</Link>
							</li>
							<li>
								<Link
									className="inline-block text-muted-foreground transition duration-300 ease-in-out hover:text-primary hover:scale-105 hover:font-semibold"
									href="#"
								>
									GYM Coaching
								</Link>
							</li>
							<li>
								<Link
									className="inline-block text-muted-foreground transition duration-300 ease-in-out hover:text-primary hover:scale-105 hover:font-semibold"
									href="#"
								>
									Cooking
								</Link>
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
								<Link
									className="inline-block text-muted-foreground transition duration-300 ease-in-out hover:text-primary hover:scale-105 hover:font-semibold"
									href="#"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									className="inline-block text-muted-foreground transition duration-300 ease-in-out hover:text-primary hover:scale-105 hover:font-semibold"
									href="#"
								>
									Become Teacher
								</Link>
							</li>
							<li>
								<Link
									className="inline-block text-muted-foreground transition duration-300 ease-in-out hover:text-primary hover:scale-105 hover:font-semibold"
									href="#"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									className="inline-block text-muted-foreground transition duration-300 ease-in-out hover:text-primary hover:scale-105 hover:font-semibold"
									href="#"
								>
									Instructor
								</Link>
							</li>
							<li>
								<Link
									className="inline-block text-muted-foreground transition duration-300 ease-in-out hover:text-primary hover:scale-105 hover:font-semibold"
									href="#"
								>
									Events
								</Link>
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
								<strong>Email:</strong> contact@edunation.com
							</li>
							<li>
								<strong>Location:</strong> North America, USA
							</li>
						</ul>

						<div className="flex gap-6 mt-6">
							<Facebook className="cursor-pointer hover:text-primary hover:transition duration-400 hover:scale-120" />
							<YoutubeIcon className="cursor-pointer hover:text-primary hover:transition duration-400 hover:scale-120" />{" "}
							<Linkedin className="cursor-pointer hover:text-primary hover:transition duration-400 hover:scale-120" />
							<Instagram className="cursor-pointer hover:text-primary hover:transition duration-400 hover:scale-120" />
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
