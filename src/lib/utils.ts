import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const getInitials = (firstName?: string, lastName?: string) => {
	if (!firstName && !lastName) return "U";
	return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
};

export const getAvatarGradient = (email?: string) => {
	const avatarColors = [
		"from-indigo-500 to-purple-600",
		"from-emerald-500 to-teal-600",
		"from-orange-500 to-pink-600",
		"from-sky-500 to-blue-600",
	];

	if (!email) return avatarColors[0];
	const index = email.charCodeAt(0) % avatarColors.length;
	return avatarColors[index];
};
