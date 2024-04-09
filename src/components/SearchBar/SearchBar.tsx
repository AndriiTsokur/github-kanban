import { ChangeEvent, FormEvent, useState } from 'react';

import { StarFilled } from '@ant-design/icons';
import styles from './SearchBar.module.scss';

export const SearchBar: React.FC = () => {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value.trim().toLowerCase());
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(inputValue);
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
