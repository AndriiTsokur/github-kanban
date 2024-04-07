import styles from './IssueColumn.module.scss';
import { IssueColumnT } from '@/services';
import { Issue } from '../Issue';

export const IssueColumn: React.FC<IssueColumnT> = ({ content, title }) => {
	return (
		<section>
			<h2 className={styles.title}>{title}</h2>
			<ul className={styles.issueWrapper}>
				{content.map((item) => (
					<li key={item.id} className={styles.issue}>
						<Issue content={item} />
					</li>
				))}
			</ul>
		</section>
	);
};
