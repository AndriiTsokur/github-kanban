import styles from './Main.module.scss';
import { IssueColumn } from './parts';
import { RepoT, issuesJSON } from '@/services';

export const Main: React.FC = () => {
	const initialState: RepoT = issuesJSON;

	return (
		<main>
			<ul className={styles.issuesList}>
				{initialState.issues.map(({ type, title, content }) => (
					<li key={type} className={styles.listItem}>
						<IssueColumn title={title} type={type} content={content} />
					</li>
				))}
			</ul>
		</main>
	);
};
