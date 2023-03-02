import sort from "sort-array";

import { FileDetails, FileTypes } from "@/types";
import { jsonFetchDefinition } from "./api";

export async function filesPathHasher(files: FileDetails[]) {
	return sort(
		await Promise.all(
			files.map(async ({ title, path, type }) => {
				const resp = await fetch("http://localhost:3000/api/link-encrypter", {
					method: "POST",
					body: JSON.stringify({ path }),
					headers: { "Content-Type": "application/json" },
				});
				const hash = (await resp.json()).hash;

				return {
					title,
					path,
					type,
					hash,
				};
			})
		)
	);
}

export async function filesFetcher(path: string) {
	// Getting all the files
	const respLS = await fetch(
		"http://localhost:3000/api/ls",
		jsonFetchDefinition({
			path,
		})
	);
	const files = (await respLS.json()).data;

	// Hashing files paths
	const hashedFiles = await filesPathHasher(files);

	// Filtering the config file and returning
	return hashedFiles.filter((file) => {
		if (file.title === "config.json") return false;
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

export function videosLister(files: FileDetails[]) {
	let videos: FileDetails[] = [];
	files.forEach((file, id) => {
		if (file.type === FileTypes.Folder) {
			videos = [...videos, ...videosLister(file.content || [])];
		}
		videos.push({
			...file,
			id,
		});
	});
	return videos;
}
