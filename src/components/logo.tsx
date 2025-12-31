import Image from "next/image";
import logo from "@/../public/assets/logo.svg";
import { cn } from "@/lib/utils";
export const Logo = ({ className = "" }) => {
	return (
		<Image className={cn("max-w-25", className)} src={logo} alt="logo" />
	);
};
