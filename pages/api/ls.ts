import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import nodePath from "path";

import { respond } from "../../utils/api";
import { Response, FileTypes } from "@/types";

function fileType(file: string) {
	if (file.includes(".mp4") || file.includes(".mov")) {
		return FileTypes.Video;
	} else if (file.includes(".rar") || file.includes(".zip")) {
		return FileTypes.Zip;
	} else if (file.includes(".pdf")) {
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
		return FileTypes.Config;
	} else if (file.includes(".html") || file.includes(".ts") || file.includes(".mhtml")) {
		return FileTypes.Code;
	} else {
		return FileTypes.Folder;
	}
}

export default function (req: NextApiRequest, res: NextApiResponse<Response>) {
	const { path } = req.body;

	fs.readdir(path, (err, files) => {
		if (err) {
			console.log(
				"There was issue while trying to read directory\n File path might be incorrect"
			);
			console.error(err);
			res
				.status(500)
				.json(respond(false, "Error trying to read through directory", err));
		}

		const resp = files.map((file) => ({
			title: file,
			path: nodePath.join(path, file),
			type: fileType(file),
		}));
		res.status(200).json(respond(true, "Successfully read directory", resp));
	});
}
