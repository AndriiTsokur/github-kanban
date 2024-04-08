import { Draggable } from 'react-beautiful-dnd';

import styles from './Issue.module.scss';
import { IssueContentT } from '@/services';

type IssuePropsT = {
	content: IssueContentT;
	index: number;
};

export const Issue: React.FC<IssuePropsT> = ({ content, index }) => {
	const { id, title, opened, author, comments } = content;

	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<li
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={styles.container}
				>
					<h3 className={styles.title}>{title}</h3>
					<p className={styles.description}>
						&#35;{id} {opened}
					</p>
					<p className={styles.description}>
						{author} | Comments: {comments}
					</p>
				</li>
			)}
		</Draggable>
	);
};
