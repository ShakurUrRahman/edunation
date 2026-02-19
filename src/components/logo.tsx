import Image from "next/image";
import logo from "@/../public/assets/logo.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";
export const Logo = ({ className = "" }) => {
	return (
		<Link
			className={cn(
				"flex justify-center items-center gap-1.5",
				className,
			)}
			href="/"
		>
			{/* <Image src={logo} alt="logo" /> */}
			<p className="font-semibold text-primary mb-2">
				Edu<span className="font-light">Nation</span>
			</p>
		</Link>
	);
};
