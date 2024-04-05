import { Input } from 'antd';
import styles from './SearchBar.module.scss';

const { Search } = Input;

export const SearchBar: React.FC = () => {
	return (
		<Search
			className={styles.input}
			placeholder="Enter repo URL"
			enterButton="Load issues"
			size="large"
			loading={false}
			allowClear
		/>
	);
};
