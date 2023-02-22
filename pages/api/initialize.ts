import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path from "path";

const settings = {
	folders: [],
};

type Data = {
	success: boolean;
	msg: string;
	data?: object;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	//* Reading the config directory
	fs.readdir(path.join(__dirname, "../../../../config"), (err, files) => {
		//* If there is an error while reading
		if (err) {
			console.log(
				"There was an error while trying to access the config directory\n\n\n"
			);
			console.error(err);
			res.status(500).json({
				success: false,
				msg: "There was an issue while trying to read the directory",
				data: err,
			});
			return; // breaking out
		}

		//* Settings is already initialized
		if (files.includes("settings.json")) {
			res.status(200).json({ success: true, msg: "File already exists" });
		} else {
			//* Initializing the file
			fs.writeFile("/config/settings.json", JSON.stringify(settings), (err) => {
				//* If there is an error while writing to file
				if (err) {
					console.log(
						"There was an error while creating the settings config json file\n\n\n"
					);
					console.error(err);
					res
						.status(500)
						.json({ success: false, msg: "File could not be created" });
				} else {
					//* Sending success status
					res.status(201).json({
						success: true,
						msg: "Settings config file successfully created",
					});
				}
			});
		}
	});
}
