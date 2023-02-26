import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import nodePath from "path";

type Data = {
	success: boolean;
	msg: string;
	data?: any;
};

enum FileTypes {
	Folder = "folder",
	Video = "video",
	Attachment = "attachment",
	Zip = "zip",
	Audio = "audio",
	Image = "image",
	Config = "config"
}

function fileType(file: string) {
	if (file.includes(".mp4") || file.includes(".mov")) {
		return FileTypes.Video;
	} else if (file.includes(".rar") || file.includes(".zip")) {
		return FileTypes.Zip;
	} else if (file.includes(".html") || file.includes(".pdf")) {
		return FileTypes.Attachment;
	} else if (file.includes(".mp3") || file.includes(".wav")) {
		return FileTypes.Audio;
	} else if (
		file.includes(".png") ||
		file.includes(".jpg") ||
		file.includes(".jpeg")
	) {
		return FileTypes.Image;
	} else if (file.includes("config.json")) {
		return FileTypes.Config
	} else {
		return FileTypes.Folder;
	}
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	const { path } = req.body;

	fs.readdir(path, (err, files) => {
		//! handle error

		const resp = files.map((file) => ({
			title: file,
			path: nodePath.join(path, file),
			type: fileType(file),
		}));
		res
			.status(200)
			.json({ success: true, msg: "Successfully read directory", data: resp });
	});
}
