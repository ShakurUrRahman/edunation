import { User } from "@/model/user-model";
import { replaceMongoIdInObject } from "@/lib/convertData";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email) {
	const user = await User.findOne({ email: email })
		.select("-password")
		.lean();
	return replaceMongoIdInObject(user);
}

export async function getUserDetailsById(userId) {
	try {
		const user = await User.findById(userId).select("-password").lean();
		return user;
	} catch (error) {
		throw new Error(error);
	}
}

export async function validatePassword(email, password) {
	const user = await getUserByEmail(email);
	const isMatch = await bcrypt.compare(password, user.password);
	return isMatch;
}
