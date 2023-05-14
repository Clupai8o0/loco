import { jsonFetchDefinition } from "@/utils/api";
import { NextRouter } from "next/router";

const Card = ({
	title,
	path,
	router,
}: {
	title: string;
	path: string;
	router: NextRouter;
}) => {
	return (
		<button
			onClick={async () => {
				const resp = await fetch("/api/encrypt", jsonFetchDefinition({ path }));
				const hashedPath = (await resp.json()).data;

				router.push(`/folder/${hashedPath}`);
			}}
			className="w-full shadow-lg bg-component rounded-md relative z-0 border-2 border-gray-800 text-left"
		>
			<main className="relative z-1 w-full h-full p-6">
				<h2 className="font-sans font-medium text-xl capitalize truncate">
					{title}
				</h2>
			</main>
		</button>
	);
};

export default Card;
