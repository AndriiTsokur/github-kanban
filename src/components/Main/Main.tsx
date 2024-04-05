import styles from './Main.module.scss';
import { IssuesType } from './Main.types';
import { IssueColumn } from './parts';

const issues: IssuesType[] = [
	{ name: 'toDo', title: 'To Do' },
	{ name: 'inProgress', title: 'In Progress' },
	{ name: 'done', title: 'Done' },
];

export const Main: React.FC = () => {
	return (
		<main>
			<ul className={styles.issuesList}>
				{issues.map(({ name, title }) => (
					<li key={name} className={styles.listItem}>
						<IssueColumn title={title} />
					</li>
				))}
			</ul>
		</main>
	);
};
