import { NextApiResponse } from "next";
import Cryptr from "cryptr";
import colors from "colors";

import { RenderTypes, Response } from "@/types";

const cryptr = new Cryptr("secret");
export const encrypt = (s: string) => cryptr.encrypt(s);
export const decrypt = (s: string) => cryptr.decrypt(s);

export function extractTitle(path: string) {
	const arr = path.split("\\");
	return arr[arr.length - 1];
}

export function jsonFetchDefinition(data: any) {
	return {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};
}

export function respond(success: boolean, msg: string, data?: any) {
	return {
		success,
		msg,
		data,
	};
}

export function handleError(
	msg: string,
	err: unknown,
	res: NextApiResponse<Response>
) {
	console.log(colors.underline.red(msg));
	console.error(err);
	res.status(500).send(respond(false, msg, err));
}

export async function hashDecrypter(hash: string | string[] | undefined) {
	const resp = await fetch(
		"http://localhost:3000/api/decrypt",
		jsonFetchDefinition({ hash })
	);
	return (await resp.json()).data;
}

export async function redirector(path: string, type: RenderTypes) {
	const resp = await fetch(
		"http://localhost:3000/api/folder-type",
		jsonFetchDefinition({ path })
	);
	const config = (await resp.json()).data;

	if (config.renderAs === type) return true;
	return false;
}
