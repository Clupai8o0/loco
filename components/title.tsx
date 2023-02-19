import React from "react";

const Title = ({ text }: { text: string }) => {
	return (
		<h1 className="font-sans font-semibold text-[34px] text-white mb-12">{text}</h1>
	);
};

export default Title;
