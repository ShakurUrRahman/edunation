import AccountSidebar from "./component/account-sidebar";
import AccountSidebarServer from "./component/accout-sidebar-server";

function Layout({ tabs }) {
	return (
		<section className="relative pb-16 h-screen mb-24">
			{/*end container*/}
			<div className="container relative mt-10">
				<div className="lg:flex">
					<AccountSidebarServer />
					<div className="lg:w-3/4 md:px-3 mt-7.5 lg:mt-0">
						{tabs}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Layout;
