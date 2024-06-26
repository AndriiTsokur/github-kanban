import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { Alert } from 'antd';

import styles from './Main.module.scss';
import { selectIssues } from '@/redux/issuesSlice';
import {
	selectFetchedIssues,
	setToInitialState,
} from '@/redux/fetchedIssuesSlice';
import { IssueColumn } from './parts';
import { handleDrag } from './utils';

export const Main: React.FC = () => {
	const dispatch = useDispatch();
	const { error } = useSelector(selectFetchedIssues);

	const visitedIssues = useSelector(selectIssues);
	const columns = visitedIssues[0]?.issuesList;

	const handleCloseAlert = () => dispatch(setToInitialState());

	return (
		<>
			{error ? (
				<Alert
					message="Error"
					description={error}
					type="error"
					showIcon
					closable
					onClose={handleCloseAlert}
				/>
			) : (
				<main>
					{visitedIssues.length === 0 ? (
						<p className={styles.noRecords}>
							No entries yet: you haven't visited any repos
						</p>
					) : visitedIssues[0].issuesList.length === 0 ? (
						<p className={styles.noRecords}>
							No entries yet: there are no listed issues in current repo
						</p>
					) : (
						<ul className={styles.issuesList}>
							<DragDropContext onDragEnd={handleDrag(columns, dispatch)}>
								{Object.values(columns).map((column) => (
									<li key={column.type} className={styles.listItem}>
										<IssueColumn data={column} />
									</li>
								))}
							</DragDropContext>
						</ul>
					)}
				</main>
			)}
		</>
	);
};
