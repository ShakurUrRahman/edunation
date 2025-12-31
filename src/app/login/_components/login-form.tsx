"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { credentialLogin } from "@/app/actions";

export function LoginForm() {
	const [error, setError] = useState("");
	const router = useRouter();

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");

		const formData = new FormData(event.currentTarget);
		const response = await credentialLogin(formData);

		if (response?.error) {
			setError(response.error); // ✅ email/password error shown here
			return;
		}

		router.push("/courses");
	}

	return (
		<Card className="mx-auto max-w-sm w-full">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>

			<CardContent>
				{/* ✅ ERROR MESSAGE */}
				{error && (
					<div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
						{error}
					</div>
				)}

				<form onSubmit={onSubmit}>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="*********"
								required
							/>
						</div>

						<Button type="submit" className="w-full">
							Login
						</Button>
					</div>
				</form>

				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<p>
						Register as{" "}
						<Link href="/register/instructor" className="underline">
							Instructor
						</Link>{" "}
						or{" "}
						<Link href="/register/student" className="underline">
							Student
						</Link>
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
