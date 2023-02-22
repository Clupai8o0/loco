import React from "react";

import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddFolderModal = ({
	open,
	handleModal,
}: {
	open: boolean;
	handleModal: () => void;
}) => {
	const handleFolderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await fetch("/api/add-folder", {
			method: "POST",
			body: JSON.stringify({
				//@ts-ignore
				path: e.target.path.value,
				//@ts-ignore
				details: e.target.details.value,
			}),
			headers: { "Content-Type": "application/json" },
		});

		handleModal();
	};

	return (
		<Modal
			open={open}
			onClose={handleModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex items-center justify-center"
		>
			<div className="w-[80%] bg-black text-white p-6 rounded-md">
				<h2 className="font-sans text-xl font-medium mb-2">Add Folder Path</h2>
				<p className="font-sans text-[14px] opacity-60 mb-4">
					Copy the path of the folder you wish to add down into the input and
					we'll handle the rest
				</p>
				<form onSubmit={handleFolderSubmit}>
					<div className="mb-4">
						<Input
							required
							placeholder="eg: C:Users/abc/dreams..."
							className="text-white font-sans text-[14px] border-b-gray-500 pb-1 pl-2 pr-2"
							name="path"
							id="path"
						/>
						<Button
							type="submit"
							color="primary"
							className="bg-blue-600 text-white font-sans capitalize text-sm ml-4 pl-4 pr-4"
						>
							Submit
						</Button>
					</div>
					<textarea
						placeholder="Type something here..."
						id="details"
						name="details"
						required
						className="font-sans text-white w-full bg-black border-gray-600 text-[14px]"
					/>
				</form>
			</div>
		</Modal>
	);
};

export default AddFolderModal;
