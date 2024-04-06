import styles from './Issue.module.scss';

export const Issue: React.FC = () => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Some issue title</h3>
			<p className={styles.description}>&#35;315 opened 3 days ago</p>
			<p className={styles.description}>Admin | Comments: 3</p>
		</div>
	);
};
