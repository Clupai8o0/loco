import React from "react";

import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";

const AddFolderButton = ({ handleModal }: { handleModal: () => void }) => {
	return (
		<Button
			variant="outlined"
			className="w-full mt-6 h-24 font-sans capitalize"
			startIcon={<Add />}
			color="primary"
			onClick={handleModal}
		>
			Add New Folder
		</Button>
	);
};

export default AddFolderButton;
