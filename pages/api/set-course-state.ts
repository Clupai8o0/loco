import type { NextApiRequest, NextApiResponse } from "next";

import { Response, RenderTypes } from "@/types";
import { respond } from "../../utils/api";

import fs from "fs";
import nodePath from "path";

export default function (req: NextApiRequest, res: NextApiResponse<Response>) {
	const { path, videoPath, id, playedSeconds, title } = req.body;
	console.log(title, playedSeconds, path);

	fs.writeFile(
		nodePath.join(path, "/config.json"),
		JSON.stringify({
			renderAs: RenderTypes.Course,
			state: {
				id,
				path: videoPath,
				playedSeconds,
				title,
			},
		}),
		(err) => {
			if (err) {
				console.log(
					"There was an error while trying to update the state of the config"
				);
				console.error(err);
				res.status(500).json(respond(false, "Couldn't update state", err));
			}

			res.status(200).json(respond(true, "Successfully updated the state"));
		}
	);
}
