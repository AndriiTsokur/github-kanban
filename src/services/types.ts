export type DataT = {
	issuesState: RepoT[];
};

export type RepoT = {
	owner: string;
	profileURL: string;
	repoName: string;
	repoURL: string;
	repoStars: string;
	issuesList: IssueColumnT[];
};

export type IssueColumnT = {
	type: string;
	title: string;
	content: IssueContentT[];
};

export type IssueContentT = {
	id: string;
	title: string;
	opened: string;
	author: string;
	comments: number;
};
