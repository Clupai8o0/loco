import { Dispatch, SetStateAction } from "react";

import { FileDetails, FileTypes } from "../types";
import Folder from "./course-folder";
import File from "./course-file";
import { generate } from "../utils/helpers";

const CourseContent = ({
	files,
	setVideoState,
	setContent,
	setImgSrc,
}: {
	files: FileDetails[];
	setVideoState: (path: string) => void;
	setContent: Dispatch<SetStateAction<FileTypes>>;
	setImgSrc: Dispatch<SetStateAction<string>>;
}) => {
	return (
		<>
			{files.map((file) => {
				if (file.type === FileTypes.Folder) {
					return (
						<Folder
							key={generate()}
							title={file.title}
							// content={file.content?.map((contentFile) => {
							// 	if (contentFile.type === FileTypes.Folder) {
							// 		return (
							// 			<Folder
							// 				key={generate()}
							// 				title={contentFile.title}
							// 				content={contentFile.content?.map((_contentFile) => (
							// 					<File
							// 						title={_contentFile.title}
							// 						type={_contentFile.type}
							// 						key={generate()}
							// 						videoHandler={setVideoState}
							// 						path={_contentFile.path}
							// 						setContent={setContent}
							// 						setImgSrc={setImgSrc}
							// 					/>
							// 				))}
							// 			/>
							// 		);
							// 	} else {
							// 		return (
							// 			<File
							// 				title={contentFile.title}
							// 				type={contentFile.type}
							// 				key={generate()}
							// 				videoHandler={setVideoState}
							// 				path={contentFile.path}
							// 				setContent={setContent}
							// 				setImgSrc={setImgSrc}
							// 			/>
							// 		);
							// 	}
							// })}
							content={
								<CourseContent
									files={file.content || []}
									setVideoState={setVideoState}
									setContent={setContent}
									setImgSrc={setImgSrc}
								/>
							}
						/>
					);
				} else {
					return (
						<File
							title={file.title}
							type={file.type}
							key={generate()}
							videoHandler={setVideoState}
							path={file.path}
							setContent={setContent}
							setImgSrc={setImgSrc}
						/>
					);
				}
			})}
		</>
	);
};

export default CourseContent;
