import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import nodePath from "path";

import { Response } from "@/types";

export default function (req: NextApiRequest, res: NextApiResponse<Response>) {
	const { path, value } = req.body;

	fs.readdir(path, (err, files) => {
		//! handle error

		if (files.includes("config.json")) {
			fs.writeFile(
				nodePath.join(path, "/config.json"),
				JSON.stringify({ renderAs: value }),
				(err) => {}
			);
			res.status(200).json({ success: true, msg: "Config file updated" });
		} else {
			res
				.status(404)
				.json({ success: false, msg: "Config file does not exist" });
		}
	});
}
