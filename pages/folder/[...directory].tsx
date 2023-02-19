import React from "react";

import Title from "../../components/title";
import Card from "../../components/card";
import Button from '../../components/button';

import { BtnType } from '../../types'

function FolderDirectory() {
	return (
		<main className="bg-black h-[100vh] w-full text-white p-6">
			<div className="flex justify-between items-center">
				<Button type={BtnType.Back} />
				<Button type={BtnType.Edit} />
			</div>
			<Title text="Folder Title" />
			<Card
				title="Card Title"
				paragraph="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat totam consequatur laboriosam, itaque natus nihil est sint, autem blanditiis quam quas iusto, dolor possimus nostrum provident delectus voluptates nesciunt nulla?"
			/>
		</main>
	);
}

export default FolderDirectory;
