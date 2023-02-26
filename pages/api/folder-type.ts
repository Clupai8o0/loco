import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import nodePath from "path";

import { Response } from "@/types";

export default function (req: NextApiRequest, res: NextApiResponse<Response>) {
	const { path } = req.body;

	fs.readFile(nodePath.join(path, "/config.json"), (err, buffer) => {
		//! handle error
		//! note it doesn't check if the file exists yet or not

		const data = JSON.parse(buffer.toString());
		res
			.status(200)
			.json({ success: true, msg: "File successfully read", data });
	});
}
