import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import settings from "../../config/settings.json";

type Data = {
	success: boolean;
	msg: string;
	data?: any;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.body.path && req.body.details) {
		const { path, details } = req.body;
		const splitPath = path.split("\\");
		const title = splitPath[splitPath.length - 1];
		settings.folders.push({
			title,
			path,
			details,
		});
	}
	fs.writeFile("config/settings.json", JSON.stringify(settings), (err) => {
		if (err) {
			console.log("There was an issue while writing to settings.json file");
			console.error(err);
			res.status(500).json({
				success: false,
				msg: "There was an issue while trying to write to settings.json",
				data: err,
			});
		}

		res.status(200).json({
			success: true,
			msg: "Successfully added folder in settings.json file",
		});
	});
}
