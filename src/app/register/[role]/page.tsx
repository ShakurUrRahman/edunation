import { SignupForm } from "../_components/signup-form";

type PageProps = {
	params: Promise<{ role: string }>;
};

const RegisterPage = async ({ params }: PageProps) => {
	const { role } = await params;

	return (
		<div className="w-full flex-col h-screen flex items-center justify-center hero">
			<div className="container">
				<SignupForm role={role} />
			</div>
		</div>
	);
};
export default RegisterPage;
