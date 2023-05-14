import { FileTypes } from "@/types";
import { Dispatch, SetStateAction } from "react";

const File = ({
	title,
	type,
	videoHandler,
	setContent,
	path,
	setImgSrc,
}: {
	title: string;
	type: FileTypes;
	videoHandler: (path: string) => void;
	setContent: Dispatch<SetStateAction<FileTypes>>;
	path: string;
	setImgSrc: Dispatch<SetStateAction<string>>
}) => {
	const handleType = () => {
		if (type === FileTypes.Video) return "/assets/video.svg";
		else if (type === FileTypes.Audio) return "/assets/audio.svg";
		else if (type === FileTypes.Code) return "/assets/code.svg";
		else if (type === FileTypes.Image) return "/assets/image.svg";
		else if (type === FileTypes.Attachment) return "/assets/attachment.svg";
		else if (type === FileTypes.Zip) return "/assets/zip.svg";
		else if (type === FileTypes.URL) return "/assets/url.svg";
		else return "/assets/folder.svg";
	};

	return (
		<button
			className="flex text-sm md:text-[15px] font-sans items-center gap-2 text-left leading-4 p-4 w-full capitalize opacity-80 truncate"
			onClick={() => {
				if (type === FileTypes.Video) {
					setContent(FileTypes.Video);
					videoHandler(path);
				} else if (type === FileTypes.Image) {
					setContent(FileTypes.Image);

					const arr = path.split("\\");
					setImgSrc(`\\${arr.splice(3).join("\\")}`);
				}
			}}
		>
			<img src={handleType()} alt="accordion button icon" /> {title}
		</button>
	);
};

export default File;
