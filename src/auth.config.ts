export const authConfig = {
	secret: process.env.AUTH_SECRET,
	trustHost: true,
	session: {
		strategy: "jwt",
	},
	providers: [],
};
