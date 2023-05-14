import type { NextApiRequest, NextApiResponse } from "next";

import { RenderTypes, Response } from "@/types";
import { handleError, respond } from "@/utils/api";

import fs from "fs";
import nodePath from "path";

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const { path, videoPath, id, playedSeconds, title } = req.body;

	try {
		const data = {
			renderAs: RenderTypes.Course,
			state: {
				id,
				path: videoPath,
				playedSeconds,
				title,
			},
		};

		await fs.promises.writeFile(
			nodePath.join(path, "/config.json"),
			JSON.stringify(data)
		);
		res.status(200).send(respond(true, "Successfully updated state"));
	} catch (err) {
		handleError("Could not update the state in the config file", err, res);
	}
}
