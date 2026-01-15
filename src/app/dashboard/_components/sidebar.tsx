import { Logo } from "@/components/logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
	return (
		<div className="h-full border-r flex flex-col overflow-y-auto hero shadow-sm">
			<div className="flex justify-center items-center p-5">
				<Logo className="text-2xl size-12" />
			</div>
			<div className="flex flex-col w-full">
				<SidebarRoutes />
			</div>
		</div>
	);
};

export default Sidebar;
