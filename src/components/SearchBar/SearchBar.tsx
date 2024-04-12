import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

import styles from './SearchBar.module.scss';
import { fetchIssuesThunk, fetchStarsThunk } from '@/redux/operations';
import { selectIssues } from '@/redux/issuesSlice';
import { selectFetchedIssues } from '@/redux/fetchedIssuesSlice';
import { processFetchedData } from './utils';

const { Search } = Input;

export const SearchBar: React.FC = () => {
	const dispatch = useDispatch();
	const visitedRepos = useSelector(selectIssues);
	const fetchedData = useSelector(selectFetchedIssues);
	const { error, isLoading } = fetchedData;

	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value.trim().toLowerCase());
	};

	const onSearch: SearchProps['onSearch'] = (value) => {
		if (value) {
			dispatch<any>(fetchIssuesThunk(value));
			dispatch<any>(fetchStarsThunk(value));
		}
	};

	if (!error && !isLoading) {
		processFetchedData({ dispatch, fetchedData, visitedRepos });
	}

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
				onSearch={onSearch}
				style={{ minWidth: '100%' }}
			/>
		</header>
	);
};
