import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import nodePath from "path";

import { Response } from "./../../types";
import { handleError, respond } from "@/utils/api";

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const { path, value } = req.body;

	try {
		const files = await fs.promises.readdir(path);

		if (files.includes("config.json")) {
			await fs.promises.writeFile(
				nodePath.join(path, "/config.json"),
				JSON.stringify({ renderAs: value })
			);
			res.status(200).send(respond(true, "Config file successfully updated"));
		}
	} catch (err) {
		handleError(
			"There was an issue while trying to read the config file",
			err,
			res
		);
	}
}
