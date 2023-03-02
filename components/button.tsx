// FolderZipRounded, // folder, wait thats accordion
import {
	AudiotrackRounded as AudioIcon, // audio
	PhotoRounded as ImageIcon, // image
	DataObjectRounded as CodeIcon, // code
	AttachFileOutlined as AttachmentIcon, // attachment
	MovieCreationRounded as VideoIcon, // video
} from "@mui/icons-material";

import { FileTypes } from "@/types";

const Button = ({
	title,

	type,
	handler,
}: {
	title: string;

	type: FileTypes;
	handler: (title: string) => void;
}) => {
	const handleIcon = () => {
		if (type === FileTypes.Video) {
			return <VideoIcon />;
		} else if (type === FileTypes.Attachment) {
			return <AttachmentIcon />;
		} else if (type === FileTypes.Code) {
			return <CodeIcon />;
		} else if (type === FileTypes.Image) {
			return <ImageIcon />;
		} else if (type === FileTypes.Audio) {
			return <AudioIcon />;
		} else {
			return <AttachmentIcon />;
		}
	};

	return (
		<button className="w-full h-full text-left capitalize font-sans opacity-80 pt-4 pb-4" onClick={() => handler(title)}>
			<span className="mr-4">{handleIcon()}</span>
			{title}
		</button>
	);
};
export default Button;
