import { Head, Title, Card } from "@/components";
import { FileDetails } from "@/types";
import { generate } from "@/utils/helpers";

import { useRouter } from "next/router";

function Home({ folders }: { folders: FileDetails[] }) {
	const router = useRouter();

	return (
		<div style={{ width: "100vw" }} className="parent-main">
			<Head />
			<main className="main">
				<Title text="home" />
				<div className="card-layout">
					{folders.map((folder) => (
						<Card title={folder.title} key={generate()} path={folder.path} router={router} />
					))}
				</div>
			</main>
		</div>
	);
}

export default Home;

import { GetServerSideProps } from "next";
import nodePath from "path";

import { filesFetcher } from "@/utils/pageProps";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {
			folders: await filesFetcher(
				nodePath.join(__dirname, "../../../public/videos")
			),
		},
	};
};
