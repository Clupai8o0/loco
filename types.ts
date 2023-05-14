export type Response = {
	success: boolean;
	msg: string;
	data?: any;
};

export enum RenderTypes {
	Folders = "folders",
	Course = "course",
}

export enum FileTypes {
	Folder = "folder",
	Video = "video",
	Attachment = "attachment",
	Zip = "zip",
	Audio = "audio",
	Image = "image",
	Config = "config",
	Code = "code",
	Ignore = "ignore",
	URL = "url"
}

export interface FileDetails {
	title: string;
	path: string;
	type: FileTypes;
	hash?: string;
	content?: FileDetails[];
	id?: any;
}

export enum TabTypes {
	Content = "Content",
	About = "About",
}
