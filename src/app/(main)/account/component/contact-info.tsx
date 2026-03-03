"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Globe, Save } from "lucide-react"; // Consistent icons

const ContactInfo = () => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle logic here
	};

	return (
		<div className="p-4 sm:p-6 rounded-lg hero shadow-lg border border-primary/20 transition-all mt-6">
			<h5 className="text-xl font-bold mb-6 flex items-center gap-2">
				Contact Info
			</h5>

			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
					<div className="space-y-2">
						<Label
							htmlFor="number"
							className="text-sm font-medium flex items-center gap-2"
						>
							<Phone className="w-3.5 h-3.5 text-muted-foreground" />
							Phone No.
						</Label>
						<Input
							name="number"
							id="number"
							type="tel" // 'tel' is better for mobile keyboards than 'number'
							placeholder="+1 234 567 890"
							className="focus-visible:ring-primary"
						/>
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="url"
							className="text-sm font-medium flex items-center gap-2"
						>
							<Globe className="w-3.5 h-3.5 text-muted-foreground" />
							Website
						</Label>
						<Input
							name="url"
							id="url"
							type="url"
							placeholder="https://example.com"
							className="focus-visible:ring-primary"
						/>
					</div>
				</div>

				<div className="mt-8">
					<Button
						type="submit"
						className="w-full sm:w-auto min-w-[140px] font-semibold shadow-md transition-all active:scale-95"
					>
						<Save className="mr-2 h-4 w-4" />
						Save Contact
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ContactInfo;
