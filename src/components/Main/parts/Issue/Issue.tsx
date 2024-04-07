import styles from './Issue.module.scss';
import { IssueContentT } from '@/services';

type IssuePropsT = {
	content: IssueContentT;
};

export const Issue: React.FC<IssuePropsT> = ({ content }) => {
	const { id, title, opened, author, comments } = content;
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{title}</h3>
			<p className={styles.description}>
				&#35;{id} {opened}
			</p>
			<p className={styles.description}>
				{author} | Comments: {comments}
			</p>
		</div>
	);
};
