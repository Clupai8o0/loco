import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import nodePath from "path";

import { Response, FileTypes } from "@/types";
import { respond, handleError } from "../../utils/api";

const video = [".mp4", ".mov", ".mpg", ".gif", ".m4v", ".flv", ".ts", ".mkv"];
const zip = [".rar", ".zip", ".7z"];
const attachment = [
	".pdf",
	".otf",
	".xd",
	".psd",
	".ai",
	".aep",
	".c4d",
	".cube",
	".lst",
	".fla",
	".peak",
	".prproj",
	".csh",
	".cpr",
	".blend",
	".docx",
	".doc",
	".ttf",
	".eps",
	".io",
	".brushset",
	".abr",
	".grd",
	".csv",
	".fig"
];
const audio = [".mp3", ".wav"];
const image = [".png", ".jpg", ".jpeg", ".tif"];
const config = ["config.json", ".ini"];
const code = [".html", ".mhtml", ".txt", ".py", ".rtf", ".me", ".md", ".exe"];
const url = [".url", ".webloc"];
const ignore = [".srt", "ds_store", ".vtt", "__macosx"];

function includes(file: string, types: string[]) {
	let status = false;
	types.forEach((type) => file.includes(type) && (status = true));
	return status;
}

function fileType(file: string) {
	file = file.toLowerCase();
	if (includes(file, video)) return FileTypes.Video;
	else if (includes(file, zip)) return FileTypes.Zip;
	else if (includes(file, attachment)) return FileTypes.Attachment;
	else if (includes(file, audio)) return FileTypes.Audio;
	else if (includes(file, image)) return FileTypes.Image;
	else if (includes(file, config)) return FileTypes.Config;
	else if (includes(file, code)) return FileTypes.Code;
	else if (includes(file, url)) return FileTypes.URL;
	else if (includes(file, ignore)) return FileTypes.Ignore;
	else return FileTypes.Folder;
}

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const { path } = req.body;

	try {
		const files = await fs.promises.readdir(path);
		const resp = files.map((file) => ({
			title: file,
			path: nodePath.join(path, file),
			type: fileType(file),
		}));
		res.status(200).send(respond(true, "Successfully read directory", resp));
	} catch (err) {
		handleError(
			"There was an error while trying to read the directory",
			err,
			res
		);
	}
}
