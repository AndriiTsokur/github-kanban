import { Droppable } from 'react-beautiful-dnd';

import styles from './IssueColumn.module.scss';
import { IssueColumnT } from '@/services';
import { Issue } from '../Issue';

type IssueColumnPropsT = {
	data: IssueColumnT;
};

export const IssueColumn: React.FC<IssueColumnPropsT> = ({
	data: { type, title, content },
}) => {
	return (
		<Droppable droppableId={type}>
			{(provided, snapshot) => (
				<section>
					<h2 className={styles.title}>{title}</h2>
					<ul
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={styles.issueWrapper}
						style={{
							backgroundColor: snapshot.isDraggingOver ? '#b6d7f9' : '#ced4da',
						}}
					>
						{content.map((item, idx) => (
							<Issue key={item.id} content={item} index={idx} />
						))}
						{provided.placeholder}
					</ul>
				</section>
			)}
		</Droppable>
	);
};
