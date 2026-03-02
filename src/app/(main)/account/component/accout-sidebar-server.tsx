import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";
import AccountSidebar from "./account-sidebar";

const AccountSidebarServer = async () => {
	const session = await auth();
	if (!session?.user) redirect("/login");

	const loggedInUser = await getUserByEmail(session.user.email);

	return (
		<AccountSidebar
			user={{
				email: loggedInUser.email,
				firstName: loggedInUser.firstName,
				lastName: loggedInUser.lastName,
				profilePicture: loggedInUser.profilePicture ?? null,
			}}
		/>
	);
};

export default AccountSidebarServer;
