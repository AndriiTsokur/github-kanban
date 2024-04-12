import { useSelector } from 'react-redux';
import { StarFilled } from '@ant-design/icons';

import styles from './RepoInfo.module.scss';
import { selectIssues } from '@/redux/issuesSlice';

export const RepoInfo = () => {
	const visitedRepos = useSelector(selectIssues);
	const currentRepo = visitedRepos[0];

	return (
		<>
			{visitedRepos.length > 0 && (
				<div className={styles.info}>
					<p className={styles.repoName}>
						<a href={currentRepo.profileURL} target="_blank">
							{currentRepo.owner}
						</a>{' '}
						&gt;{' '}
						<a href={currentRepo.repoURL} target="_blank">
							{currentRepo.repoName}
						</a>
					</p>
					<div className={styles.repoStar}>
						<StarFilled style={{ fontSize: '20px', color: 'orange' }} />
						<p className={styles.starText}>{currentRepo.repoStars}</p>
					</div>
				</div>
			)}
		</>
	);
};
