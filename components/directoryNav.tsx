import { NextRouter } from "next/router";

import { Button, IconButton } from "@mui/material";

import { RenderTypes } from "@/types";
import { jsonFetchDefinition } from "@/utils/api";

const DirectoryNav = ({
	router,
	path,
	value,
}: {
	router: NextRouter;
	path: string;
	value: RenderTypes;
}) => {
	return (
		<div className="flex justify-between">
			<Button
				variant="text"
				color="primary"
				className="font-sans capitalize text-[12px] leading-3 font-medium bg-[rgba(208,188,255,0.08)] hover:bg-[rgba(208,188,255,0.2)] flex pt-2 pb-2 pr-4 pl-3 justify-center items-center gap-2 rounded-full mb-6"
				onClick={() => {
					router.back();
				}}
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.5092 14.7625L6.17415 9.44327C6.11083 9.37995 6.06587 9.31134 6.03927 9.23747C6.01267 9.16359 5.99959 9.08443 6.00001 9C6.00001 8.91557 6.0131 8.83641 6.03927 8.76253C6.06545 8.68865 6.11041 8.62005 6.17415 8.55673L11.5092 3.22164C11.657 3.07388 11.8417 3 12.0633 3C12.285 3 12.4749 3.07916 12.6333 3.23747C12.7916 3.39578 12.8707 3.58047 12.8707 3.79156C12.8707 4.00264 12.7916 4.18734 12.6333 4.34565L7.9789 9L12.6333 13.6544C12.781 13.8021 12.8549 13.9843 12.8549 14.2008C12.8549 14.4174 12.7757 14.6046 12.6174 14.7625C12.4591 14.9208 12.2744 15 12.0633 15C11.8523 15 11.6676 14.9208 11.5092 14.7625Z"
						fill="#D0BCFF"
					/>
				</svg>
				Go Back
			</Button>

			<IconButton
				color="primary"
				style={{ padding: "12px", marginBottom: "24px" }}
				onClick={async () => {
					await fetch(
						"/api/set-config",
						jsonFetchDefinition({
							path,
							value,
						})
					);
				}}
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M14.805 5.69463C15.065 5.43466 15.065 5.00139 14.805 4.75476L13.2452 3.19497C12.9986 2.93501 12.5653 2.93501 12.3054 3.19497L11.0789 4.4148L13.5785 6.91446M3 12.5003V15H5.49965L12.872 7.62103L10.3723 5.12137L3 12.5003Z"
						fill="#A495C9"
					/>
				</svg>
			</IconButton>
		</div>
	);
};

export default DirectoryNav;
