import sort from "sort-array";

import { FileDetails, FileTypes } from "@/types";
import { jsonFetchDefinition } from "./api";

export async function filesFetcher(path: string) {
	// Getting all the files
	const respLS = await fetch(
		"http://localhost:3000/api/read-dir",
		jsonFetchDefinition({
			path,
		})
	);
	const files = (await respLS.json()).data;

	// Sorting, Filtering the config file and returning
	return sort<FileDetails>(files).filter((file) => {
		if (file.type === FileTypes.Config || file.type === FileTypes.Ignore)
			return false;
		return true;
	});
}

export async function courseFilesFetcher(path: string): Promise<FileDetails[]> {
	const files = await filesFetcher(path);

	//! debugging code
	// console.log(path, files.map(file => ({
	// 	title: file.title,
	// 	type: file.type
	// })).filter(file => file.type === FileTypes.Folder));

	const hydratedFiles = await Promise.all(
		files.map(async (file) => {
			if (file.type === FileTypes.Folder) {
				const content = await courseFilesFetcher(file.path);
				return {
					...file,
					content,
				};
			}
			return file;
		})
	);

	return hydratedFiles;
}

let i = 0;
export function videosLister(files: FileDetails[]) {
	let videos: FileDetails[] = [];
	files.forEach((file) => {
		if (file.type === FileTypes.Folder) {
			videos = [...videos, ...videosLister(file.content || [])];
		} else if (file.type === FileTypes.Video) {
			videos.push({
				...file,
				id: i,
			});
			i++;
		}
	});
	return videos;
}
