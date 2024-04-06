import styles from './IssueColumn.module.scss';
import { IssueColumnPropsT } from './IssueColumn.types';
import { Issue } from '../Issue';

export const IssueColumn = ({ title }: IssueColumnPropsT) => {
	return (
		<section>
			<h2 className={styles.title}>{title}</h2>
			<ul className={styles.issueWrapper}>
				<li className={styles.issue}>
					<Issue />
				</li>
				<li className={styles.issue}>
					<Issue />
				</li>
				<li className={styles.issue}>
					<Issue />
				</li>
			</ul>
		</section>
	);
};
