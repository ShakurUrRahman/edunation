"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Loader2,
	ArrowLeft,
	UserPlus,
	ShieldCheck,
	AlertCircle,
} from "lucide-react";

export function SignupForm({ role }) {
	const router = useRouter();
	const [error, setError] = useState("");
	const [isPending, setIsPending] = useState(false);

	async function onSubmit(event) {
		event.preventDefault();
		setError("");
		setIsPending(true);

		const formData = new FormData(event.currentTarget);
		const firstName = formData.get("first-name");
		const lastName = formData.get("last-name");
		const email = formData.get("email");
		const password = formData.get("password");
		const confirmPassword = formData.get("confirmPassword");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setIsPending(false);
			return;
		}

		const userRole = role === "instructor" ? "instructor" : "student";

		try {
			const response = await fetch("/api/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					password,
					userRole,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				router.push("/login");
			} else {
				setError(data.message || "Registration failed");
			}
		} catch (e: any) {
			setError(e.message || "Something went wrong");
		} finally {
			setIsPending(false);
		}
	}

	return (
		<div className="w-full max-w-md mx-auto px-4 py-8">
			{/* Back Button */}
			<Link
				href="/"
				className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group"
			>
				<ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
				Back to Home
			</Link>

			<div className="p-6 sm:p-8 rounded-2xl shadow-xl hero border border-primary/20 relative overflow-hidden">
				{/* Top Accent Line */}
				<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

				<div className="mb-8 text-center">
					<div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 mb-4">
						<UserPlus className="h-6 w-6 text-primary" />
					</div>
					<h1 className="text-2xl font-bold tracking-tight">
						Create an account
					</h1>
					<p className="text-sm text-muted-foreground mt-2">
						Join us as a{" "}
						<span className="text-primary font-semibold capitalize">
							{role || "student"}
						</span>
					</p>
				</div>

				{error && (
					<div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
						<AlertCircle className="h-4 w-4" />
						{error}
					</div>
				)}

				<form onSubmit={onSubmit} className="space-y-5">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="first-name">First name</Label>
							<Input
								id="first-name"
								name="first-name"
								placeholder="Max"
								required
								disabled={isPending}
								className="focus-visible:ring-primary"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="last-name">Last name</Label>
							<Input
								id="last-name"
								name="last-name"
								placeholder="Robinson"
								required
								disabled={isPending}
								className="focus-visible:ring-primary"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email address</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="m@example.com"
							required
							disabled={isPending}
							className="focus-visible:ring-primary"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							required
							disabled={isPending}
							className="focus-visible:ring-primary"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">
							Confirm Password
						</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							disabled={isPending}
							className="focus-visible:ring-primary"
						/>
					</div>

					<Button
						type="submit"
						className="w-full font-bold shadow-lg shadow-primary/20 py-6 transition-all active:scale-[0.98]"
						disabled={isPending}
					>
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Creating Account...
							</>
						) : (
							<>
								<ShieldCheck className="mr-2 h-5 w-5" />
								Sign Up
							</>
						)}
					</Button>
				</form>

				<div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link
						href="/login"
						className="font-semibold text-primary hover:underline underline-offset-4"
					>
						Sign in
					</Link>
				</div>
			</div>
		</div>
	);
}
