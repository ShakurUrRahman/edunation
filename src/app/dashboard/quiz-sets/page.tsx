import { auth } from "@/auth";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getAllQuizSets, getQuizSetsByInstructorId } from "@/queries/quizzes";
import { getLoggedInUser } from "@/lib/loggedIn-user";

const QuizSets = async () => {
	const session = await auth();
	const loggedInUser = await getLoggedInUser(session?.user?.id);

	// console.log(loggedInUser);

	const quizSets = await getQuizSetsByInstructorId(loggedInUser?.id);

	console.log(quizSets);

	const mappedQuizSets = quizSets.map((q) => {
		return {
			id: q.id,
			title: q.title,
			isPublished: q.active,
			totalQuiz: q.quizIds.length,
		};
	});

	return (
		<div className="p-6">
			<DataTable columns={columns} data={mappedQuizSets} />
		</div>
	);
};

export default QuizSets;
