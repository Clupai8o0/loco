import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import nodePath from "path";

import { Response } from "@/types";

const config = {
	renderAs: "folders",
};

export default function (req: NextApiRequest, res: NextApiResponse<Response>) {
	const { path } = req.body;
	fs.readdir(path, (err, files) => {
		//! handle error
		if (files.includes("config.json")) {
			res.status(200).json({ success: true, msg: "File already exists" });
		} else {
			fs.writeFile(
				nodePath.join(path, "config.json"),
				JSON.stringify(config),
				(err) => {
					//! handle error
					res
						.status(201)
						.json({ success: true, msg: " File created successfully" });
				}
			);
		}
	});
}
