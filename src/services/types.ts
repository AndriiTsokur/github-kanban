export type RepoT = {
	id: number;
	owner: string;
	profileURL: string;
	repoURL: string;
	issues: IssueColumnT[];
};

export type IssueColumnT = {
	type: string;
	title: string;
	content: IssueContentT[];
};

export type IssueContentT = {
	id: number;
	title: string;
	opened: string;
	author: string;
	comments: number;
};
