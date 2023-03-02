import type { NextApiRequest, NextApiResponse } from "next";

import { Response } from "../../types";
import { respond } from "../../utils/api";

import fs from "fs";
import nodePath from 'path';

export default function (req: NextApiRequest, res: NextApiResponse<Response>) {
	const { path } = req.body;

	fs.readFile(nodePath.join(path, "/config.json"), (err, buffer) => {
		if (err) {
			console.log("There was an issue while trying to read the config file");
			console.error(err);
			res.status(500).json(respond(false, "Couldn't read config file", err));
		}

		const data = JSON.parse(buffer.toString()).state || null;
		res
			.status(200)
			.json(
				respond(true, "Successfully gotten the state from the config", data)
			);
	});
}
