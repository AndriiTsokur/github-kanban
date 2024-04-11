import styles from './App.module.scss';
import { History, Main, SearchBar } from '@/components';

export const App: React.FC = () => {
	return (
		<>
			<History />
			<div className={styles.mainContainer}>
				<SearchBar />
				<Main />
			</div>
		</>
	);
};
