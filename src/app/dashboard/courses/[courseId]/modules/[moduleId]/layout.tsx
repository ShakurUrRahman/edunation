export default function ModuleLayout({
	children,
	params,
}: {
	children: React.ReactNode;

	params: { moduleId: string };
}) {
	return <>{children}</>;
}
