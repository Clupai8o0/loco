import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import nodePath from "path";

import { Response } from "./../../types";
import { handleError, respond } from "@/utils/api";

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const { path } = req.body;

	try {
		const buffer = await fs.promises.readFile(
			nodePath.join(path, "/config.json")
		);
		const data = JSON.parse(buffer.toString()).state || null;
		res
			.status(200)
			.send(respond(true, "Successfully retrieved state from config", data));
	} catch (err) {
		handleError("Could not read config file", err, res);
	}
}
