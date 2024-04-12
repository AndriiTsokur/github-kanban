import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';

import styles from './SearchBar.module.scss';
import { fetchIssuesThunk, fetchStarsThunk } from '@/redux/operations';
import { selectFetchedIssues } from '@/redux/fetchedIssuesSlice';

const { Search } = Input;

export const SearchBar: React.FC = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector(selectFetchedIssues);

	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value.trim().toLowerCase());
	};

	const handleSubmit = () => {
		dispatch<any>(fetchIssuesThunk(inputValue));
		dispatch<any>(fetchStarsThunk(inputValue));
	};

	return (
		<header className={styles.header}>
			<Search
				value={inputValue}
				onChange={handleInputChange}
				addonBefore="https://github.com/"
				placeholder="repo_owner/repo_name"
				allowClear
				enterButton="Load issues"
				size="middle"
				loading={isLoading}
				onSearch={handleSubmit}
				style={{ minWidth: '100%', fontSize: '10px' }}
			/>
		</header>
	);
};
