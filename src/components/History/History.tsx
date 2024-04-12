import { useDispatch, useSelector } from 'react-redux';
import { Button, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';

import styles from './History.module.scss';
import {
	clearHistory,
	moveIssueToTop,
	selectIssues,
} from '@/redux/issuesSlice';
import { setToInitialState } from '@/redux/fetchedIssuesSlice';

export const History: React.FC = () => {
	const dispatch = useDispatch();
	const historyList = useSelector(selectIssues);

	let clearHistoryIsAvailable = false;
	if (historyList.length > 1) clearHistoryIsAvailable = true;

	const handleClearHistory: PopconfirmProps['onConfirm'] = () => {
		if (clearHistoryIsAvailable) {
			dispatch(setToInitialState());
			dispatch(clearHistory());
		}
	};

	const selectRepo = (idx: number) => {
		if (idx > 0) {
			dispatch(setToInitialState());
			dispatch(moveIssueToTop(idx));
		}
	};

	return (
		<aside className={styles.aside}>
			<h2 className={styles.title}>
				{historyList.length === 0 && 'No '}Visited Repos
			</h2>

			{historyList.length > 0 && (
				<>
					<div className={styles.currentContainer}>
						<h3 className={styles.subtitle}>Current:</h3>
						<div className={styles.repoWrapper}>
							<p className={styles.repoText}>
								<span className={styles.repoHeader}>Visited: </span>
								{historyList[0].visited}
							</p>
							<p className={styles.repoText}>
								<span className={styles.repoHeader}>Owner: </span>
								{historyList[0].owner}
							</p>
							<p className={styles.repoText}>
								<span className={styles.repoHeader}>Repo: </span>
								{historyList[0].repoName}
							</p>
						</div>

						<Popconfirm
							title="Delete the History"
							description="Are you sure to delete the History?"
							onConfirm={handleClearHistory}
							// onCancel={cancel}
							okText="Yes"
							cancelText="No"
						>
							<Button
								// onClick={handleClearHistory}
								disabled={!clearHistoryIsAvailable}
								danger
								block
								style={{ marginTop: '30px' }}
								type="primary"
								size="small"
							>
								Clear History
							</Button>
						</Popconfirm>
					</div>

					<h3 className={styles.subtitle}>
						History: {historyList.length === 1 && 'the list is empty'}
					</h3>
					<ul>
						{historyList.map(({ visited, owner, repoName }, idx) => {
							if (idx !== 0) {
								return (
									<li
										key={idx}
										onClick={() => selectRepo(idx)}
										className={styles.repoItem}
									>
										<div className={styles.repoWrapper}>
											<p className={styles.repoText}>
												<span className={styles.repoHeader}>Visited: </span>
												{visited}
											</p>
											<p className={styles.repoText}>
												<span className={styles.repoHeader}>Owner: </span>
												{owner}
											</p>
											<p className={styles.repoText}>
												<span className={styles.repoHeader}>Repo: </span>
												{repoName}
											</p>
										</div>
									</li>
								);
							}
						})}
					</ul>
				</>
			)}
		</aside>
	);
};
