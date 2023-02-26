import React, { useState } from "react";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

import Button from "../../components/button";
import Title from "../../components/title";

import { BtnType } from "../../types";

import { Tab, Tabs } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useRouter } from "next/router";

enum TabValue {
	Content = "Content",
	About = "About",
}


// So there should be ls
// if it is a folder, create a accordion component that ls inside that folder
// inside each of those, there is a video component that sets the state of the video

function CourseDirectory({ path }: { path: string }) {
	const router = useRouter();
	const [tab, setTab] = useState(TabValue.Content);

	const handleBack = () => {
		router.back();
	};

	const handleToggleFolderType = () => {
		// fetch("/api/set-config", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify({
		// 		path,
		// 		value: "folder",
		// 	}),
		// });
	};

	const handleTabChange = () => {
		if (tab === TabValue.Content) setTab(TabValue.About);
		else setTab(TabValue.Content);
	};

	return (
		<main className="main">
			<div className="flex justify-between">
				<Button type={BtnType.Back} handler={handleBack} />
				<Button type={BtnType.Edit} handler={handleToggleFolderType} />
			</div>
			<video width="320" height="240" controls>
				<source
					src="../../../../Downloads/core-01-intro.mp4"
					type="video/mp4"
				/>
			</video>
			{/* <ReactPlayer
				url="F:\\Courses\\courses-app\\public\\videos\\Developer\\Web Developer\\Deno - The Complete Introduction\\3.Understanding Core APIs\\core-01-intro.mp4"
				playing
				controls
				width="100%"
				height="50%"
			/> */}

			<Tabs
				value={tab}
				onChange={handleTabChange}
				textColor="primary"
				indicatorColor="primary"
				className="w-full"
			>
				<Tab
					value={TabValue.Content}
					label={TabValue.Content}
					className="text-gray-400 font-sans capitalize w-1/2"
				/>
				<Tab
					value={TabValue.About}
					label={TabValue.About}
					className="text-gray-400 font-sans capitalize w-1/2"
				/>
			</Tabs>

			{tab === TabValue.Content ? (
				<div>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon color="primary" />}
							aria-controls="panel1a-content"
							id="panel1a-header"
							className="bg-[rgba(21,23,26,1)] w-full font-sans text-[14px] text-white"
						>
							<p className="opacity-80">Accordion 1</p>
						</AccordionSummary>
						<AccordionDetails className="bg-[rgba(19,20,21,1)] w-full font-sans text-white text-[14px]">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget.
							</p>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon color="primary" />}
							aria-controls="panel2a-content"
							className="bg-[rgba(21,23,26,1)] w-full font-sans text-[14px] text-white"
						>
							<p className="opacity-80">Accordion 2</p>
						</AccordionSummary>
						<AccordionDetails className="bg-[rgba(19,20,21,1)] w-full font-sans text-white text-[14px]">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget.
							</p>
						</AccordionDetails>
					</Accordion>
				</div>
			) : (
				<article>
					<Title text="Folder Title" margin="mb-2 mt-6" />
					<p className="font-sans text-[14px] text-white opacity-60 leading-5">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit.
						Cupiditate, quis. Quae harum aliquam saepe adipisci possimus neque
						voluptatem quos, at rem! Earum suscipit libero optio blanditiis ab
						veniam repudiandae aliquam.
					</p>
				</article>
			)}
		</main>
	);
}

export default CourseDirectory;
