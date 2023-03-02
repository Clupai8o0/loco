import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { Title, DirectoryNav, Head, Button, Accordion } from "../../components";
import { RenderTypes, FileDetails, FileTypes } from "../../types";

import { Tab, Tabs } from "@mui/material";

enum TabValue {
	Content = "Content",
	About = "About",
}

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

function CourseDirectory({
	path,
	title,
	files,
	videos,
	state,
}: {
	path: string;
	title: string;
	files: FileDetails[];
	videos: FileDetails[];
	state: {
		id: number;
		path: string;
		playedSeconds: number;
		title: string;
	} | null;
}) {
	const router = useRouter();
	const [tab, setTab] = useState(TabValue.Content);
	const [video, setVideo] = useState({
		path: "",
		title: "",
		id: 0,
	});
	const [playedSeconds, setPlayedSeconds] = useState(0);
	let initialPlayedSeconds = state.playedSeconds;

	useEffect(() => {
		if (state) {
			setVideo({
				id: state.id,
				path: state.path,
				title: state.title,
			});
		} else {
			setVideoState(videos[0].title);
		}
	}, []);

	const setCourseState = async () => {
		await fetch(
			"/api/set-course-state",
			jsonFetchDefinition({
				id: video.id,
				videoPath: video.path,
				title: video.title,
				playedSeconds,
				path,
			})
		);
	};

	useEffect(() => {
		setCourseState();
	}, [playedSeconds]);

	const setVideoState = (title: string) => {
		for (let i = 0; i < videos.length; i++) {
			if (videos[i].title === title) {
				const arr = videos[i].path.split("\\");
				setVideo({
					title: `${arr[arr.length - 2]} > ${videos[i].title}`,
					path: `\\${arr.splice(3).join("\\")}`,
					id: videos[i].id,
				});
			}
		}
	};

	const handleTabChange = () => {
		if (tab === TabValue.Content) setTab(TabValue.About);
		else setTab(TabValue.Content);
	};

	return (
		<>
			<Head />
			<main className="main">
				<DirectoryNav router={router} path={path} value={RenderTypes.Folders} />

				<ReactPlayer
					url={video.path}
					playing
					controls
					width="100%"
					height="50%"
					progressInterval={5000}
					onProgress={(progress) => {
						setPlayedSeconds(progress.playedSeconds);
					}}
				/>

				<p className="font-sans text-white capitalize mt-4">
					{video.title}{" "}
					<span className="font-bold">
						{new Date(initialPlayedSeconds * 1000).toISOString().slice(11, 19)} : {Math.round(playedSeconds)}
					</span>
				</p>

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
					<Accordion
						title="Course"
						content={files.map((file: FileDetails, i) => {
							if (file.type === FileTypes.Folder) {
								return (
									<Accordion
										key={i}
										title={file.title}
										content={file.content?.map(
											(contentFile: FileDetails, i) => {
												return (
													<Button
														key={i}
														title={contentFile.title}
														type={contentFile.type}
														handler={setVideoState}
													/>
												);
											}
										)}
									/>
								);
							} else {
								return (
									<Button
										key={i}
										title={file.title}
										type={file.type}
										handler={setVideoState}
									/>
								);
							}
						})}
					/>
				) : (
					<article>
						<Title text={title} margin="mb-2 mt-6" />
						<p className="font-sans text-[14px] text-white opacity-60 leading-5">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Cupiditate, quis. Quae harum aliquam saepe adipisci possimus neque
							voluptatem quos, at rem! Earum suscipit libero optio blanditiis ab
							veniam repudiandae aliquam.
						</p>
					</article>
				)}
			</main>
		</>
	);
}

export default CourseDirectory;

import { GetServerSideProps } from "next";

import {
	hashDecrypter,
	extractTitle,
	jsonFetchDefinition,
} from "../../utils/api";
import { courseFilesFetcher, videosLister } from "../../utils/pageProps";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	if (ctx.query.hash) {
		//@ts-ignore
		const path = await hashDecrypter(ctx.query.hash);
		const title = extractTitle(path);

		// The config already exists, since we're here
		const files = await courseFilesFetcher(path);
		const videos = videosLister(files);

		const respState = await fetch(
			"http://localhost:3000/api/get-course-state",
			jsonFetchDefinition({ path })
		);
		const state = (await respState.json()).data;

		return {
			props: { title, path, files, videos, state },
		};
	} else {
		throw Error("No path hash provided");
	}
};
