import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import nodePath from "path";

import { Response } from "./../../types";
import { respond, handleError } from "../../utils/api";

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const { path } = req.body;

	try {
		const buffer = await fs.promises.readFile(
			nodePath.join(path, "/config.json")
		);
		const data = JSON.parse(buffer.toString());
		res.status(200).send(respond(true, "Config file read successfully", data));
	} catch (err) {
		handleError("Couldn't read file config", err, res);
	}
}
