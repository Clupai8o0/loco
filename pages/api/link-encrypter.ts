import type { NextApiRequest, NextApiResponse } from "next";
import Cryptr from "cryptr";

const cryptr = new Cryptr("myTotallySecretKey", {
	pbkdf2Iterations: 10000,
	saltLength: 10,
});

type Data = {
	hash: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	res.status(201).json({ hash: cryptr.encrypt(req.body.path) });
}
