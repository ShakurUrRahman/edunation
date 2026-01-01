"use server";

import { signIn } from "@/auth";

export async function credentialLogin(formData: FormData) {
	try {
		const result = await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			redirect: false,
		});

		// ⛔️ Auth.js may return undefined on failure
		if (!result || result.error) {
			return {
				error: "Invalid email or password",
			};
		}

		return { success: true };
	} catch {
		return {
			error: "Invalid email or password",
		};
	}
}

export async function doSocialLogin(formData) {
	const action = formData.get("action");
	await signIn(action, { redirectTo: "/courses" });
}
