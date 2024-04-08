import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import styles from './Main.module.scss';
import { getIssues } from '@/redux/issues/issuesSlice';
import { IssueColumn } from './parts';
import { handleDrag } from './utils';

export const Main: React.FC = () => {
	const dispatch = useDispatch();
	const columns = useSelector(getIssues)[0].issuesList;

	return (
		<main>
			<ul className={styles.issuesList}>
				<DragDropContext onDragEnd={handleDrag(columns, dispatch)}>
					{Object.values(columns).map((column) => (
						<li key={column.type} className={styles.listItem}>
							<IssueColumn data={column} />
						</li>
					))}
				</DragDropContext>
			</ul>
		</main>
	);
};
