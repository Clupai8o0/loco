import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { Head, Nav, Tabs, CourseDetails, Content } from "@/components";
import { FileDetails, FileTypes, RenderTypes, TabTypes } from "@/types";

import { Accordion } from "react-accessible-accordion";

function Course({
	title,
	path,
	files,
	videos,
	state,
}: {
	title: string;
	path: string;
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
	const videoRef = useRef(null);

	const [tab, setTab] = useState(TabTypes.Content);
	const [content, setContent] = useState(FileTypes.Video);

	const [video, setVideo] = useState({ path: "", title: "", id: 0 });
	const [videoIndex, setVideoIndex] = useState(0);
	const [playedSeconds, setPlayedSeconds] = useState(0);
	const initialPlayedSeconds = state ? state.playedSeconds : 0;

	const [imgSrc, setImgSrc] = useState("");

	// Initializing
	useEffect(() => {
		if (state) {
			if (state.title) {
				setVideo({
					id: state.id,
					path: state.path,
					title: state.title,
				});
				setVideoIndex(state.id);
			} else {
				setVideoState(videos[videoIndex].path);
			}
		} else {
			setVideoState(videos[videoIndex].path);
		}
	}, []);

	// handling the video
	useEffect(() => {
		let interval: any = null;
		if (videoRef.current) {
			// setting the initial current video time (state)
			//@ts-ignore
			videoRef.current.currentTime = initialPlayedSeconds;

			// Updating the video time
			interval = setInterval(() => {
				//@ts-ignore
				setPlayedSeconds(videoRef.current.currentTime);
			}, 5000);
		}

		return () => {
			clearInterval(interval);
		};
		//@ts-ignore
	}, [videoRef]);

	// Setting the video state using the title as a key
	const setVideoState = (path: string) => {
		for (let i = 0; i < videos.length; i++) {
			if (videos[i].path === path) {
				const arr = videos[i].path.split("\\");
				setVideo({
					title: `${arr[arr.length - 2]} > ${videos[i].title}`,
					path: `\\${arr.splice(3).join("\\")}`,
					id: videos[i].id,
				});
				setVideoIndex(i);
			}
		}
	};

	// updating the course state
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

	// every time the played seconds is updated, we reset the course state
	useEffect(() => {
		setCourseState();
	}, [playedSeconds]);

	const toggleTab = () => {
		if (tab === TabTypes.Content) setTab(TabTypes.About);
		else setTab(TabTypes.Content);
	};

	return (
		<div style={{ width: "100vw" }} className="parent-main">
			<Head  />
			<main className="main">
				<Nav router={router} path={path} value={RenderTypes.Folders} />

				<div className="md:flex">
					<div className="w-full flex flex-col md:w-2/3 h-full">
						<video
							className={`w-full h-auto max-w-full rounded-lg dark:border-gray-700 ${
								content === FileTypes.Video ? "block" : "hidden"
							}`}
							controls
							src={video.path}
							ref={videoRef}
							// autoplay
							onEnded={() => {
								const i = videoIndex;
								setVideoState(videos[i + 1].path);
								setVideoIndex(i + 1);
							}}
						/>

						<img
							src={imgSrc}
							alt="course file"
							className={`${content === FileTypes.Image ? "block" : "hidden"}`}
						/>

						<h3 className="font-sans text-white capitalize mt-4 mb-6 text-sm md:text-base">
							{video.title}
						</h3>

						<CourseDetails  styles={`hidden md:block`} />
					</div>

					<Tabs toggleTab={toggleTab} tab={tab} />

					<Accordion
						allowMultipleExpanded
						className={`flex-col gap-2 mt-4 ${
							tab === TabTypes.Content ? "flex" : "hidden"
						} md:flex md:w-1/3 md:pl-4`}
					>
						<h2 className="hidden md:block font-sans text-2xl font-semibold capitalize mb-3">
							Course Content
						</h2>

						<Content
							files={files}
							setContent={setContent}
							setImgSrc={setImgSrc}
							setVideoState={setVideoState}
						/>
					</Accordion>

					<CourseDetails
						
						styles={`${tab === TabTypes.About ? "block" : "hidden"} md:hidden`}
					/>
				</div>
			</main>
		</div>
	);
}

export default Course;

import { GetServerSideProps } from "next";
import { extractTitle, hashDecrypter, jsonFetchDefinition } from "@/utils/api";
import { courseFilesFetcher, videosLister } from "@/utils/pageProps";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { hash } = ctx.query;

	if (hash) {
		const path = await hashDecrypter(hash);
		const title = extractTitle(path);

		// As the config file already exists
		const files = await courseFilesFetcher(path);
		const videos = videosLister(files);

		// Getting course state
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
