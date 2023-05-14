import type { NextApiRequest, NextApiResponse } from "next";
import colors from 'colors'

import { Response } from "@/types";
import { respond, encrypt } from "@/utils/api";

export default function (req: NextApiRequest, res: NextApiResponse<Response>) {
	res
		.status(201)
		.send(
			respond(true, "Successfully encrypted string", encrypt(req.body.path))
		);
}
