import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const colors = ["#0A8754", "#6E71C4", "#FDE74C", "#EA484E"];

const Ribbon = () => (
	<motion.div
		className="w-full h-2 rounded-t-md absolute top-0 left-0"
		style={{ backgroundColor: `${colors[Math.floor(Math.random() * 4) + 1]}` }}
	></motion.div>
);

const Card = ({ title, paragraph }: { title: string; paragraph: string }) => {
	return (
		<Link href="/folder/courses">
			<div className="bg-[#17191D] w-full h-[200px] rounded-md relative z-0">
				<Ribbon />
				<main className="relative z-1 w-full h-full p-6">
					<h2 className="font-sans font-medium text-[20px] mb-2">{title}</h2>
					<p className="font-sans text-[14px] opacity-70 leading-6">
						{paragraph}
					</p>
				</main>
			</div>
		</Link>
	);
};

export default Card;
