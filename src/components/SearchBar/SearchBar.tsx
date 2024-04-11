import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './SearchBar.module.scss';
import { fetchIssuesThunk, fetchStarsThunk } from '@/redux/operations';
import { RepoInfo } from './parts';

export const SearchBar: React.FC = () => {
	const dispatch = useDispatch();

	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value.trim().toLowerCase());
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch<any>(fetchIssuesThunk(inputValue));
		dispatch<any>(fetchStarsThunk(inputValue));
	};

	return (
		<header className={styles.header}>
			<form onSubmit={handleSubmit}>
				<input
					value={inputValue}
					onChange={handleInputChange}
					// onInvalid={handleInvalidInput}
					// pattern="^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/[a-zA-Z0-9._-]{1,100}$"
					placeholder="[repo owner]/[repo name]"
					required
				/>
				<button type="submit">Load issues</button>
			</form>

			<RepoInfo />
		</header>
	);
};
