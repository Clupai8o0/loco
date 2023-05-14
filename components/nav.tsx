import { NextRouter } from "next/router";

import { RenderTypes } from "@/types";
import { jsonFetchDefinition } from "@/utils/api";
import IconButton from "./icon-button";

const Nav = ({
	router,
	path,
	value,
}: {
	router: NextRouter;
	path: string;
	value: RenderTypes;
}) => {
	const handleBack = () => {
		router.back();
	};

	const handleEdit = async () => {
		await fetch("/api/set-config", jsonFetchDefinition({ path, value }));
		router.reload();
	};

	return (
		<nav className="nav">
			<IconButton icon="/assets/back.svg" text="Go back" handler={handleBack} />
			<IconButton icon="/assets/edit.svg" iconOnly handler={handleEdit} />
		</nav>
	);
};

export default Nav;
