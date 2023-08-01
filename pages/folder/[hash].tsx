import { useRouter } from "next/router";

import { RenderTypes, FileDetails } from "@/types";
import { Card, Head, Title, Nav } from "@/components";
import { generate } from "@/utils/helpers";

function Folder({
	path,
	title,
	files,
}: {
	path: string;
	title: string;
	files: FileDetails[];
}) {
	const router = useRouter();

	return (
		<div style={{ width: "100vw" }} className="parent-main">
			<Head />
			<main className="main">
				<Nav router={router} path={path} value={RenderTypes.Course} />
				<Title text={title} />
				<div className="card-layout">
					{files.map((file) => (
						<Card
							title={file.title}
							path={file.path}
							router={router}
							key={generate()}
						/>
					))}
				</div>
			</main>
		</div>
	);
}

export default Folder;

import { GetServerSideProps } from "next";
import {
	extractTitle,
	hashDecrypter,
	jsonFetchDefinition,
	redirector,
} from "@/utils/api";
import { filesFetcher } from "@/utils/pageProps";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { hash } = ctx.query;
	if (hash) {
		const path = await hashDecrypter(hash);
		const title = extractTitle(path);

		// Setting up config file
		await fetch(
			"http://localhost:3001/api/init-folder-config",
			jsonFetchDefinition({ path })
		);

		// Redirecting if folder type is course
		if (await redirector(path, RenderTypes.Course)) {
			return {
				redirect: {
					permanent: false,
					destination: `/course/${hash}`,
				},
				props: {},
			};
		}

		return {
			props: { path, title, files: await filesFetcher(path) },
		};
	} else {
		throw Error("Hash not provided as query");
	}
};
