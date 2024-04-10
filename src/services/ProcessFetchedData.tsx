import { useDispatch, useSelector } from 'react-redux';
import { selectIssues } from '@/redux/issuesSlice';
import { selectFetchedIssues } from '@/redux/fetchedIssuesSlice';

export const ProcessFetchedData = (repoAddress: string) => {
	// const dispatch = useDispatch();
	const visitedIssues = useSelector(selectIssues);
	// const fetchedIssues: object[] = useSelector(selectFetchedIssues);

	// Defining repo owner and name
	const slashIdx = repoAddress.indexOf('/');
	const repoOwner = repoAddress.slice(0, slashIdx);
	const repoName = repoAddress.slice(slashIdx + 1);

	console.log(repoOwner, repoName);
	console.log(visitedIssues);

	// if ()
};
