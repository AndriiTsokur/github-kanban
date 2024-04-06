import styles from './Main.module.scss';
import { IssueColumn, IssueColumnPropsT } from './parts';

const issues: IssueColumnPropsT[] = [
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
						<IssueColumn name={name} title={title} />
					</li>
				))}
			</ul>
		</main>
	);
};
