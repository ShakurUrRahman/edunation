import Test from "@/components/Test";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
			<p>Shakur</p>
			<Button>Click</Button>
			<Test />
		</div>
	);
}
