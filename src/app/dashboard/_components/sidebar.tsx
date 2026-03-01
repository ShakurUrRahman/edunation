import { Logo } from "@/components/logo";
import { SidebarRoutes } from "./sidebar-routes";
import Link from "next/link";

const Sidebar = () => {
	return (
		<div className="h-full border-r flex flex-col overflow-y-auto hero shadow-sm">
			<div className="flex justify-center items-center p-5">
				<Link href="/">
					<img src="/logo.png" alt="logo" />
				</Link>
			</div>
			<div className="flex flex-col w-full">
				<SidebarRoutes />
			</div>
		</div>
	);
};

export default Sidebar;
