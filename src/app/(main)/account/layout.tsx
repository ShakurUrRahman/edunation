import AccountSidebarServer from "./component/accout-sidebar-server";

function Layout({ tabs }) {
	return (
		/* Removed h-screen to allow content to dictate height; added responsive padding */
		<section className="relative pt-6 pb-16 min-h-screen mb-12 lg:mb-24">
			<div className="container mx-auto px-4 relative">
				{/* lg:flex: Side-by-side on desktop
                flex-col: Stacked on mobile
            */}
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-4">
					{/* Sidebar Container */}
					<AccountSidebarServer />

					{/* Main Content Area:
                  w-full: takes full width on mobile
                  lg:w-3/4: takes 75% on desktop
               */}
					<div className="w-full lg:w-3/4 md:px-3">
						<div className="flex flex-col gap-6">{tabs}</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Layout;
