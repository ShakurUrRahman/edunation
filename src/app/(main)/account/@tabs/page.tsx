import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import PersonalDetails from "../component/personal-details";
import ContactInfo from "../component/contact-info";
import ChangePassword from "../component/change-password";

async function Profile() {
	const session = await auth();
	const loggedInUser = await getUserByEmail(session?.user?.email);

	const isInstructor = loggedInUser.role === "instructor";

	return (
		<div className="flex flex-col gap-6 sm:gap-8">
			{/* Primary Section: Full Width */}
			<section>
				<PersonalDetails
					userInfo={loggedInUser}
					isInstructor={isInstructor}
				/>
			</section>

			{/* Secondary Sections: Side-by-side on large screens, stacked on mobile */}
			<div className="space-y-6 lg:space-y-0">
				{/* Using a grid here to align Contact and Password info. 
				   items-start ensures that if one box is taller, 
				   the other doesn't stretch unnaturally.
				*/}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
					<div className="h-full">
						<ContactInfo />
					</div>
					<div className="h-full">
						<ChangePassword email={loggedInUser?.email} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
