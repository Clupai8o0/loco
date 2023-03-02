import React from "react";
import Link from "next/link";

const colors = ["#0A8754", "#6E71C4", "#FDE74C", "#EA484E"];

const Card = ({
	title,
	hash,
}: {
	title: string;
	hash: string | string[] | undefined;
}) => {
	return (
		<Link href={`/folder/${hash}`}>
			<div className="bg-[#17191D] w-full rounded-md relative z-0 mb-6">
				<div
					className="w-full h-2 rounded-t-md absolute top-0 left-0"
					style={{
						backgroundColor: `${colors[Math.floor(Math.random() * 4)]}`,
					}}
				></div>
				<main className="relative z-1 w-full h-full p-6">
					<h2 className="font-sans font-medium text-[20px] mb-2 capitalize">
						{title}
					</h2>
				</main>
			</div>
		</Link>
	);
};

export default Card;
