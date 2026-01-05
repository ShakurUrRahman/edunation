import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import PersonalDetails from "../component/personal-details";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import ContactInfo from "../component/contact-info";
import ChangePassword from "../component/change-password";

async function Profile() {
	const session = await auth();
	const loggedInUser = await getUserByEmail(session?.user?.email);

	return (
		<>
			<PersonalDetails userInfo={loggedInUser} />
			<div className="p-6 rounded-md shadow  bg-white  mt-[30px] hero border border-primary/40">
				<div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
					<ContactInfo />
					<ChangePassword email={loggedInUser?.email} />
				</div>
				{/*end row*/}
			</div>
		</>
	);
}

export default Profile;
