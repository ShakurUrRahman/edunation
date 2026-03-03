"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, KeyRound, ShieldCheck } from "lucide-react";
import { changePassword } from "@/app/actions/account";

const ChangePassword = ({ email }) => {
	const [isPending, setIsPending] = useState(false);
	const [passwordState, setPasswordState] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	function handleChange(event) {
		const key = event.target.name;
		const value = event.target.value;
		setPasswordState({ ...passwordState, [key]: value });
	}

	async function doPasswordChange(event) {
		event.preventDefault();

		// Basic validation
		if (passwordState.newPassword !== passwordState.confirmPassword) {
			return toast.error("New passwords do not match!");
		}

		if (passwordState.newPassword.length < 6) {
			return toast.error("Password must be at least 6 characters long.");
		}

		setIsPending(true);
		try {
			await changePassword(
				email,
				passwordState?.oldPassword,
				passwordState?.newPassword,
			);

			toast.success(`Password changed successfully.`);
			// Reset form
			setPasswordState({
				oldPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		} catch (err) {
			console.error(err);
			toast.error(`Error: ${err.message}`);
		} finally {
			setIsPending(false);
		}
	}

	return (
		<div className="p-4 sm:p-6 rounded-lg hero shadow-lg border border-primary/20 transition-all mt-6">
			<h5 className="text-xl font-bold mb-6 flex items-center gap-2">
				<KeyRound className="w-5 h-5 text-primary" />
				Change Password
			</h5>

			<form onSubmit={doPasswordChange}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
					<div className="space-y-2 md:col-span-2">
						<Label htmlFor="oldPassword">Old Password</Label>
						<Input
							type="password"
							placeholder="Enter old password"
							id="oldPassword"
							name="oldPassword"
							value={passwordState.oldPassword}
							onChange={handleChange}
							required
							className="focus-visible:ring-primary"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="newPassword">New Password</Label>
						<Input
							type="password"
							placeholder="New password"
							id="newPassword"
							name="newPassword"
							value={passwordState.newPassword}
							onChange={handleChange}
							required
							className="focus-visible:ring-primary"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">
							Confirm New Password
						</Label>
						<Input
							type="password"
							placeholder="Re-type new password"
							id="confirmPassword"
							name="confirmPassword"
							value={passwordState.confirmPassword}
							onChange={handleChange}
							required
							className="focus-visible:ring-primary"
						/>
					</div>
				</div>

				<div className="mt-8">
					<Button
						type="submit"
						disabled={isPending}
						className="w-full sm:w-auto min-w-[160px] font-semibold shadow-md transition-all active:scale-95"
					>
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Updating...
							</>
						) : (
							<>
								<ShieldCheck className="mr-2 h-4 w-4" />
								Save Password
							</>
						)}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;
