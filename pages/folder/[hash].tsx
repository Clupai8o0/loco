import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Title from "../../components/title";
import Card from "../../components/folderCard";
import Button from "../../components/button";

import { BtnType } from "../../types";

import sort from "sort-array";

function FolderDirectory({
	files,
	path,
	title,
}: {
	files: any;
	path: string;
	title: string;
}) {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	const handleToggleFolderType = () => {
		fetch("/api/set-config", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				path,
				value: "course",
			}),
		});
	};

	return (
		<main className="main">
			<div className="flex justify-between items-center">
				<Button type={BtnType.Back} handler={handleBack} />
				<Button type={BtnType.Edit} handler={handleToggleFolderType} />
			</div>
			<Title text={title} />

			{files.map((file: any) => (
				<Card title={file.title} hash={file.hash} />
			))}
		</main>
	);
}

export default FolderDirectory;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const fetchHeaders = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	};

	const respPath = await fetch(`http://localhost:3000/api/link-decrypter`, {
		...fetchHeaders,
		body: JSON.stringify({ hash: ctx.query.hash }),
	});
	const path = (await respPath.json()).path;

	const splitArr = path.split("\\");
	const title = splitArr[splitArr.length - 1];

	await fetch("http://localhost:3000/api/init-folder-config", {
		...fetchHeaders,
		body: JSON.stringify({ path }),
	});

	// TODO: Redirect if folder type is course
	const respFolderType = await fetch("http://localhost:3000/api/folder-type", {
		...fetchHeaders,
		body: JSON.stringify({ path }),
	});
	const config = (await respFolderType.json()).data;
	
	if (config.renderAs === 'course') {
		return {
			redirect: {
				permanent: false,
				destination: `/course/${ctx.query.hash}`
			},
			props: {}
		}
	}

	const respLS = await fetch("http://localhost:3000/api/ls", {
		...fetchHeaders,
		body: JSON.stringify({ path }),
	});
	const files = (await respLS.json()).data;
	const unfilteredFiles = await Promise.all(
		files.map(async (file: any) => {
			const resp = await fetch("http://localhost:3000/api/link-encrypter", {
				...fetchHeaders,
				body: JSON.stringify({ path: file.path }),
			});
			const hash = (await resp.json()).hash;

			return {
				title: file.title,
				hash,
			};
		})
	);
	const hashedFiles = unfilteredFiles.filter((file) => {
		if (file.title === "config.json") return false;
		return true;
	});

	return {
		props: {
			files: sort(hashedFiles),
			path,
			title,
		},
	};
};
