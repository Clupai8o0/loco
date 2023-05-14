import type { NextApiRequest, NextApiResponse } from "next";

import { Response } from "@/types";
import { respond, decrypt } from "@/utils/api";

export default function (req: NextApiRequest, res: NextApiResponse<Response>) {
	res
		.status(201)
		.send(
			respond(true, "Successfully decrypted string", decrypt(req.body.hash))
		);
}
