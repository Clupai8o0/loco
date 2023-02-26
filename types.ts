export enum BtnType {
	Back = "Back",
	Edit = "Edit",
}

export type Response = {
	success: boolean;
	msg: string;
	data?: any;
};

export enum RenderTypes {
	Folders = "folders",
	Course = "course"
}
