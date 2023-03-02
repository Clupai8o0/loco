import { useRouter } from "next/router";

import { Title, Card, DirectoryNav, Head } from "../../components";
import { RenderTypes, FileDetails } from "../../types";

function FolderDirectory({
	files,
	path,
	title,
}: {
	files: FileDetails[];
	path: string;
	title: string;
}) {
	const router = useRouter();

	return (
		<>
			<Head />
			<main className="main">
				<DirectoryNav router={router} path={path} value={RenderTypes.Course} />
				<Title text={title} />

				{files.map(({ title, hash }) => (
					<Card title={title} hash={hash} />
				))}
			</main>
		</>
	);
}

export default FolderDirectory;

//* Api
import { GetServerSideProps } from "next";

import {
	jsonFetchDefinition,
	hashDecrypter,
	extractTitle,
	redirector,
} from "../../utils/api";
import { filesFetcher } from "../../utils/pageProps";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	if (ctx.query.hash) {
		//@ts-ignore
		const path = await hashDecrypter(ctx.query.hash);
		const title = extractTitle(path);

		// Setting up the config file
		await fetch(
			"http://localhost:3000/api/init-folder-config",
			jsonFetchDefinition({ path })
		);

		// Redirecting if folder type is course
		if (await redirector(path, RenderTypes.Course)) {
			return {
				redirect: {
					permanent: false,
					destination: `/course/${ctx.query.hash}`,
				},
				props: {},
			};
		}

		return {
			props: {
				files: await filesFetcher(path),
				title,
				path,
			},
		};
	} else {
		throw Error("Hash not provided with folder path");
	}
};
