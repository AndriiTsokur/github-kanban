import { Input } from 'antd';
import { StarFilled } from '@ant-design/icons';
import styles from './SearchBar.module.scss';

const { Search } = Input;

export const SearchBar: React.FC = () => {
	return (
		<header className={styles.header}>
			<Search
				placeholder="Enter repo URL"
				enterButton="Load issues"
				size="large"
				loading={false}
				allowClear
			/>

			<div className={styles.info}>
				<p className={styles.repoName}>Facebook &gt; React</p>
				<div className={styles.repoStar}>
					<StarFilled style={{ fontSize: '20px', color: 'orange' }} />
					<p className={styles.starText}>194 K stars</p>
				</div>
			</div>
		</header>
	);
};
