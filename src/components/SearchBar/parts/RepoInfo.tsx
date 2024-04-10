import { useDispatch, useSelector } from 'react-redux';
import { StarFilled } from '@ant-design/icons';

import styles from './RepoInfo.module.scss';
import { RepoT, IssueColumnT, IssueContentT } from '@/services';
import { addRepo, moveIssueToTop, selectIssues } from '@/redux/issuesSlice';
import { selectFetchedIssues } from '@/redux/fetchedIssuesSlice';

export const RepoInfo = () => {
	const dispatch = useDispatch();
	const visitedRepos = useSelector(selectIssues);
	const currentRepo = visitedRepos[0];
	const fetchedIssues = useSelector(selectFetchedIssues);

	if (fetchedIssues.path) {
		// Defining repo owner and name, bringing their first letter to upper case
		const slashIdx = fetchedIssues.path.indexOf('/');
		let fetchedRepoOwner = fetchedIssues.path.slice(0, slashIdx);
		let fetchedRepoName = fetchedIssues.path.slice(slashIdx + 1);
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
				repoURL: `https://github.com/${fetchedIssues.path}`,
				repoStars: `${Math.floor(fetchedIssues.stars / 1000).toString()} K stars`,
				issuesList: [],
			};

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

			fetchedIssues.fetchedIssuesState.map((issue: any) => {
				// Calculation of time elapsed since the date of the Issue creation
				const issueDate: Date = new Date(issue.created_at);
				const currentDate: Date = new Date();
				const difference: number = currentDate.getTime() - issueDate.getTime();
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
			dispatch(addRepo(extractedData));
			// console.log(extractedData);
		}
	}

	return (
		<div className={styles.info}>
			<p className={styles.repoName}>
				<a href={currentRepo.profileURL} target="_blank">
					{currentRepo.owner}
				</a>{' '}
				&gt;{' '}
				<a href={currentRepo.repoURL} target="_blank">
					{currentRepo.repoName}
				</a>
			</p>
			<div className={styles.repoStar}>
				<StarFilled style={{ fontSize: '20px', color: 'orange' }} />
				<p className={styles.starText}>{currentRepo.repoStars} stars</p>
			</div>
		</div>
	);
};
