"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { credentialLogin } from "@/app/actions";
import { Loader2, ArrowLeft, LockKeyhole, Mail } from "lucide-react";

export function LoginForm() {
	const [error, setError] = useState("");
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		setIsPending(true);

		const formData = new FormData(event.currentTarget);

		try {
			const response = await credentialLogin(formData);

			if (response?.error) {
				setError(response.error);
				setIsPending(false);
				return;
			}

			router.push("/courses");
		} catch (e) {
			setError("An unexpected error occurred.");
			setIsPending(false);
		}
	}

	return (
		<div className="w-full max-w-md mx-auto p-4">
			{/* Back Button */}
			<Button
				variant="ghost"
				asChild
				className="mb-6 group text-muted-foreground hover:text-primary transition-colors"
			>
				<Link href="/">
					<ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
					Back to Home
				</Link>
			</Button>

			<div className="p-6 sm:p-8 rounded-2xl shadow-xl bg-card border border-primary/20 hero relative overflow-hidden">
				{/* Top Accent Line */}
				<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight">Login</h1>
					<p className="text-sm text-muted-foreground mt-2">
						Enter your credentials to access your account
					</p>
				</div>

				{error && (
					<div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive flex items-center gap-2">
						<span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
						{error}
					</div>
				)}

				<form onSubmit={onSubmit} className="space-y-5">
					<div className="space-y-2">
						<Label
							htmlFor="email"
							className="flex items-center gap-2"
						>
							<Mail className="w-4 h-4 text-primary/70" />
							Email
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="name@example.com"
							required
							className="focus-visible:ring-primary h-11"
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label
								htmlFor="password"
								className="flex items-center gap-2"
							>
								<LockKeyhole className="w-4 h-4 text-primary/70" />
								Password
							</Label>
							<Link
								href="#"
								className="text-xs text-primary hover:underline font-medium"
							>
								Forgot password?
							</Link>
						</div>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="••••••••"
							required
							className="focus-visible:ring-primary h-11"
						/>
					</div>

					<Button
						type="submit"
						disabled={isPending}
						className="w-full h-11 font-bold shadow-lg transition-all active:scale-95"
					>
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Signing in...
							</>
						) : (
							"Login"
						)}
					</Button>
				</form>

				<div className="mt-8 pt-6 border-t border-primary/10 text-center text-sm">
					<span className="text-muted-foreground">
						Don't have an account?
					</span>
					<div className="mt-2 flex items-center justify-center gap-2 font-semibold">
						<Link
							href="/register/instructor"
							className="text-primary hover:underline"
						>
							Instructor
						</Link>
						<span className="text-muted-foreground/30">•</span>
						<Link
							href="/register/student"
							className="text-primary hover:underline"
						>
							Student
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
