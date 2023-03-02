import { RenderTypes } from "@/types";

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

export async function hashDecrypter(hash: string) {
	const resp = await fetch(
		"http://localhost:3000/api/link-decrypter",
		jsonFetchDefinition({ hash })
	);
	return (await resp.json()).path;
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
