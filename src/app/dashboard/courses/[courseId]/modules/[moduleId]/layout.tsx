export default function ModuleLayout({
	children,
	lessonModal,
	params,
}: {
	children: React.ReactNode;
	lessonModal: React.ReactNode;
	params: { moduleId: string };
}) {
	return (
		<>
			{children}
			{lessonModal}
		</>
	);
}
