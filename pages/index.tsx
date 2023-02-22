import { useState } from "react";
import { GetServerSideProps } from "next";

import Title from "../components/title";
import Card from "../components/card";
import AddFolderButton from "../components/addFolderButton";
import AddFolderModal from "../components/addFolderModal";

import settings from "../config/settings.json";

export default function Home() {
	const [openModal, setOpenModal] = useState(false);
	const handleModal = () => setOpenModal(() => !openModal);

	return (
		<main className="main">
			<Title text="Home" />

			{settings.folders.map(({ path, title, details }, i) => (
				<Card title={title} paragraph={details} path={path} key={i} />
			))}

			<AddFolderButton handleModal={handleModal} />
			<AddFolderModal open={openModal} handleModal={handleModal} />
		</main>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	//* Initializing the settings file
	await fetch("http://localhost:3000/api/initialize");
	return {
		props: {},
	};
};
