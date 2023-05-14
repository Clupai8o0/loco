import React from "react";

const IconButton = ({
	icon,
	text,
	iconOnly,
	handler,
}: {
	icon?: string;
	text?: string;
	iconOnly?: boolean;
	handler: () => void;
}) => {
	return (
		<button
			className={`flex items-center justify-center gap-2 text-soft-blue bg-[rgba(208,188,255,0.08)] rounded-full font-sans text-sm md:text-base cursor-pointer hover:opacity-80 transition-opacity ease-in-out duration-150 ${
				iconOnly
					? "p-4 md:p-5"
					: "pb-3 pt-3 pr-5 pl-4 md:pb-4 md:pt-4 md:pr-8 md:pl-6"
			}`}
			onClick={handler}
		>
			<img
				src={icon}
				alt="button icon"
				className="max-w-[16px] max-h-[16px] md:max-w-[20px] md:max-h-[20px]"
			/>{" "}
			{iconOnly ? "" : text}
		</button>
	);
};

export default IconButton;
