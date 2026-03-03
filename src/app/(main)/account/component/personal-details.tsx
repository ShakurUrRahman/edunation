"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { updateUserInfo } from "@/app/actions/account";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

const PersonalDetails = ({ userInfo }) => {
	const [isPending, setIsPending] = useState(false);
	const [infoState, setInfoState] = useState({
		firstName: userInfo?.firstName || "",
		lastName: userInfo?.lastName || "",
		email: userInfo?.email || "",
		designation: userInfo?.designation || "",
		bio: userInfo?.bio || "",
	});

	const handleChange = (event) => {
		const field = event.target.name;
		const value = event.target.value;

		setInfoState((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleUpdate = async (event) => {
		event.preventDefault();
		setIsPending(true);

		try {
			await updateUserInfo(userInfo?.email, infoState);
			toast.success("User details updated successfully.");
		} catch (error) {
			console.error(error);
			toast.error(`Error: ${error.message}`);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="p-4 sm:p-6 rounded-lg hero shadow-lg bg-card border border-primary/20 transition-all">
			<h5 className="text-xl font-bold mb-6 flex items-center gap-2">
				Personal Details
			</h5>

			<form onSubmit={handleUpdate}>
				{/* Grid: 1 column on mobile, 2 columns on large screens */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
					<div className="space-y-2">
						<Label
							htmlFor="firstName"
							className="text-sm font-medium"
						>
							First Name{" "}
							<span className="text-destructive">*</span>
						</Label>
						<Input
							type="text"
							placeholder="John"
							id="firstName"
							name="firstName"
							value={infoState.firstName}
							onChange={handleChange}
							required
							className="focus-visible:ring-primary"
						/>
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="lastName"
							className="text-sm font-medium"
						>
							Last Name{" "}
							<span className="text-destructive">*</span>
						</Label>
						<Input
							type="text"
							placeholder="Doe"
							id="lastName"
							name="lastName"
							value={infoState.lastName}
							onChange={handleChange}
							required
							className="focus-visible:ring-primary"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email" className="text-sm font-medium">
							Your Email{" "}
							<span className="text-destructive">*</span>
						</Label>
						<Input
							type="email"
							id="email"
							name="email"
							value={infoState.email}
							disabled
							className="bg-muted cursor-not-allowed opacity-70"
						/>
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="occupation"
							className="text-sm font-medium"
						>
							Occupation
						</Label>
						<Input
							name="designation"
							id="occupation"
							value={infoState.designation}
							type="text"
							onChange={handleChange}
							placeholder="Software Engineer"
							className="focus-visible:ring-primary"
						/>
					</div>
				</div>

				<div className="mt-6 space-y-2">
					<Label htmlFor="bio" className="text-sm font-medium">
						Bio
					</Label>
					<Textarea
						id="bio"
						name="bio"
						value={infoState.bio}
						placeholder="Tell us a little bit about yourself..."
						onChange={handleChange}
						className="min-h-[120px] resize-none focus-visible:ring-primary"
					/>
				</div>

				<div className="mt-8">
					<Button
						type="submit"
						disabled={isPending}
						className="w-full sm:w-auto min-w-[140px] font-semibold shadow-md transition-all active:scale-95"
					>
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving...
							</>
						) : (
							<>
								<Save className="mr-2 h-4 w-4" />
								Save Changes
							</>
						)}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default PersonalDetails;
