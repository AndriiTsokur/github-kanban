import styles from './IssueColumn.module.scss';
import { PropsT } from './IssueColumn.types';

export const IssueColumn = ({ title }: PropsT) => {
	return (
		<section className={styles.column}>
			<h2 className={styles.title}>{title}</h2>
		</section>
	);
};
