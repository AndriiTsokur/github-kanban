import { RepoT, IssueColumnT, IssueContentT } from '@/services';
import { addRepo, moveIssueToTop } from '@/redux/issuesSlice';
import { setToInitialState } from '@/redux/fetchedIssuesSlice';

type ProcessFetchedDataPropsT = {
	dispatch: any;
	fetchedData: any;
	visitedRepos: RepoT[];
};

export const processFetchedData = ({
	dispatch,
	fetchedData,
	visitedRepos,
}: ProcessFetchedDataPropsT) => {
	if (fetchedData.path) {
		// Defining repo owner and name, bringing their first letter to upper case
		const slashIdx = fetchedData.path.indexOf('/');
		let fetchedRepoOwner = fetchedData.path.slice(0, slashIdx);
		let fetchedRepoName = fetchedData.path.slice(slashIdx + 1);
		fetchedRepoOwner =
			fetchedRepoOwner.slice(0, 1).toUpperCase() + fetchedRepoOwner.slice(1);
		fetchedRepoName =
			fetchedRepoName.slice(0, 1).toUpperCase() + fetchedRepoName.slice(1);

		// Checking if there are previous visits to the exact repo issues
		const checkVisitedIdx = visitedRepos.findIndex(
			({ owner, repoName }) =>
				owner === fetchedRepoOwner && repoName === fetchedRepoName,
		);

		// If the repository has already been visited, we move it to the top of the global Issues state array (it appears on the screen)
		if (checkVisitedIdx !== -1 && checkVisitedIdx !== 0) {
			dispatch(moveIssueToTop(checkVisitedIdx));
			return;
		}

		// If the repository has not been visited yet, creating the new Issue object to add it to the top of the global Issues state array (it will appear on the screen)
		if (checkVisitedIdx === -1) {
			const extractedData: RepoT = {
				visited: new Date().toDateString(),
				owner: fetchedRepoOwner,
				profileURL: `https://github.com/${fetchedRepoOwner.toLowerCase()}`,
				repoName: fetchedRepoName,
				repoURL: `https://github.com/${fetchedData.path}`,
				repoStars: `${Math.floor(fetchedData.stars / 1000).toString()} K stars`,
				issuesList: [],
			};

			if (fetchedData.issues.length !== 0) {
				const extractedIssues: IssueColumnT[] = [
					{
						type: 'TODO',
						title: 'To Do',
						content: [],
					},
					{
						type: 'INPROGRESS',
						title: 'In Progress',
						content: [],
					},
					{
						type: 'DONE',
						title: 'Done',
						content: [],
					},
				];

				fetchedData.issues.map((issue: any) => {
					// Calculation of time elapsed since the date of the Issue creation
					const issueDate: Date = new Date(issue.created_at);
					const currentDate: Date = new Date();
					const difference: number =
						currentDate.getTime() - issueDate.getTime();
					const daysPassed: number = Math.round(
						difference / (1000 * 60 * 60 * 24),
					);

					// Preparing separated Issues data
					const issueDetails: IssueContentT = {
						id: issue.number.toString(),
						title: issue.title,
						opened: `opened ${daysPassed < 1 ? 'today' : daysPassed + ' days ago'}`,
						author: issue.user.login,
						comments: issue.comments,
					};

					if (issue.state === 'closed') {
						extractedIssues
							.find((issue) => issue.type === 'DONE')
							?.content.push(issueDetails);
					} else if (issue.assignees.length > 0) {
						extractedIssues
							.find((issue) => issue.type === 'INPROGRESS')
							?.content.push(issueDetails);
					} else {
						extractedIssues
							.find((issue) => issue.type === 'TODO')
							?.content.push(issueDetails);
					}
				});

				extractedData.issuesList = [...extractedIssues];
			}
			dispatch(addRepo(extractedData));
		}
		dispatch(setToInitialState());
	}
};
