import React from "react";

const Title = ({ text, margin }: { text: string; margin?: string }) => {
	return (
		<h1
			className={`font-sans font-semibold text-[34px] text-white ${
				margin ? margin : "mb-12"
			}`}
		>
			{text}
		</h1>
	);
};

export default Title;
