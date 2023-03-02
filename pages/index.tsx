import { Head, Title, Card } from "../components";
import { FileDetails } from "@/types"; 

export default function Home({ folders }: { folders: FileDetails[] }) {
	return (
		<>
			<Head />
			<main className="main">
				<Title text="Home" />

				{folders.map(({ hash, title }, i) => (
					<Card title={title} hash={hash || ""} key={i} />
				))}
			</main>
		</>
	);
}

//* Api
import { GetServerSideProps } from "next";
import nodePath from 'path'

import { filesFetcher } from "../utils/pageProps";

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {
			folders: await filesFetcher(nodePath.join(__dirname, "../../../public/videos")),
		},
	};
};
