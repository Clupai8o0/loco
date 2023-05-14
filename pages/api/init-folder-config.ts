import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import nodePath from "path";

import { Response, RenderTypes } from "@/types";
import { respond, handleError } from "@/utils/api";

const config = {
	renderAs: RenderTypes.Folders,
};

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const { path } = req.body;

	try {
		const files = await fs.promises.readdir(path);

		if (files.includes("config.json")) {
			res.status(200).send(respond(true, "File already exists"));
		} else {
			await fs.promises.writeFile(
				nodePath.join(path, "config.json"),
				JSON.stringify(config)
			);
			res.status(201).send(respond(true, "File successfully created"));
		}
	} catch (err) {
		handleError(
			"There was error while trying to initialize config file",
			err,
			res
		);
	}
}
