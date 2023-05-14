import NextHead from "next/head";

const Head = ({ title }: { title?: string }) => {
	return (
		<NextHead>
			<title>loco: {title}</title>
			<meta
				name="description"
				content="A simple app that locates a course folder and renders it as a course"
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/folder.png" />
		</NextHead>
	);
};

export default Head;
