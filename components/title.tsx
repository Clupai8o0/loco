const Title = ({ text, margin }: { text: string; margin?: string }) => {
	return (
		<h1
			className={`font-sans font-semibold text-4xl xl:text-5xl text-white leading-10 capitalize ${
				margin ? margin : "mb-8 xl:mb-14"
			}`}
		>
			{text}
		</h1>
	);
};

export default Title;
