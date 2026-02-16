import Image from "next/image";
import Link from "next/link";
import Menu from "./account-menu";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";
import { Input } from "@/components/ui/input";
import { getAvatarGradient, getInitials } from "@/lib/utils";

const AccountSidebar = async () => {
	const session = await auth();
	if (!session?.user) {
		redirect("/login");
	}

	const loggedInUser = await getUserByEmail(session?.user?.email);

	return (
		<div className="lg:w-1/4 md:px-3">
			<div className="relative">
				<div className="p-6 rounded-lg shadow hero border border-primary/40">
					<div className="profile-pic text-center mb-5">
						<Input
							id="pro-img"
							name="profile-image"
							type="file"
							className="hidden"
							// onchange=""
						/>
						<div>
							{loggedInUser?.profilePicture ? (
								<div className="relative size-28 mx-auto">
									<Image
										src={loggedInUser?.profilePicture}
										className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
										id="profile-banner"
										alt={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
										width={112}
										height={112}
									/>
									<label
										className="absolute inset-0 cursor-pointer"
										htmlFor="pro-img"
									/>
								</div>
							) : (
								<div className="relative mx-auto w-fit">
									<div
										className={`size-28 rounded-full flex items-center justify-center
										bg-linear-to-br ${getAvatarGradient(loggedInUser?.email)}
										text-white text-3xl font-semibold shadow ring-4 ring-slate-50 dark:ring-slate-800`}
									>
										{getInitials(
											loggedInUser?.firstName,
											loggedInUser?.lastName,
										)}
									</div>
									<label
										htmlFor="pro-img"
										className="absolute inset-0 cursor-pointer"
									/>
								</div>
							)}
							<div className="mt-4">
								<h5 className="text-lg font-semibold">{`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}</h5>
								<p className="text-slate-400">
									{loggedInUser?.email}
								</p>
							</div>
						</div>
					</div>
					<div className="border-t border-gray-100 dark:border-gray-700">
						<Menu />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSidebar;
